/**
 * Ehliyet Sınavı Hazırlık SPA - Ana Uygulama Mantığı (app.js)
 * Router, Sınav Motoru, Sonuç Analizör ve LocalStorage Yönetimi
 */

// --- GÜVENLİK: HTTPS ZORLAMA ---
if (window.location.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
}

// --- GÜVENLİK: DOM XSS KORUMASI (SANİTİZASYON) ---
function escapeHTML(str) {
  if (typeof str !== "string") return str;
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// --- UYGULAMA DURUMU (STATE) ---
const state = {
  activeView: "dashboard",
  exam: {
    title: "",
    category: "",
    questions: [],
    currentIndex: 0,
    userAnswers: {}, // { questionId: "A" | "B" | "C" | "D" }
    timeTotal: 0, // Toplam süre (saniye)
    timeRemaining: 0, // Kalan süre (saniye)
    timerInterval: null,
    isRefreshable: false,
    categoryPool: [],
    usedQuestionIds: null, // Will be initialized as Set
    isPaused: false
  },
  review: {
    examTitle: "",
    questions: [],
    userAnswers: {},
    currentIndex: 0
  },
  stats: {
    totalSolved: 0,
    avgScore: 0,
    passRate: 0
  },
  theme: "dark"
};

// --- GLOBAL DİNAMİK SORU & SINAV HAVUZU ---
let ALL_QUESTIONS = [];
let CUSTOM_QUESTIONS = [];
let CUSTOM_EXAMS = [];

function loadAllQuestions() {
  try {
    CUSTOM_QUESTIONS = JSON.parse(localStorage.getItem("ehliyet-custom-questions") || "[]");
  } catch (e) {
    CUSTOM_QUESTIONS = [];
  }
  try {
    CUSTOM_EXAMS = JSON.parse(localStorage.getItem("ehliyet-custom-exams") || "[]");
  } catch (e) {
    CUSTOM_EXAMS = [];
  }
  const baseQuestions = typeof QUESTIONS_DATA !== "undefined" ? QUESTIONS_DATA : [];
  ALL_QUESTIONS = [...baseQuestions, ...CUSTOM_QUESTIONS];
}

// --- UYGULAMA BAŞLANGICI ---
document.addEventListener("DOMContentLoaded", () => {
  try {
    initTheme();
  } catch (e) {
    console.error("initTheme hatası:", e);
  }
  try {
    loadAllQuestions();
  } catch (e) {
    console.error("loadAllQuestions hatası:", e);
  }
  try {
    initRouter();
  } catch (e) {
    console.error("initRouter hatası:", e);
  }
  try {
    loadStatsFromStorage();
  } catch (e) {
    console.error("loadStatsFromStorage hatası:", e);
  }
  try {
    initGamification();
  } catch (e) {
    console.error("initGamification hatası:", e);
  }
  try {
    initDailyQuestion();
  } catch (e) {
    console.error("initDailyQuestion hatası:", e);
  }
  try {
    renderDashboardData();
  } catch (e) {
    console.error("renderDashboardData hatası:", e);
  }
  try {
    setupEventListeners();
  } catch (e) {
    console.error("setupEventListeners hatası:", e);
  }
});

// --- TEMA YÖNETİMİ ---
function initTheme() {
  const savedTheme = localStorage.getItem("ehliyet-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme) {
    state.theme = savedTheme;
  } else {
    state.theme = prefersDark ? "dark" : "light";
  }
  
  document.documentElement.setAttribute("data-theme", state.theme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("ehliyet-theme", state.theme);
}

// --- ROUTER (SAYFA GEÇİŞLERİ) ---
function initRouter() {
  const views = ["dashboard", "exam", "results", "review", "history", "admin"];
  
  // SPA yönlendirme fonksiyonu
  window.navigateTo = (viewName, isExamsScroll = false) => {
    // Yönetim paneli şifre koruması
    if (viewName === "admin") {
      const navAdminBtn = document.getElementById("nav-admin");
      const isAlreadyUnlocked = navAdminBtn && (navAdminBtn.style.display === "flex" || navAdminBtn.style.display === "inline-flex");
      
      if (!isAlreadyUnlocked) {
        const pass = prompt("Yönetici Giriş Şifresini Giriniz:");
        if (pass === "1907" || pass === "1234") {
          const mNavAdminBtn = document.getElementById("m-nav-admin");
          if (navAdminBtn) navAdminBtn.style.setProperty("display", "flex", "important");
          if (mNavAdminBtn) mNavAdminBtn.style.setProperty("display", "flex", "important");
        } else {
          alert("Erişim Engellendi! Hatalı Şifre.");
          window.location.hash = "#dashboard";
          navigateTo("dashboard");
          return;
        }
      }
    }

    state.activeView = viewName;
    
    // Tüm görünümleri gizle
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.add("hidden");
    });
    
    // Aktif görünümü göster
    const activeEl = document.getElementById(`view-${viewName}`);
    if (activeEl) activeEl.classList.remove("hidden");
    
    // Navigasyon butonlarını güncelle
    updateNavButtons(viewName, isExamsScroll);
    
    // Geçmiş sayfası açıldığında listeyi yenile
    if (viewName === "history") {
      renderHistoryList();
    }
    
    // Dashboard açıldığında istatistikleri yenile
    if (viewName === "dashboard") {
      loadStatsFromStorage();
      renderDashboardData();
    }

    // Yönetim paneli açıldığında tabloları yenile
    if (viewName === "admin") {
      renderAdminCustomExams();
      renderAdminExamDropdown();
    }
    
    // Sayfanın en üstüne odaklan (Eğer sınavlar alanına kaydırılmayacaksa)
    if (!isExamsScroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}

function updateNavButtons(activeView, isExamsScroll = false) {
  const navHome = document.getElementById("nav-home");
  const navHistory = document.getElementById("nav-history");
  const navAdmin = document.getElementById("nav-admin");
  const navExams = document.getElementById("nav-exams");
  const mNavHome = document.getElementById("m-nav-home");
  const mNavHistory = document.getElementById("m-nav-history");
  const mNavAdmin = document.getElementById("m-nav-admin");
  const mNavExams = document.getElementById("m-nav-exams");
  
  // Reset
  [navHome, navHistory, navAdmin, navExams, mNavHome, mNavHistory, mNavAdmin, mNavExams].forEach(btn => {
    if (btn) btn.classList.remove("active");
  });
  
  // Set Active
  if (activeView === "dashboard") {
    if (isExamsScroll) {
      if (navExams) navExams.classList.add("active");
      if (mNavExams) mNavExams.classList.add("active");
    } else {
      if (navHome) navHome.classList.add("active");
      if (mNavHome) mNavHome.classList.add("active");
    }
  } else if (activeView === "history") {
    if (navHistory) navHistory.classList.add("active");
    if (mNavHistory) mNavHistory.classList.add("active");
  } else if (activeView === "admin") {
    if (navAdmin) navAdmin.classList.add("active");
    if (mNavAdmin) mNavAdmin.classList.add("active");
  }
}

// --- DASHBOARD VERİLERİNİ YÜKLEME ---
function renderDashboardData() {
  // Çıkmış Sınavları Grupla (Yıl ve Ay bazında)
  const examsContainer = document.getElementById("exams-list");
  const categoriesContainer = document.getElementById("categories-list");
  
  if (!examsContainer || !categoriesContainer) return;
  
  // 1. Çıkmış Sınavlar Kartlarını Oluşturma
  // Benzersiz sınavları bul (Statik + Özel Sınavlar)
  const uniqueExamsMap = {};
  
  // Önce static verileri ekle
  QUESTIONS_DATA.forEach(q => {
    const key = `${q.exam.year}-${q.exam.month}`;
    if (!uniqueExamsMap[key]) {
      uniqueExamsMap[key] = {
        year: q.exam.year,
        month: q.exam.month,
        title: q.exam.title,
        qCount: 0
      };
    }
  });

  // Sonra özel tanımlanan sınavları ekle
  CUSTOM_EXAMS.forEach(ex => {
    const key = `${ex.year}-${ex.month}`;
    if (!uniqueExamsMap[key]) {
      uniqueExamsMap[key] = {
        year: parseInt(ex.year),
        month: ex.month,
        title: ex.title,
        qCount: 0
      };
    }
  });

  // Toplam soru sayılarını ALL_QUESTIONS (Statik + Custom) üzerinden hesapla
  ALL_QUESTIONS.forEach(q => {
    const key = `${q.exam.year}-${q.exam.month}`;
    if (uniqueExamsMap[key]) {
      uniqueExamsMap[key].qCount++;
    }
  });
  
  examsContainer.innerHTML = "";
  
  // Tarihe göre sırala (Önce yeni yıllar)
  const sortedExams = Object.values(uniqueExamsMap).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    // Aylara göre sıralama sıralayıcısı (Mayıs > Şubat vb.)
    const monthsOrder = { "Ocak": 1, "Şubat": 2, "Mart": 3, "Nisan": 4, "Mayıs": 5, "Haziran": 6, "Temmuz": 7, "Ağustos": 8, "Eylül": 9, "Ekim": 10, "Kasım": 11, "Aralık": 12 };
    return (monthsOrder[b.month] || 0) - (monthsOrder[a.month] || 0);
  });
  
  sortedExams.forEach(ex => {
    // Sadece çıkmış sınavları göster, "Genel Deneme"yi ayrı değerlendirebiliriz
    if (ex.month === "Genel Deneme") return;
    
    const card = document.createElement("div");
    card.className = "exam-card";
    card.innerHTML = `
      <div class="exam-card-top">
        <span class="exam-card-year">${ex.year}</span>
        <span class="exam-card-month">${ex.month}</span>
      </div>
      <h3 class="exam-card-title">${ex.title}</h3>
      <div class="exam-card-bottom">
        <span class="exam-meta-text">50 Soru • 45 Dakika</span>
        <button class="exam-card-btn" aria-label="${ex.title} Sınavını Başlat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `;
    
    // Tıklama olayı ekle
    card.addEventListener("click", () => {
      startExamFromDatabase(ex.year, ex.month);
    });
    
    examsContainer.appendChild(card);
  });
  
  // 2. Konu Bazlı Kartları Oluşturma
  const categories = [
    { 
      name: "İlk Yardım", 
      icon: `<path d="M12 2v20M2 12h20"></path>`, 
      desc: "Suni solunum, kalp masajı, kanamalar, kırıklar ve acil kurtarma teknikleri.",
      notes: [
        "Temel Yaşam Desteği (TYD): Yetişkinlerde kalp masajı ve yapay solunum oranı <b>30:2</b>'dir.",
        "Kanama Türleri: Atardamar kanaması açık kırmızı ve fışkırarak akar (en tehlikelisi). Toplardamar koyu kırmızı ve sızıntı şeklindedir.",
        "Rentek Manevrası: Yaralıyı araçtan omuriliğine zarar vermeden çıkarmak için uygulanır.",
        "Şok Pozisyonu: Kazazede sırt üstü yatırılır, ayakları <b>30 cm</b> yukarı kaldırılır."
      ]
    },
    { 
      name: "Trafik ve Çevre", 
      icon: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>`, 
      desc: "Hız sınırları, yol işaretleri, geçiş üstünlüğü kuralları ve çevre bilgisi.",
      notes: [
        "Hız Sınırları (Otomobil): Yerleşim yeri: 50 km/s, Çift yönlü: 90 km/s, Bölünmüş: 110 km/s, Otoyol: 120 km/s.",
        "Geçiş Üstünlüğü Sırası (CİP-S): Can Kurtaran (Ambulans) > İtfaiye > Polis (Asayiş) > Sivil Savunma.",
        "Kavşak Kuralları: Kavşaklara yaklaşırken şerit değiştirmek şehir içinde <b>30m</b>, dışında <b>150m</b> kala yasaktır.",
        "Alkol Sınırı: Hususi araç sürücüleri için yasal alkol sınırı <b>0.50 promil</b>dir."
      ]
    },
    { 
      name: "Motor ve Araç Tekniği", 
      icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`, 
      desc: "Motor çalışma prensibi, yağlama, soğutma sistemleri ve gösterge panelleri.",
      notes: [
        "Gösterge Paneli: Seyir halindeyken yağ veya şarj lambası yanarsa araç durdurulup motor stop edilmelidir.",
        "Motor Harareti: Araç hararet yaparsa motor rölantide çalıştırılır, radyatöre doğrudan soğuk su dökülmez.",
        "Yağ Kontrolü: Motor yağı, araç düz zemindeyken ve motor stop edildikten 4-5 dk sonra yağ çubuğuyla kontrol edilir.",
        "Buji: Benzinli/LPG'li motorlarda silindir içindeki yakıt-hava karışımını ateşlemeyi (kıvılcım) sağlar."
      ]
    },
    { 
      name: "Trafik Adabı", 
      icon: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`, 
      desc: "Trafikte nezaket, sabır, hoşgörü, yardımlaşma ve empati yeteneği.",
      notes: [
        "Trafik Adabı: Sürücülerin trafikte birbirlerine karşı empati, sabır, hoşgörü ve yardımlaşma göstermesidir.",
        "Engelli Hakları: Engelli park yerlerini işgal etmek kul hakkı ve engelli bireyin erişim hakkı ihlalidir.",
        "Öfke Kontrolü: Sürücünün trafikteki stresi yönetebilmesi, güvenliği artırır ve kazaları önler."
      ]
    },
    { 
      name: "Ehliyet Türleri", 
      icon: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`, 
      desc: "Sürücü belgesi sınıfları, yaş sınırları, geçerlilik süreleri ve araç sürme yetkileri.",
      notes: [
        "A Sınıfı Ehliyet: Gücü 35 kW'ı aşan sepetli/sepetsiz iki tekerlekli motosikletler içindir. Yaş sınırı 24'tür (en az 2 yıllık A2 ehliyeti varsa 20 yaş).",
        "B Sınıfı Ehliyet: Otomobil ve kamyonet kullanır. M, F ve B1 sınıflarını da kapsar. Geçerlilik süresi 10 yıldır.",
        "C ve D Sınıfları: C sınıfı kamyon ve çekici (5 yıl geçerli, yaş sınırı 21); D sınıfı otobüs (5 yıl geçerli, yaş sınırı 24) içindir. B sınıfı ehliyet şarttır.",
        "Geçerlilik Süreleri: M, A1, A2, A, B1, B, BE, F ve G sınıfları 10 yıl; C1, C1E, C, CE, D1, D1E, D ve DE sınıfları 5 yıl geçerlidir."
      ]
    }
  ];
  
  categoriesContainer.innerHTML = "";
  
  categories.forEach(cat => {
    // Bu kategoriye ait soru sayısını bul
    const qCount = ALL_QUESTIONS.filter(q => q.category === cat.name).length;
    
    // Kategoriye ait genel başarı oranını hesapla (Geçmiş sınav verilerinden)
    const successRate = calculateCategorySuccessRate(cat.name);
    
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <div class="category-card-main">
        <div class="cat-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${cat.icon}</svg>
        </div>
        <div class="cat-info">
          <h3>${cat.name}</h3>
          <p>${cat.desc}</p>
          <div class="cat-progress-container">
            <div class="cat-progress-bar">
              <div class="cat-progress-fill" style="width: ${successRate}%"></div>
            </div>
            <span class="cat-progress-text">%${successRate}</span>
          </div>
          <div class="cat-actions">
            <button class="cat-start-btn">
              Testi Başlat
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button class="cat-notes-btn">
              Notları Göster
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="category-notes-panel hidden">
        <h4>${cat.name} Dersi Kısa Notları</h4>
        <ul>
          ${cat.notes.map(note => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    `;
    
    card.querySelector(".cat-start-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      startCategoryExam(cat.name);
    });

    const notesBtn = card.querySelector(".cat-notes-btn");
    const notesPanel = card.querySelector(".category-notes-panel");
    const chevron = notesBtn.querySelector(".chevron-icon");
    
    notesBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = notesPanel.classList.contains("hidden");
      if (isHidden) {
        notesPanel.classList.remove("hidden");
        chevron.classList.add("rotate");
        notesBtn.innerHTML = `Notları Gizle <svg class="chevron-icon rotate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      } else {
        notesPanel.classList.add("hidden");
        chevron.classList.remove("rotate");
        notesBtn.innerHTML = `Notları Göster <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      }
    });
    
    categoriesContainer.appendChild(card);
  });
}

// Kategori Başarı Oranı Hesaplama (Geçmiş sınavlara göre)
function calculateCategorySuccessRate(categoryName) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("ehliyet-history") || "[]");
  } catch (e) {
    history = [];
  }
  if (!Array.isArray(history) || history.length === 0) return 0;
  
  let totalCorrect = 0;
  let totalAnswered = 0;
  
  history.forEach(session => {
    if (session && Array.isArray(session.questions) && session.userAnswers) {
      session.questions.forEach(q => {
        if (q.category === categoryName) {
          const userAns = session.userAnswers[q.id];
          if (userAns) {
            totalAnswered++;
            if (userAns === q.correct) {
              totalCorrect++;
            }
          }
        }
      });
    }
  });
  
  return totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
}

// --- EHLİYET SINAVI BAŞLATMA MANTIKLARI ---

// 1. Belirli Bir Yıl/Ay Çıkmış Sınavı
function startExamFromDatabase(year, month) {
  const title = `${year} ${month} Çıkmış Sınavı`;
  
  // Bu sınava ait özel soruları al
  const specificQuestions = ALL_QUESTIONS.filter(q => q.exam && q.exam.year == year && q.exam.month == month);
  
  // Eğer hiç soru yoksa hata ver
  if (specificQuestions.length === 0) {
    alert("Bu sınav dönemine ait soru bulunamadı.");
    return;
  }
  
  // Sınavı 50 soruya tamamlamak için havuzdaki diğer soruları karıştır
  const otherQuestions = ALL_QUESTIONS.filter(q => !(q.exam && q.exam.year == year && q.exam.month == month));
  const shuffledOthers = shuffleArray([...otherQuestions]);
  
  // 50 soruya ulaşmak için gereken miktar kadar diğer sorulardan ekle
  const needed = 50 - specificQuestions.length;
  const paddingQuestions = needed > 0 ? shuffledOthers.slice(0, needed) : [];
  
  // Birleştir ve kendi içinde tekrar karıştır
  const finalQuestions = shuffleArray([...specificQuestions, ...paddingQuestions]);
  
  // 50 Soru için 45 Dakikalık Sınav Başlat
  setupAndStartExam(title, `${year} ${month}`, finalQuestions, 45);
}

// 2. Belirli Bir Kategori Testi
function startCategoryExam(categoryName) {
  const title = `${categoryName} Konu Çalışma Testi`;
  const filteredQuestions = ALL_QUESTIONS.filter(q => q.category === categoryName);
  
  if (filteredQuestions.length === 0) {
    alert("Bu kategoriye ait soru bulunamadı.");
    return;
  }
  
  // Soruları karıştır (Shuffling)
  const shuffledPool = shuffleArray([...filteredQuestions]);
  
  // İlk 50 soruyu almaya çalış. Havuzda 50'den az varsa, 50 olana kadar döndürerek doldur.
  let initialQuestions = shuffledPool.slice(0, 50);
  const remainingPool = shuffledPool.slice(50);
  
  if (initialQuestions.length < 50 && filteredQuestions.length > 0) {
    while (initialQuestions.length < 50) {
      const extra = shuffleArray([...filteredQuestions]);
      initialQuestions = initialQuestions.concat(extra);
    }
    initialQuestions = initialQuestions.slice(0, 50);
  }
  
  // 50 Soru için 45 dakika
  setupAndStartExam(title, categoryName, initialQuestions, 45);
  
  // Dinamik mod bayraklarını ayarla
  state.exam.isRefreshable = true;
  state.exam.categoryPool = remainingPool;
  state.exam.usedQuestionIds = new Set(initialQuestions.map(q => q.id));
}

// 3. Rastgele Deneme Sınavı (Karışık - 50 Soru, 45 Dakika, Çözüldükçe Yenilenir)
function startRandomExam() {
  const title = "Genel Deneme Sınavı";
  
  // Tüm veritabanını karıştır
  const shuffledAll = shuffleArray([...ALL_QUESTIONS]);
  
  // 50 soru al ve kalanı havuz olarak tut
  let initialQuestions = shuffledAll.slice(0, 50);
  const remainingPool = shuffledAll.slice(50);
  
  // Eğer havuz yetersizse (örn: veritabanında toplam 50'den az soru varsa, ki bizde 90 soru var, dolayısıyla yeterli) tamamla
  if (initialQuestions.length < 50 && ALL_QUESTIONS.length > 0) {
    while (initialQuestions.length < 50) {
      const extra = shuffleArray([...ALL_QUESTIONS]);
      initialQuestions = initialQuestions.concat(extra);
    }
    initialQuestions = initialQuestions.slice(0, 50);
  }
  
  setupAndStartExam(title, "Karma Deneme", initialQuestions, 45);
  
  // Dinamik mod bayraklarını ayarla
  state.exam.isRefreshable = true;
  state.exam.categoryPool = remainingPool;
  state.exam.usedQuestionIds = new Set(initialQuestions.map(q => q.id));
}

// Yardımcı Fonksiyon: Dizi Elemanlarını Karıştırma (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- SINAV AYARLARI VE BAŞLATILMASI ---
function setupAndStartExam(title, category, questions, durationMinutes) {
  // State'i sıfırla
  state.exam.title = title;
  state.exam.category = category;
  state.exam.questions = questions;
  state.exam.currentIndex = 0;
  state.exam.userAnswers = {};
  state.exam.timeTotal = durationMinutes * 60;
  state.exam.timeRemaining = durationMinutes * 60;
  
  // Varsayılan olarak kategori modu değişkenlerini sıfırla
  state.exam.isCategoryExam = false;
  state.exam.categoryPool = [];
  state.exam.usedQuestionIds = new Set(questions.map(q => q.id));
  
  // UI Güncelle
  document.getElementById("exam-title-display").textContent = title;
  document.getElementById("exam-category-display").textContent = category;
  document.getElementById("total-q-num").textContent = questions.length;
  
  // Gezgini Hazırla
  buildNavigatorGrid();
  
  // İlk Soruyu Göster
  renderQuestion(0);
  
  // Süreyi Başlat
  startTimer();
  
  // Sınav Ekranına Geç
  navigateTo("exam");
}

// Soru Gezgini Oluşturma
function buildNavigatorGrid() {
  const grid = document.getElementById("question-navigator-grid");
  if (!grid) return;
  grid.innerHTML = "";
  
  state.exam.questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.className = "nav-q-btn empty";
    btn.textContent = index + 1;
    btn.setAttribute("id", `nav-q-btn-${index}`);
    
    btn.addEventListener("click", () => {
      saveActiveQuestionState();
      renderQuestion(index);
    });
    
    grid.appendChild(btn);
  });
}

// Aktif Soru İçeriğini Ekrana Basma
function renderQuestion(index) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  state.exam.currentIndex = index;
  const question = state.exam.questions[index];
  
  // UI Güncellemeleri
  document.getElementById("current-q-num").textContent = index + 1;
  document.getElementById("question-category-tag").textContent = question.category;
  document.getElementById("question-text-display").textContent = question.question;
  
  // Görsel kontrolü (questions_data dosyasında resim desteği varsa)
  const imageContainer = document.getElementById("question-image-container");
  const imgElement = document.getElementById("question-image");
  if (question.image_url) {
    imgElement.src = question.image_url;
    imageContainer.classList.remove("hidden");
  } else {
    imgElement.src = "";
    imageContainer.classList.add("hidden");
  }
  
  // Seçenekleri Render Et
  const options = ["A", "B", "C", "D"];
  const optTexts = {
    A: document.getElementById("opt-text-a"),
    B: document.getElementById("opt-text-b"),
    C: document.getElementById("opt-text-c"),
    D: document.getElementById("opt-text-d")
  };
  
  options.forEach(opt => {
    optTexts[opt].textContent = question.options[opt];
    const btn = document.querySelector(`.option-btn[data-option="${opt}"]`);
    btn.classList.remove("selected");
    
    // Daha önce cevaplanmışsa seçili göster
    if (state.exam.userAnswers[question.id] === opt) {
      btn.classList.add("selected");
    }
  });
  
  // Gezginde Aktif Sınıfını Ayarla
  updateNavigatorStyles(index);
}

// Gezgindeki buton stillerini güncelleme
function updateNavigatorStyles(currentIndex) {
  state.exam.questions.forEach((q, index) => {
    const btn = document.getElementById(`nav-q-btn-${index}`);
    if (!btn) return;
    
    // Tüm dinamik durum sınıflarını kaldır
    btn.classList.remove("active", "answered");
    
    // Cevap durumu
    if (state.exam.userAnswers[q.id]) {
      btn.classList.add("answered");
    }
    
    // Aktif soru durumu
    if (index === currentIndex) {
      btn.classList.add("active");
    }
  });
}

// Aktif şık seçim kaydı
function selectOption(optionLetter) {
  const question = state.exam.questions[state.exam.currentIndex];
  
  // Soru daha önce cevaplanmamış mıydı?
  const wasUnanswered = !state.exam.userAnswers[question.id];
  
  // Şık seçimini kaydet
  state.exam.userAnswers[question.id] = optionLetter;
  
  // Seçenek butonlarını güncelle
  const options = ["A", "B", "C", "D"];
  options.forEach(opt => {
    const btn = document.querySelector(`.option-btn[data-option="${opt}"]`);
    if (opt === optionLetter) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
  
  // DİNAMİK SORU EKLEME MANTIĞI:
  // Eğer yenilenebilir/dinamik sınav modundaysak ve bu soru İLK KEZ cevaplanıyorsa
  if (state.exam.isRefreshable && wasUnanswered) {
    if (state.exam.categoryPool.length > 0) {
      // Havuzda kullanılmamış soru varsa çek ve sınava ekle
      const nextQuestion = state.exam.categoryPool.shift();
      state.exam.questions.push(nextQuestion);
      state.exam.usedQuestionIds.add(nextQuestion.id);
      
      // Süreyi 1 dakika artır (Sınav süresi dinamik büyür)
      state.exam.timeRemaining += 60;
      state.exam.timeTotal += 60;
      
      // Arayüzü güncelle
      document.getElementById("total-q-num").textContent = state.exam.questions.length;
      buildNavigatorGrid();
    } else {
      // Havuz bittiğinde, çözülmemiş diğer soruları döngüsel olarak yeniden yükle
      let allQuestionsPool = [];
      if (state.exam.category === "Karma Deneme") {
        allQuestionsPool = ALL_QUESTIONS;
      } else {
        allQuestionsPool = ALL_QUESTIONS.filter(q => q.category === state.exam.category);
      }
      
      // Şu anki sınav listesinde olmayan soruları bul
      const unusedQuestions = allQuestionsPool.filter(q => !state.exam.usedQuestionIds.has(q.id));
      
      let newQuestionsToAdd = [];
      if (unusedQuestions.length > 0) {
        newQuestionsToAdd = shuffleArray([...unusedQuestions]);
      } else {
        // Eğer tüm sorular tüketildiyse, mevcut görüntülenen aktif soru hariç diğerlerini geri dönüştür
        const recyclable = allQuestionsPool.filter(q => q.id !== question.id);
        newQuestionsToAdd = shuffleArray([...recyclable]);
      }
      
      if (newQuestionsToAdd.length > 0) {
        state.exam.categoryPool = newQuestionsToAdd;
        const nextQuestion = state.exam.categoryPool.shift();
        state.exam.questions.push(nextQuestion);
        state.exam.usedQuestionIds.add(nextQuestion.id);
        
        // Süreyi 1 dakika artır
        state.exam.timeRemaining += 60;
        state.exam.timeTotal += 60;
        
        // Arayüzü güncelle
        document.getElementById("total-q-num").textContent = state.exam.questions.length;
        buildNavigatorGrid();
      }
    }
  }
  
  // Gezgini ve Durumu Güncelle
  updateNavigatorStyles(state.exam.currentIndex);
}

// Şık Seçimini Temizle
function clearActiveAnswer() {
  const question = state.exam.questions[state.exam.currentIndex];
  delete state.exam.userAnswers[question.id];
  
  const options = ["A", "B", "C", "D"];
  options.forEach(opt => {
    const btn = document.querySelector(`.option-btn[data-option="${opt}"]`);
    btn.classList.remove("selected");
  });
  
  updateNavigatorStyles(state.exam.currentIndex);
}

// Sonraki ve Önceki Soruya Geçişler
function navigateQuestions(direction) {
  let nextIndex = state.exam.currentIndex + direction;
  
  if (nextIndex >= 0 && nextIndex < state.exam.questions.length) {
    renderQuestion(nextIndex);
  }
}

// Sınav Durumunu Kaydetme (Yarıda kalma gibi)
function saveActiveQuestionState() {
  // Gerektiğinde genişletilebilir
}

// --- SINAV SÜRESİ YÖNETİMİ ---
function startTimer() {
  if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);
  
  const timerBox = document.getElementById("timer-box");
  const timerDisplay = document.getElementById("exam-timer-display");
  timerBox.classList.remove("warning");
  
  state.exam.timerInterval = setInterval(() => {
    state.exam.timeRemaining--;
    
    // Kalan Süreyi Formatla (Dakika:Saniye)
    const minutes = Math.floor(state.exam.timeRemaining / 60);
    const seconds = state.exam.timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Kritik Süre (Son 5 Dakika) Kontrolü
    if (state.exam.timeRemaining <= 300) {
      timerBox.classList.add("warning");
    }
    
    // Süre Doldu
    if (state.exam.timeRemaining <= 0) {
      clearInterval(state.exam.timerInterval);
      alert("Sınav süreniz dolmuştur! Cevaplarınız otomatik olarak gönderiliyor.");
      finishExam(true);
    }
  }, 1000);
}

// --- SINAVI BİTİRME VE PUAN HESAPLAMA ---
function finishExam(forceSubmit = false) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  // Sınav bitirme teyidi
  if (!forceSubmit) {
    const totalQ = state.exam.questions.length;
    const answeredQ = Object.keys(state.exam.userAnswers).length;
    const blankQ = totalQ - answeredQ;
    
    let confirmMsg = "Sınavı bitirmek istediğinize emin misiniz?";
    if (blankQ > 0) {
      confirmMsg = `Sınavda çözmediğiniz ${blankQ} boş soru bulunuyor. Yine de bitirmek istiyor musunuz?`;
    }
    
    if (!confirm(confirmMsg)) return;
  }
  
  // Timer durdur
  clearInterval(state.exam.timerInterval);
  
  // 1. İstatistikleri Hesapla
  const questions = state.exam.questions;
  const answers = state.exam.userAnswers;
  
  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;
  
  // Kategori bazlı sayaçlar
  const categoryStats = {};
  
  questions.forEach(q => {
    // Kategori ilklendir
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    
    const userChoice = answers[q.id];
    if (!userChoice) {
      blankCount++;
    } else if (userChoice === q.correct) {
      correctCount++;
      categoryStats[q.category].correct++;
    } else {
      wrongCount++;
    }
  });
  
  // Puan Hesapla (Doğru Soru Oranı * 100)
  const score = Math.round((correctCount / questions.length) * 100);
  const isPassed = score >= 70; // 70 Baraj Puanı
  
  // Geçen Süre
  const elapsedSeconds = state.exam.timeTotal - state.exam.timeRemaining;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedRemSeconds = elapsedSeconds % 60;
  const durationText = `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedRemSeconds.toString().padStart(2, '0')}`;
  
  // 2. Sonuçları Ekranda Göster
  displayExamResults(score, correctCount, wrongCount, blankCount, durationText, isPassed, categoryStats);
  
  // 3. Sonucu LocalStorage Kayıt
  saveExamToHistory(correctCount, wrongCount, blankCount, score, durationText, isPassed);
  
  // Oyunlaştırma: Sınav tamamlama tecrübe puanı (XP) ekle
  if (isPassed) {
    addXP(150); // Geçenlere 150 XP
  } else {
    addXP(50);  // Kalanlara 50 XP
  }
  
  // Sonuç ekranına geç
  navigateTo("results");
}

function displayExamResults(score, correct, wrong, blank, duration, isPassed, categoryStats) {
  const resultCard = document.querySelector(".result-card");
  const statusBanner = document.getElementById("result-status-banner");
  const statusTitle = document.getElementById("result-status-title");
  const statusSubtitle = document.getElementById("result-status-subtitle");
  
  const scoreText = document.getElementById("result-score");
  const correctText = document.getElementById("result-correct");
  const wrongText = document.getElementById("result-wrong");
  const blankText = document.getElementById("result-blank");
  const durationText = document.getElementById("result-duration");
  
  // Temel alanları doldur
  scoreText.textContent = score;
  correctText.textContent = correct;
  wrongText.textContent = wrong;
  blankText.textContent = blank;
  durationText.textContent = duration;
  
  // Banner Renk ve Durum Stilleri
  statusBanner.className = "result-banner";
  if (isPassed) {
    statusBanner.classList.add("passed");
    statusTitle.textContent = `Tebrikler! Geçtiniz. 🎉`;
    statusSubtitle.textContent = `Başarıyla ehliyet sınavı baraj puanını (${score}/100) aştınız. Sınava hazırsınız!`;
  } else {
    statusBanner.classList.add("failed");
    statusTitle.textContent = `Maalesef Kaldınız. 😔`;
    statusSubtitle.textContent = `Ehliyet sınavı baraj puanının (${score}/100) altında kaldınız. Biraz daha çalışmalısınız.`;
  }
  
  // Puan Halkasını Güncelle (SVG stroke-dashoffset)
  const ringProgress = document.getElementById("score-ring-progress");
  const radius = ringProgress.r.baseVal.value;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const offset = circumference - (score / 100) * circumference;
  ringProgress.style.strokeDashoffset = offset;
  
  // Kategori Listesini Doldur
  const breakdownContainer = document.getElementById("result-categories-breakdown");
  breakdownContainer.innerHTML = "";
  
  Object.keys(categoryStats).forEach(catName => {
    const cat = categoryStats[catName];
    const catPercentage = Math.round((cat.correct / cat.total) * 100);
    
    // Bar rengi belirleme
    let barColorClass = "red";
    if (catPercentage >= 70) barColorClass = "green";
    else if (catPercentage >= 40) barColorClass = "orange";
    
    const row = document.createElement("div");
    row.className = "cat-stat-row";
    row.innerHTML = `
      <div class="cat-stat-info">
        <span class="cat-stat-name">${catName}</span>
        <span class="cat-stat-numbers">%${catPercentage} (${cat.correct}/${cat.total} Doğru)</span>
      </div>
      <div class="cat-stat-progress-bg">
        <div class="cat-stat-progress-fill ${barColorClass}" style="width: ${catPercentage}%"></div>
      </div>
    `;
    breakdownContainer.appendChild(row);
  });
  
  // Detaylı inceleme için state güncelle
  state.review.examTitle = state.exam.title;
  state.review.questions = [...state.exam.questions];
  state.review.userAnswers = { ...state.exam.userAnswers };
}

// --- LOCALSTORAGE SINAV GEÇMİŞİ YÖNETİMİ ---
function saveExamToHistory(correct, wrong, blank, score, duration, isPassed) {
  const historyItem = {
    id: Date.now(),
    title: state.exam.title,
    date: new Date().toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' }),
    score: score,
    correct: correct,
    wrong: wrong,
    blank: blank,
    duration: duration,
    isPassed: isPassed,
    // İnceleme yapabilmek için soruları ve verilen cevapları da kaydediyoruz
    questions: state.exam.questions,
    userAnswers: state.exam.userAnswers
  };
  
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("ehliyet-history") || "[]");
  } catch (e) {
    history = [];
  }
  if (!Array.isArray(history)) history = [];
  history.unshift(historyItem);
  localStorage.setItem("ehliyet-history", JSON.stringify(history));
  
  // Toplam İstatistikleri Güncelle
  updateGeneralStats(history);
}

function updateGeneralStats(history) {
  if (history.length === 0) return;
  
  const totalSolved = history.length;
  
  let totalScoreSum = 0;
  let passedCount = 0;
  
  history.forEach(item => {
    totalScoreSum += item.score;
    if (item.isPassed) passedCount++;
  });
  
  const avgScore = Math.round(totalScoreSum / totalSolved);
  const passRate = Math.round((passedCount / totalSolved) * 100);
  
  const stats = { totalSolved, avgScore, passRate };
  localStorage.setItem("ehliyet-stats", JSON.stringify(stats));
}

function loadStatsFromStorage() {
  let stats = { totalSolved: 0, avgScore: 0, passRate: 0 };
  try {
    stats = JSON.parse(localStorage.getItem("ehliyet-stats") || '{"totalSolved": 0, "avgScore": 0, "passRate": 0}');
  } catch (e) {
    stats = { totalSolved: 0, avgScore: 0, passRate: 0 };
  }
  
  const elSolved = document.getElementById("stat-total-solved");
  const elAvg = document.getElementById("stat-avg-score");
  const elPass = document.getElementById("stat-pass-rate");
  
  if (elSolved) elSolved.textContent = stats.totalSolved;
  if (elAvg) elAvg.textContent = `%${stats.avgScore}`;
  if (elPass) elPass.textContent = `%${stats.passRate}`;
}

// Sınav Geçmiş Listesini Tabloya Render Etme
function renderHistoryList() {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("ehliyet-history") || "[]");
  } catch (e) {
    history = [];
  }
  
  const emptyState = document.getElementById("history-empty-state");
  const table = document.getElementById("history-table");
  const tableBody = document.getElementById("history-table-body");
  
  if (!emptyState || !table || !tableBody) return;
  
  if (history.length === 0) {
    emptyState.classList.remove("hidden");
    table.classList.add("hidden");
    return;
  }
  
  emptyState.classList.add("hidden");
  table.classList.remove("hidden");
  tableBody.innerHTML = "";
  
  history.forEach(item => {
    const row = document.createElement("tr");
    
    const badgeClass = item.isPassed ? "passed" : "failed";
    const badgeText = item.isPassed ? "GEÇTİ" : "KALDI";
    
    row.innerHTML = `
      <td data-label="Sınav Adı"><strong>${item.title}</strong></td>
      <td data-label="Tarih">${item.date}</td>
      <td data-label="Süre">${item.duration}</td>
      <td data-label="Doğru/Yanlış/Boş">${item.correct} D / ${item.wrong} Y / ${item.blank} B</td>
      <td data-label="Puan"><strong>${item.score}</strong></td>
      <td data-label="Durum"><span class="history-badge ${badgeClass}">${badgeText}</span></td>
      <td data-label="Aksiyon">
        <button class="history-action-btn" data-id="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="display:inline;vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          İncele
        </button>
      </td>
    `;
    
    // İnceleme butonuna olay bağla
    row.querySelector(".history-action-btn").addEventListener("click", () => {
      startReviewSession(item);
    });
    
    tableBody.appendChild(row);
  });
}

function clearHistory() {
  if (confirm("Tüm sınav geçmişinizi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
    localStorage.removeItem("ehliyet-history");
    localStorage.removeItem("ehliyet-stats");
    loadStatsFromStorage();
    renderHistoryList();
    renderDashboardData();
  }
}

// --- SORU İNCELEME SEANSI (REVIEW SESSION) ---
function startReviewSession(historyItem) {
  state.review.examTitle = historyItem.title;
  state.review.questions = historyItem.questions;
  state.review.userAnswers = historyItem.userAnswers;
  state.review.currentIndex = 0;
  
  // UI Hazırla
  document.getElementById("review-exam-title").textContent = historyItem.title;
  document.getElementById("review-total-q-num").textContent = historyItem.questions.length;
  
  buildReviewNavigatorGrid();
  renderReviewQuestion(0);
  navigateTo("review");
}

function buildReviewNavigatorGrid() {
  const grid = document.getElementById("review-navigator-grid");
  if (!grid) return;
  grid.innerHTML = "";
  
  state.review.questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.className = "nav-q-btn";
    btn.textContent = index + 1;
    btn.setAttribute("id", `review-nav-q-btn-${index}`);
    
    // Doğru/Yanlış durumuna göre navigatörü renklendir
    const userAns = state.review.userAnswers[q.id];
    if (!userAns) {
      btn.classList.add("empty");
    } else if (userAns === q.correct) {
      btn.classList.add("success");
    } else {
      btn.classList.add("danger");
    }
    
    btn.addEventListener("click", () => {
      renderReviewQuestion(index);
    });
    
    grid.appendChild(btn);
  });
}

function renderReviewQuestion(index) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  state.review.currentIndex = index;
  const question = state.review.questions[index];
  const userAns = state.review.userAnswers[question.id];
  
  // UI Güncelle
  document.getElementById("review-q-num").textContent = index + 1;
  document.getElementById("review-category-tag").textContent = question.category;
  document.getElementById("review-text-display").textContent = question.question;
  
  // Görsel Kontrolü
  const imageContainer = document.getElementById("review-image-container");
  const imgElement = document.getElementById("review-image");
  if (question.image_url) {
    imgElement.src = question.image_url;
    imageContainer.classList.remove("hidden");
  } else {
    imgElement.src = "";
    imageContainer.classList.add("hidden");
  }
  
  // Şıkları Oluştur ve Renklendir
  const options = ["A", "B", "C", "D"];
  const optTexts = {
    A: document.getElementById("rev-opt-text-a"),
    B: document.getElementById("rev-opt-text-b"),
    C: document.getElementById("rev-opt-text-c"),
    D: document.getElementById("rev-opt-text-d")
  };
  
  options.forEach(opt => {
    optTexts[opt].textContent = question.options[opt];
    const btn = document.querySelector(`#review-options-container .option-btn[data-option="${opt}"]`);
    btn.className = "option-btn"; // Sınıfları temizle
    
    // Şık Boyama Mantığı:
    // 1. Doğru şık her zaman yeşil (correct-ans)
    // 2. Kullanıcı yanlış seçtiyse kırmızı (wrong-ans)
    if (opt === question.correct) {
      btn.classList.add("correct-ans");
    } else if (userAns === opt && userAns !== question.correct) {
      btn.classList.add("wrong-ans");
    }
  });
  
  // Doğru/Yanlış/Boş Rozeti
  const statusBadge = document.getElementById("review-answer-status");
  statusBadge.className = "answer-badge";
  
  if (!userAns) {
    statusBadge.classList.add("empty");
    statusBadge.textContent = "BOŞ";
    document.getElementById("review-status-indicator").textContent = `Cevap Vermediniz | Doğru Cevap: ${question.correct}`;
  } else if (userAns === question.correct) {
    statusBadge.classList.add("correct");
    statusBadge.textContent = "DOĞRU";
    document.getElementById("review-status-indicator").textContent = `Cevabınız: ${userAns} (Doğru)`;
  } else {
    statusBadge.classList.add("wrong");
    statusBadge.textContent = "YANLIŞ";
    document.getElementById("review-status-indicator").textContent = `Cevabınız: ${userAns} | Doğru Cevap: ${question.correct}`;
  }
  
  // Çözüm Metnini Göster
  document.getElementById("review-explanation-text").textContent = question.explanation || "Bu sorunun çözüm açıklaması bulunmuyor.";
  
  // Navigatörde Aktif Çerçevesini Güncelle
  state.review.questions.forEach((q, idx) => {
    const btn = document.getElementById(`review-nav-q-btn-${idx}`);
    if (btn) {
      if (idx === index) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

function navigateReviewQuestions(direction) {
  let nextIndex = state.review.currentIndex + direction;
  if (nextIndex >= 0 && nextIndex < state.review.questions.length) {
    renderReviewQuestion(nextIndex);
  }
}

// --- TÜM OLAY BAĞLANTILARI (EVENT LISTENERS) ---
function setupEventListeners() {
  // Yönlendirme Olayları
  document.getElementById("btn-logo").addEventListener("click", () => navigateTo("dashboard"));
  document.getElementById("nav-home").addEventListener("click", () => navigateTo("dashboard"));
  document.getElementById("nav-history").addEventListener("click", () => navigateTo("history"));
  
  const navExams = document.getElementById("nav-exams");
  if (navExams) {
    navExams.addEventListener("click", () => {
      navigateTo("dashboard", true);
      setTimeout(() => {
        const el = document.getElementById("exams-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }
  
  const navAdmin = document.getElementById("nav-admin");
  if (navAdmin) {
    navAdmin.addEventListener("click", () => navigateTo("admin"));
  }
  
  // Mobil Yönlendirme Olayları
  document.getElementById("m-nav-home").addEventListener("click", () => navigateTo("dashboard"));
  document.getElementById("m-nav-history").addEventListener("click", () => navigateTo("history"));
  
  const mNavExams = document.getElementById("m-nav-exams");
  if (mNavExams) {
    mNavExams.addEventListener("click", () => {
      navigateTo("dashboard", true);
      setTimeout(() => {
        const el = document.getElementById("exams-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }
  
  const mNavAdmin = document.getElementById("m-nav-admin");
  if (mNavAdmin) {
    mNavAdmin.addEventListener("click", () => navigateTo("admin"));
  }
  
  // Temalar
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  
  // Sınav İşlemleri
  document.getElementById("btn-start-random").addEventListener("click", startRandomExam);
  
  // Dashboard Scroll Butonu
  const scrollExamsBtn = document.getElementById("btn-scroll-exams");
  if (scrollExamsBtn) {
    scrollExamsBtn.addEventListener("click", () => {
      document.getElementById("exams-section").scrollIntoView({ behavior: "smooth" });
    });
  }
  
  // Sınav İçi Olaylar
  document.getElementById("btn-prev-question").addEventListener("click", () => navigateQuestions(-1));
  document.getElementById("btn-next-question").addEventListener("click", () => navigateQuestions(1));
  document.getElementById("btn-clear-answer").addEventListener("click", clearActiveAnswer);
  document.getElementById("btn-quit-exam").addEventListener("click", () => finishExam(false));
  document.getElementById("btn-pause-exam").addEventListener("click", pauseExam);
  document.getElementById("btn-resume-exam").addEventListener("click", resumeExam);
  document.getElementById("btn-speak-question").addEventListener("click", () => speakQuestionText(false));
  document.getElementById("btn-speak-review-question").addEventListener("click", () => speakQuestionText(true));
  
  // Şık Seçimleri
  const optionBtns = document.querySelectorAll(".question-options:not(.disabled) .option-btn");
  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.activeView === "exam") {
        const optionLetter = btn.getAttribute("data-option");
        selectOption(optionLetter);
      }
    });
  });
  
  // Klavye Kısayolları (Sınav Modunda A, B, C, D ve Ok Tuşları)
  document.addEventListener("keydown", (e) => {
    if (state.activeView === "exam") {
      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key)) {
        selectOption(key);
      } else if (e.key === "ArrowLeft") {
        navigateQuestions(-1);
      } else if (e.key === "ArrowRight") {
        navigateQuestions(1);
      }
    } else if (state.activeView === "review") {
      if (e.key === "ArrowLeft") {
        navigateReviewQuestions(-1);
      } else if (e.key === "ArrowRight") {
        navigateReviewQuestions(1);
      }
    }
  });
  
  // Sonuç Ekranı Butonları
  document.getElementById("btn-review-exam").addEventListener("click", () => {
    startReviewSession(state.review);
  });
  document.getElementById("btn-result-home").addEventListener("click", () => navigateTo("dashboard"));
  
  // İnceleme Ekranı Butonları
  document.getElementById("btn-close-review").addEventListener("click", () => navigateTo("results"));
  document.getElementById("btn-prev-review").addEventListener("click", () => navigateReviewQuestions(-1));
  document.getElementById("btn-next-review").addEventListener("click", () => navigateReviewQuestions(1));
  
  // Geçmiş Sayfası Butonları
  document.getElementById("btn-clear-history").addEventListener("click", clearHistory);
  document.getElementById("btn-history-start-exam").addEventListener("click", startRandomExam);

  // Yönetim Paneli Olayları
  const examForm = document.getElementById("admin-exam-form");
  if (examForm) {
    examForm.addEventListener("submit", handleAddExam);
  }

  const questionForm = document.getElementById("admin-question-form");
  if (questionForm) {
    questionForm.addEventListener("submit", handleAddQuestion);
  }

  const exportBtn = document.getElementById("btn-export-data");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportCustomData);
  }

  const importBtn = document.getElementById("btn-import-data-prompt");
  if (importBtn) {
    importBtn.addEventListener("click", importCustomData);
  }

  const clearCustomBtn = document.getElementById("btn-clear-custom-data");
  if (clearCustomBtn) {
    clearCustomBtn.addEventListener("click", () => {
      if (confirm("Eklediğiniz tüm özel sınavları ve soruları silmek istediğinize emin misiniz?")) {
        clearCustomData();
      }
    });
  }
}

// --- YÖNETİM PANELİ KONTROLLERİ ---
function handleAddExam(e) {
  e.preventDefault();
  const title = escapeHTML(document.getElementById("exam-title-input").value.trim());
  const year = parseInt(document.getElementById("exam-year-input").value);
  const month = escapeHTML(document.getElementById("exam-month-input").value);
  const duration = parseInt(document.getElementById("exam-duration-input").value) || 45;

  const exists = CUSTOM_EXAMS.some(ex => ex.year == year && ex.month === month);
  const builtInExists = QUESTIONS_DATA.some(q => q.exam.year == year && q.exam.month === month);
  
  if (exists || builtInExists) {
    alert("Bu sınav dönemi zaten mevcut!");
    return;
  }

  const newExam = { title, year, month, duration_minutes: duration };
  CUSTOM_EXAMS.push(newExam);
  localStorage.setItem("ehliyet-custom-exams", JSON.stringify(CUSTOM_EXAMS));
  
  document.getElementById("admin-exam-form").reset();
  renderAdminCustomExams();
  renderAdminExamDropdown();
  loadAllQuestions();
  renderDashboardData();
  alert("Yeni sınav dönemi başarıyla eklendi.");
}

function handleAddQuestion(e) {
  e.preventDefault();
  const examKey = document.getElementById("question-exam-select").value;
  if (!examKey) {
    alert("Lütfen bir sınav dönemi seçin.");
    return;
  }

  const [year, month, examTitle] = examKey.split("|");
  const category = document.getElementById("question-category-select").value;
  const questionText = escapeHTML(document.getElementById("question-text-input").value.trim());
  const optA = escapeHTML(document.getElementById("opt-a-input").value.trim());
  const optB = escapeHTML(document.getElementById("opt-b-input").value.trim());
  const optC = escapeHTML(document.getElementById("opt-c-input").value.trim());
  const optD = escapeHTML(document.getElementById("opt-d-input").value.trim());
  const correctOption = document.getElementById("correct-opt-select").value;
  const imageUrl = escapeHTML(document.getElementById("question-image-url-input").value.trim());
  const explanation = escapeHTML(document.getElementById("explanation-input").value.trim());

  const newQuestion = {
    id: "custom_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    category: category,
    question: questionText,
    options: {
      A: optA,
      B: optB,
      C: optC,
      D: optD
    },
    correct: correctOption,
    image_url: imageUrl || null,
    explanation: explanation || "",
    exam: {
      year: parseInt(year),
      month: month,
      title: examTitle
    }
  };

  CUSTOM_QUESTIONS.push(newQuestion);
  localStorage.setItem("ehliyet-custom-questions", JSON.stringify(CUSTOM_QUESTIONS));

  document.getElementById("admin-question-form").reset();
  document.getElementById("question-exam-select").value = examKey;

  loadAllQuestions();
  renderDashboardData();
  alert("Soru sınava başarıyla eklendi.");
}

function renderAdminCustomExams() {
  const listEl = document.getElementById("admin-custom-exams-list");
  if (!listEl) return;

  if (CUSTOM_EXAMS.length === 0) {
    listEl.innerHTML = `<li class="empty-item">Eklenmiş özel sınav dönemi bulunmuyor.</li>`;
    return;
  }

  listEl.innerHTML = "";
  CUSTOM_EXAMS.forEach((ex, idx) => {
    const qCount = CUSTOM_QUESTIONS.filter(q => q.exam.year == ex.year && q.exam.month === ex.month).length;
    
    const li = document.createElement("li");
    li.className = "custom-exam-item";
    li.innerHTML = `
      <div class="item-info">
        <strong>${ex.title}</strong>
        <span>${ex.year} ${ex.month} • ${qCount} Soru</span>
      </div>
      <button class="delete-btn-sm" data-index="${idx}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    `;

    li.querySelector(".delete-btn-sm").addEventListener("click", () => {
      deleteCustomExam(idx);
    });

    listEl.appendChild(li);
  });
}

function deleteCustomExam(index) {
  const ex = CUSTOM_EXAMS[index];
  if (confirm(`"${ex.title}" sınav dönemini ve bu sınava ait TÜM soruları silmek istediğinize emin misiniz?`)) {
    CUSTOM_QUESTIONS = CUSTOM_QUESTIONS.filter(q => !(q.exam.year == ex.year && q.exam.month === ex.month));
    CUSTOM_EXAMS.splice(index, 1);

    localStorage.setItem("ehliyet-custom-exams", JSON.stringify(CUSTOM_EXAMS));
    localStorage.setItem("ehliyet-custom-questions", JSON.stringify(CUSTOM_QUESTIONS));

    loadAllQuestions();
    renderAdminCustomExams();
    renderAdminExamDropdown();
    renderDashboardData();
  }
}

function renderAdminExamDropdown() {
  const selectEl = document.getElementById("question-exam-select");
  if (!selectEl) return;

  const currentVal = selectEl.value;
  selectEl.innerHTML = `<option value="">Seçiniz...</option>`;

  // 1. Statik sınavlar
  const uniqueBuiltIn = {};
  QUESTIONS_DATA.forEach(q => {
    const key = `${q.exam.year}-${q.exam.month}`;
    if (!uniqueBuiltIn[key]) {
      uniqueBuiltIn[key] = {
        year: q.exam.year,
        month: q.exam.month,
        title: q.exam.title
      };
    }
  });

  const optGroupStatic = document.createElement("optgroup");
  optGroupStatic.label = "Sistem Çıkmış Sınavları";
  
  Object.values(uniqueBuiltIn).forEach(ex => {
    const opt = document.createElement("option");
    opt.value = `${ex.year}|${ex.month}|${ex.title}`;
    opt.textContent = `${ex.title} (${ex.year} ${ex.month})`;
    optGroupStatic.appendChild(opt);
  });
  selectEl.appendChild(optGroupStatic);

  // 2. Özel sınavlar
  if (CUSTOM_EXAMS.length > 0) {
    const optGroupCustom = document.createElement("optgroup");
    optGroupCustom.label = "Sizin Eklediğiniz Sınavlar";
    
    CUSTOM_EXAMS.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = `${ex.year}|${ex.month}|${ex.title}`;
      opt.textContent = `${ex.title} (${ex.year} ${ex.month})`;
      optGroupCustom.appendChild(opt);
    });
    selectEl.appendChild(optGroupCustom);
  }

  if (currentVal) {
    selectEl.value = currentVal;
  }
}

function exportCustomData() {
  const data = {
    exams: CUSTOM_EXAMS,
    questions: CUSTOM_QUESTIONS
  };
  const textarea = document.getElementById("data-share-area");
  textarea.value = JSON.stringify(data, null, 2);
  textarea.classList.remove("hidden");
  textarea.select();
  
  try {
    document.execCommand("copy");
    alert("Tüm özel sınav ve soru verileri JSON formatında panoya kopyalandı!");
  } catch (err) {
    alert("Panoya otomatik kopyalanamadı. Lütfen aşağıdaki kutudaki metni kopyalayın.");
  }
}

function importCustomData() {
  const raw = prompt("Lütfen dışa aktardığınız özel sınav JSON verisini buraya yapıştırın:");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.exams || !parsed.questions) {
      throw new Error("Geçersiz şema. 'exams' ve 'questions' alanları bulunmalıdır.");
    }

    CUSTOM_EXAMS = [...CUSTOM_EXAMS];
    parsed.exams.forEach(newEx => {
      if (newEx && newEx.title && newEx.year && newEx.month) {
        const sanitizedEx = {
          title: escapeHTML(newEx.title),
          year: parseInt(newEx.year),
          month: escapeHTML(newEx.month),
          duration_minutes: parseInt(newEx.duration_minutes) || 45
        };
        const exists = CUSTOM_EXAMS.some(ex => ex.year == sanitizedEx.year && ex.month === sanitizedEx.month);
        if (!exists) CUSTOM_EXAMS.push(sanitizedEx);
      }
    });

    CUSTOM_QUESTIONS = [...CUSTOM_QUESTIONS];
    parsed.questions.forEach(newQ => {
      if (newQ && newQ.id && newQ.category && newQ.question && newQ.options && newQ.correct) {
        const sanitizedQ = {
          id: escapeHTML(String(newQ.id)),
          category: escapeHTML(newQ.category),
          question: escapeHTML(newQ.question),
          options: {
            A: escapeHTML(newQ.options.A),
            B: escapeHTML(newQ.options.B),
            C: escapeHTML(newQ.options.C),
            D: escapeHTML(newQ.options.D)
          },
          correct: escapeHTML(newQ.correct),
          image_url: newQ.image_url ? escapeHTML(newQ.image_url) : null,
          explanation: newQ.explanation ? escapeHTML(newQ.explanation) : "",
          exam: newQ.exam ? {
            year: parseInt(newQ.exam.year),
            month: escapeHTML(newQ.exam.month),
            title: escapeHTML(newQ.exam.title)
          } : null
        };
        const exists = CUSTOM_QUESTIONS.some(q => q.id === sanitizedQ.id);
        if (!exists) CUSTOM_QUESTIONS.push(sanitizedQ);
      }
    });

    localStorage.setItem("ehliyet-custom-exams", JSON.stringify(CUSTOM_EXAMS));
    localStorage.setItem("ehliyet-custom-questions", JSON.stringify(CUSTOM_QUESTIONS));

    loadAllQuestions();
    renderAdminCustomExams();
    renderAdminExamDropdown();
    renderDashboardData();
    alert("Veriler başarıyla içe aktarıldı!");
  } catch (err) {
    alert("Veri içe aktarılamadı: " + err.message);
  }
}

function clearCustomData() {
  CUSTOM_EXAMS = [];
  CUSTOM_QUESTIONS = [];
  localStorage.removeItem("ehliyet-custom-exams");
  localStorage.removeItem("ehliyet-custom-questions");

  loadAllQuestions();
  renderAdminCustomExams();
  renderAdminExamDropdown();
  renderDashboardData();
  alert("Tüm özel veriler silindi.");
}

// --- PREMIUM ÖZELLİKLER: SINAV DURAKLATMA ---
function pauseExam() {
  if (state.exam.isPaused) return;
  state.exam.isPaused = true;
  clearInterval(state.exam.timerInterval);
  
  // Overlay'i göster
  const overlay = document.getElementById("exam-pause-overlay");
  if (overlay) overlay.classList.remove("hidden");
  
  // Soru panelini bulanıklaştır
  const mainPanel = document.querySelector(".exam-body-layout");
  if (mainPanel) mainPanel.style.filter = "blur(8px)";
}

function resumeExam() {
  if (!state.exam.isPaused) return;
  state.exam.isPaused = false;
  
  // Overlay'i gizle
  const overlay = document.getElementById("exam-pause-overlay");
  if (overlay) overlay.classList.add("hidden");
  
  // Bulanıklığı kaldır
  const mainPanel = document.querySelector(".exam-body-layout");
  if (mainPanel) mainPanel.style.filter = "none";
  
  // Sayacı tekrar başlat
  startTimer();
}

// --- PREMIUM ÖZELLİKLER: SESLİ OKUMA (TEXT-TO-SPEECH) ---
let currentUtterance = null;

function speakQuestionText(isReview = false) {
  if (!window.speechSynthesis) {
    alert("Tarayıcınız sesli okuma özelliğini desteklemiyor.");
    return;
  }

  // Eğer zaten konuşuyorsa durdur
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }
  
  const question = isReview 
    ? state.review.questions[state.review.currentIndex] 
    : state.exam.questions[state.exam.currentIndex];
    
  if (!question) return;
  
  // Okunacak metni temizce oluştur
  let textToSpeak = `${question.question}. `;
  textToSpeak += `A şıkkı: ${question.options.A}. `;
  textToSpeak += `B şıkkı: ${question.options.B}. `;
  textToSpeak += `C şıkkı: ${question.options.C}. `;
  textToSpeak += `D şıkkı: ${question.options.D}.`;
  
  currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance.lang = 'tr-TR';
  
  const voices = window.speechSynthesis.getVoices();
  const trVoice = voices.find(voice => voice.lang.includes('tr') || voice.lang.includes('TR'));
  if (trVoice) {
    currentUtterance.voice = trVoice;
  }
  
  currentUtterance.rate = 0.9; // Rahat anlaşılması için hafif yavaş okuma
  window.speechSynthesis.speak(currentUtterance);
}

// ==========================================================================
// --- OYUNLAŞTIRMA (XP & SEVİYE) & GÜNÜN SORUSU MANTIĞI ---
// ==========================================================================

// Sürücü Ünvanı ve XP Seviye Sınırları
const RANK_THRESHOLDS = [
  { xpNeeded: 500, title: "Stajyer Sürücü 🚗", tip: "Deneme sınavı çözerek veya Günün Sorusu'nu yanıtlayarak seviye atla!" },
  { xpNeeded: 1500, title: "Amatör Sürücü 🚙", tip: "İyi gidiyorsun! Deneyimli sürücü olmak için daha fazla soru çöz!" },
  { xpNeeded: 3000, title: "Deneyimli Sürücü 🚐", tip: "Tebrikler! Trafik kurallarına hakimiyetin artıyor." },
  { xpNeeded: 5000, title: "Profesyonel Sürücü 🚛", tip: "Müthiş! Gerçek bir profesyonel gibi sürüyorsun." },
  { xpNeeded: Infinity, title: "Direksiyon Ustası 🏎️", tip: "Efsanevi seviyedesin! Ehliyet sınavı senin için çocuk oyuncağı." }
];

// Oyunlaştırma Sistemini Başlat
function initGamification() {
  let xp = parseInt(localStorage.getItem("ehliyet-xp") || "0");
  if (isNaN(xp)) xp = 0;
  updateRankUI(xp);
}

// XP Güncelleme ve Arayüze Yansıtma
function updateRankUI(xp) {
  let rankIndex = 0;
  let prevThreshold = 0;
  
  while (xp >= RANK_THRESHOLDS[rankIndex].xpNeeded && rankIndex < RANK_THRESHOLDS.length - 1) {
    prevThreshold = RANK_THRESHOLDS[rankIndex].xpNeeded;
    rankIndex++;
  }
  
  const currentRank = RANK_THRESHOLDS[rankIndex];
  const nextThreshold = currentRank.xpNeeded;
  
  // Seviye içi ilerleme yüzdesi
  let progressPercent = 0;
  if (nextThreshold !== Infinity) {
    const range = nextThreshold - prevThreshold;
    const gained = xp - prevThreshold;
    progressPercent = Math.min(100, Math.max(0, Math.round((gained / range) * 100)));
  } else {
    progressPercent = 100;
  }
  
  // Elementleri doldur
  const rankBadgeEl = document.getElementById("driver-rank-badge");
  const xpTextEl = document.getElementById("driver-xp-text");
  const xpFillEl = document.getElementById("driver-xp-fill");
  const rankTipEl = document.getElementById("driver-rank-tip");
  
  if (rankBadgeEl) rankBadgeEl.textContent = currentRank.title;
  if (xpTextEl) {
    if (nextThreshold !== Infinity) {
      xpTextEl.textContent = `${xp} / ${nextThreshold} XP`;
    } else {
      xpTextEl.textContent = `${xp} XP (Son Seviye)`;
    }
  }
  if (xpFillEl) {
    xpFillEl.style.width = `${progressPercent}%`;
  }
  if (rankTipEl) rankTipEl.textContent = currentRank.tip;
}

// XP Puanı Kazanma Fonksiyonu
function addXP(amount) {
  let xp = parseInt(localStorage.getItem("ehliyet-xp") || "0");
  if (isNaN(xp)) xp = 0;
  const oldXp = xp;
  xp += amount;
  localStorage.setItem("ehliyet-xp", xp);
  updateRankUI(xp);
  
  // Seviye Atlama Bildirimi
  let oldRankIndex = 0;
  while (oldXp >= RANK_THRESHOLDS[oldRankIndex].xpNeeded && oldRankIndex < RANK_THRESHOLDS.length - 1) {
    oldRankIndex++;
  }
  
  let newRankIndex = 0;
  while (xp >= RANK_THRESHOLDS[newRankIndex].xpNeeded && newRankIndex < RANK_THRESHOLDS.length - 1) {
    newRankIndex++;
  }
  
  if (newRankIndex > oldRankIndex) {
    alert(`🎉 TEBRİKLER! Seviye Atladınız! Yeni Ünvanınız: ${RANK_THRESHOLDS[newRankIndex].title}`);
  }
}

// Günün Sorusu Sistemi
let currentDailyQ = null;

function initDailyQuestion() {
  if (!ALL_QUESTIONS || ALL_QUESTIONS.length === 0) return;
  
  // Günlük sabit bir seed belirle
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const seed = today.getDate() + (today.getMonth() + 1) * 31;
  
  // Soruyu seç
  currentDailyQ = ALL_QUESTIONS[seed % ALL_QUESTIONS.length];
  
  // Soruyu HTML'e yaz
  const qTextEl = document.getElementById("daily-q-text");
  if (qTextEl) {
    qTextEl.textContent = currentDailyQ.question;
  }
  
  // Şıkları oluştur
  const optionsGrid = document.getElementById("daily-q-options");
  if (!optionsGrid) return;
  
  optionsGrid.innerHTML = "";
  
  // Daha önce cevaplanmış mı kontrol et
  const answeredDate = localStorage.getItem("ehliyet-daily-date");
  const isAnsweredToday = answeredDate === dateStr;
  const savedSelected = localStorage.getItem("ehliyet-daily-selected");
  
  const options = ["A", "B", "C", "D"];
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "daily-opt-btn";
    btn.setAttribute("data-option", opt);
    btn.innerHTML = `<span class="daily-opt-letter">${opt}</span> <span class="daily-opt-text">${currentDailyQ.options[opt]}</span>`;
    
    if (isAnsweredToday) {
      btn.classList.add("disabled");
      btn.disabled = true;
      if (opt === currentDailyQ.correct) {
        btn.classList.add("correct");
      } else if (opt === savedSelected) {
        btn.classList.add("wrong");
      }
    } else {
      btn.addEventListener("click", () => handleDailyAnswer(opt, dateStr));
    }
    
    optionsGrid.appendChild(btn);
  });
  
  // Açıklama panelini güncelle
  const expBox = document.getElementById("daily-q-explanation");
  const expTextEl = document.getElementById("daily-explanation-text");
  const correctAnsEl = document.getElementById("daily-correct-ans");
  
  if (isAnsweredToday && expBox && expTextEl && correctAnsEl) {
    correctAnsEl.textContent = currentDailyQ.correct;
    expTextEl.textContent = currentDailyQ.explanation;
    expBox.classList.remove("hidden");
  } else if (expBox) {
    expBox.classList.add("hidden");
  }
}

// Günün Sorusuna Verilen Cevabı İşleme
function handleDailyAnswer(selectedOption, dateStr) {
  if (!currentDailyQ) return;
  
  // Seçimi kaydet
  localStorage.setItem("ehliyet-daily-date", dateStr);
  localStorage.setItem("ehliyet-daily-selected", selectedOption);
  
  const optionsGrid = document.getElementById("daily-q-options");
  const buttons = optionsGrid.querySelectorAll(".daily-opt-btn");
  
  buttons.forEach(btn => {
    btn.classList.add("disabled");
    btn.disabled = true;
    
    const opt = btn.getAttribute("data-option");
    if (opt === currentDailyQ.correct) {
      btn.classList.add("correct");
    } else if (opt === selectedOption) {
      btn.classList.add("wrong");
    }
  });
  
  // Doğruluk kontrolü ve XP ödülü
  const isCorrect = selectedOption === currentDailyQ.correct;
  if (isCorrect) {
    addXP(25); // Günün sorusu doğru cevabına 25 XP
    alert("🎉 Harika! Günün Sorusunu DOĞRU cevapladın ve +25 XP kazandın!");
  } else {
    alert(`😔 Maalesef yanlış cevap. Doğru cevap: ${currentDailyQ.correct} şıkkıydı.`);
  }
  
  // Açıklama panelini aç
  const expBox = document.getElementById("daily-q-explanation");
  const expTextEl = document.getElementById("daily-explanation-text");
  const correctAnsEl = document.getElementById("daily-correct-ans");
  
  if (expBox && expTextEl && correctAnsEl) {
    correctAnsEl.textContent = currentDailyQ.correct;
    expTextEl.textContent = currentDailyQ.explanation;
    expBox.classList.remove("hidden");
  }
}
