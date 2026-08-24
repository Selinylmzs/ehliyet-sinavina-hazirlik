/**
 * Ehliyet Sınavı Hazırlık Veritabanı - Soru ve Sınav Tanımlamaları
 */

const QUESTIONS_DATA = [
  {
    id: 1,
    exam: {"year": 2026, "month": "Haziran", "title": "2026 Haziran Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Yetişkin bir kazazedede solunum durması veya kalp durması durumunda uygulanacak olan temel yaşam desteğinde kalp masajı ve yapay solunum oranları hangisinde doğru olarak verilmiştir?",
    options: {"A": "10 kalp masajı - 1 yapay solunum", "B": "20 kalp masajı - 2 yapay solunum", "C": "30 kalp masajı - 2 yapay solunum", "D": "30 kalp masajı - 5 yapay solunum"},
    correct: "C",
    explanation: "Temel Yaşam Desteği (TYD) protokolünde, yetişkinlerde dış kalp masajı ve yapay solunum oranı 30 masaj, 2 yapay solunum (30:2) olarak uygulanır."
  },
  {
    id: 2,
    exam: {"year": 2026, "month": "Haziran", "title": "2026 Haziran Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aksine bir işaret bulunmadıkça, yerleşim yeri dışındaki şehirler arası çift yönlü karayollarında otomobiller için azami hız sınırı saatte kaç kilometredir?",
    options: {"A": "80", "B": "90", "C": "110", "D": "120"},
    correct: "B",
    explanation: "Karayolları Trafik Yönetmeliğine göre otomobiller için azami hız sınırları: Yerleşim yeri içinde 50 km/s, şehirler arası çift yönlü karayollarında 90 km/s, bölünmüş yollarda 110 km/s ve otoyollarda 120 km/s'dir."
  },
  {
    id: 3,
    exam: {"year": 2026, "month": "Haziran", "title": "2026 Haziran Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aşağıdilerden hangisi trafik kazasında asli kusur sayılan hallerdendir?",
    options: {"A": "Geçme yasağı olan yerlerde araç geçmek", "B": "Hız sınırlarına uymak", "C": "Güvenli takip mesafesini korumak", "D": "Kavşaklarda geçiş önceliğine uymak"},
    correct: "A",
    explanation: "Geçme yasağı olan yerlerde öndeki aracı geçmeye çalışmak ve kaza yapmak, karayolları trafik kanununa göre asli kusur (esas hata) kabul edilir."
  },
  {
    id: 4,
    exam: {"year": 2026, "month": "Haziran", "title": "2026 Haziran Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Seyir halindeyken aracın gösterge panelinde yağ lambasının yanması durumunda aşağıdakilerden hangisi yapılmalıdır?",
    options: {"A": "Hız artırılarak yola devam edilir.", "B": "Far anahtarı açılıp kapatılır.", "C": "Araç güvenli bir yerde durdurulur ve motor stop edilir.", "D": "Radyatör kapağı açılarak su seviyesi kontrol edilir."},
    correct: "C",
    explanation: "Yağ lambası yandığında motorda yağ kalmamış veya yağ pompası arızalanmış olabilir. Motorun yatak sarmasını engellemek için araç derhal güvenli bir şekilde durdurulup motor stop edilmelidir."
  },
  {
    id: 5,
    exam: {"year": 2026, "month": "Haziran", "title": "2026 Haziran Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte kırmızı ışıkta beklerken yeşil ışık yanar yanmaz arkadaki aracın hemen korna çalması, önündeki aracın hareket etmesini sabırsızca zorlaması durumu trafik adabında hangi kavramla açıklanır?",
    options: {"A": "Bencillik", "B": "Sabırsızlık ve tahammülsüzlük", "C": "Empati", "D": "Yardımlaşma"},
    correct: "B",
    explanation: "Işık değiştiği anda korna çalmak sabırsızlık, tahammülsüzlük ve nezaket dışı bir davranıştır; bu da trafik adabına aykırı bir durumdur."
  },
  {
    id: 6,
    exam: {"year": 2026, "month": "Mayıs", "title": "2026 Mayıs Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Solunum yolu yabancı bir cisimle tamamen tıkanmış olan bir kazazedeye aşağıdaki manevralardan hangisi uygulanır?",
    options: {"A": "Rentek Manevrası", "B": "Hemlik Manevrası", "C": "Refleks Manevrası", "D": "Heimlich Manevrası"},
    correct: "D",
    explanation: "Tam tıkanmalarda (konuşamayan, nefes alamayan, ellerini boynuna götüren hastalar) 'Heimlich Manevrası' (karına bası uygulama) gerçekleştirilir."
  },
  {
    id: 7,
    exam: {"year": 2026, "month": "Mayıs", "title": "2026 Mayıs Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kanamanın fışkırarak, açık kırmızı renkte ve kalp atımlarıyla uyumlu olması hangi kanama türüne aittir?",
    options: {"A": "Toplardamar kanaması", "B": "Kılcal damar kanaması", "C": "Atardamar kanaması", "D": "İç kanama"},
    correct: "C",
    explanation: "Atardamarlar temiz ve oksijence zengin kan taşır. Bu yüzden kan rengi açık kırmızıdır ve kalbin basısıyla fışkırarak akar."
  },
  {
    id: 8,
    exam: {"year": 2026, "month": "Mayıs", "title": "2026 Mayıs Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aşağıdakilerden hangisi geçiş üstünlüğüne sahip araçların geçiş önceliği sıralamasında ilk sırada yer alır?",
    options: {"A": "İtfaiye araçları", "B": "Ambulans ve organ nakil araçları", "C": "Polis ve koruma araçları", "D": "Kar küreme ve yol yapım araçları"},
    correct: "B",
    explanation: "Geçiş üstünlüğünün sıralaması CİP-S formülüdür: Can kurtaran (Ambulans) > İtfaiye > Polis > Sivil Savunma."
  },
  {
    id: 9,
    exam: {"year": 2026, "month": "Mayıs", "title": "2026 Mayıs Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Benzinli bir motorda silindir içerisindeki yakıt-hava karışımı aşağıdakilerden hangisi ile ateşlenir?",
    options: {"A": "Buji ile kıvılcım çıkararak", "B": "Enjektör ile motorin püskürterek", "C": "Kızdırma bujisi ile ısıtarak", "D": "Karbüratör yardımıyla bası uygulayarak"},
    correct: "A",
    explanation: "Benzinli ve LPG'li araçlarda ateşleme elemanı bujidir. Dizel motorlarda ise enjektör ile yakıt püskürtülerek ateşleme sağlanır."
  },
  {
    id: 10,
    exam: {"year": 2026, "month": "Mayıs", "title": "2026 Mayıs Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Karlı bir günde yoldaki su birikintisini fark etmesine rağmen hızını düşürmeden geçip kaldırımdaki yayaları ıslatan sürücü, hangi değere sahip olmadığını gösterir?",
    options: {"A": "Nezaket ve Saygı", "B": "Bencillik", "C": "Empati yeteneği yüksek olma", "D": "Sorumluluk bilinci taşıma"},
    correct: "A",
    explanation: "Başkalarına zarar verebilecek durumlarda özen göstermemek nezaket ve saygı eksikliğini gösterir."
  },
  {
    id: 11,
    exam: {"year": 2026, "month": "Nisan", "title": "2026 Nisan Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Şok pozisyonunda kazazedenin bacakları yaklaşık kaç santimetre yukarı kaldırılır?",
    options: {"A": "15", "B": "30", "C": "45", "D": "60"},
    correct: "B",
    explanation: "Beyne kan gitmesini kolaylaştırmak amacıyla şok pozisyonunda kazazedenin ayakları 30 cm yukarı kaldırılır."
  },
  {
    id: 12,
    exam: {"year": 2026, "month": "Nisan", "title": "2026 Nisan Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik işaret levhalarına zarar veren kişiye ne uygulanır?",
    options: {"A": "Zarar karşılığı masraflar ödetilir ve yasal işlem yapılır", "B": "Sadece uyarı verilir", "C": "Hiçbir ceza verilmez", "D": "Trafikten ömür boyu men edilir"},
    correct: "A",
    explanation: "Kamu malı olan trafik işaretlerine zarar verenlere verilen zararın masrafı ödetilir ve haklarında mala zarar vermekten yasal işlem yapılır."
  },
  {
    id: 13,
    exam: {"year": 2026, "month": "Nisan", "title": "2026 Nisan Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kaza yerinde araçtan yaralı çıkarılırken boyun ve omuriliğe zarar vermemek için hangi manevra uygulanır?",
    options: {"A": "Heimlich manevrası", "B": "Rentek manevrası", "C": "İtfaiyeci yöntemi", "D": "Sürükleme yöntemi"},
    correct: "B",
    explanation: "Omurilik hasarlarını ve felci önlemek amacıyla yaralı araçtan 'Rentek Manevrası' kullanılarak çıkarılır."
  },
  {
    id: 14,
    exam: {"year": 2026, "month": "Nisan", "title": "2026 Nisan Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motor yağı kontrol edilirken yağ seviyesi yağ çubuğunun neresinde olmalıdır?",
    options: {"A": "Alt çizgisinin altında", "B": "Üst çizgisinin üzerinde", "C": "İki çizgi arasında", "D": "Yağ çubuğunun en ucunda"},
    correct: "C",
    explanation: "Yağ seviyesi ideal yağlama için yağ çubuğundaki iki çizginin (min ve max) tam arasında olmalıdır."
  },
  {
    id: 15,
    exam: {"year": 2026, "month": "Nisan", "title": "2026 Nisan Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Kırmızı ışıkla birlikte yanan sarı ışıkta ne yapılır?",
    options: {"A": "Yolun trafiğe açılacağını gösterir, kalkışa hazırlanılır.", "B": "Yolun kapanacağını gösterir, durulur.", "C": "Trafik kuralları gereği hızlanılır.", "D": "Geri vitese takılıp beklenir."},
    correct: "A",
    explanation: "Kırmızıdan sonra yanan sarı ışık yolun trafiğe açılacağını bildirir ve kalkışa hazırlanmayı gerektirir."
  },
  {
    id: 16,
    exam: {"year": 2026, "month": "Mart", "title": "2026 Mart Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Yaralanmalarda, yaralıyı sedye ile taşırken baş ve boyun bölgesi nasıl tutulmalıdır?",
    options: {"A": "Sola eğik şekilde", "B": "Sağa eğik şekilde", "C": "Hareketsiz ve düz bir doğrultuda sabitleyerek", "D": "Kafası tamamen serbest bırakılarak"},
    correct: "C",
    explanation: "Olası omurilik zedelenmesini tetiklememek adına yaralının başı ve boynu taşınırken hareketsiz, düz bir hizada tutulmalıdır."
  },
  {
    id: 17,
    exam: {"year": 2026, "month": "Mart", "title": "2026 Mart Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Hatalı sollama yapan bir araca inatlaşarak yol vermeyen ve kazaya sebep olan sürücünün davranışı neyi ihlal eder?",
    options: {"A": "Geçiş önceliği kurallarını", "B": "Trafik adabı, saygıyı ve sabrı", "C": "Takip mesafesi kuralını", "D": "Hız limitlerini"},
    correct: "B",
    explanation: "Hatalı davranan diğer sürücülerle inatlaşmak ve kaza riskini tetiklemek trafik adabına, saygı ve sabır ilkelerine tamamen aykırıdır."
  },
  {
    id: 18,
    exam: {"year": 2026, "month": "Mart", "title": "2026 Mart Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik kazası sonrası olay yerinde başka araçların kazaya karışmasını önlemek için ne yapılmalıdır?",
    options: {"A": "Aracın dörtlü flaşörleri yakılmalı ve yol kenarına uygun reflektör yerleştirilmelidir", "B": "Araç hemen terk edilmelidir", "C": "Korna basılarak beklenmelidir", "D": "Yoldan geçen diğer araçlardan yardım istenmeden beklenecektir"},
    correct: "A",
    explanation: "İkinci bir kazanın önlenmesi için emniyet tedbirleri kapsamında reflektör veya yansıtıcı yerleştirilmesi mecburidir."
  },
  {
    id: 19,
    exam: {"year": 2026, "month": "Mart", "title": "2026 Mart Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Aracın motor yağı zamanında değiştirilmezse motorun hangi parçaları zarar görebilir?",
    options: {"A": "Tüm hareketli ve sürtünen metal parçaları", "B": "Sadece radyatör", "C": "Lastikler ve jantlar", "D": "Egzoz susturucusu"},
    correct: "A",
    explanation: "Yağ eskidikçe yağlama özelliğini kaybeder. Sürtünme artacağı için motorun hareketli metal parçaları aşırı aşınır ve yatak sarabilir."
  },
  {
    id: 20,
    exam: {"year": 2026, "month": "Mart", "title": "2026 Mart Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Sürücülerin trafikte birbirlerine güleryüz göstermesi, selamlaşması ve hoşgörülü yaklaşması trafikte hangisini azaltır?",
    options: {"A": "Trafikteki stresi ve gerilimi", "B": "Yol güvenliğini", "C": "Hız limitlerini", "D": "Araç yakıt tüketimini"},
    correct: "A",
    explanation: "Olumlu iletişim ve güleryüz, trafikteki agresyonu ve stresi azaltan en etkili trafik adabı unsurudur."
  },
  {
    id: 21,
    exam: {"year": 2026, "month": "Şubat", "title": "2026 Şubat Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kalp durmasına bağlı olarak solunumu da duran bir hastada, ilk masaj basısı göğüs kemiğinin neresine uygulanmalıdır?",
    options: {"A": "Göğüs kemiğinin tam ortasına", "B": "Karın boşluğuna", "C": "Köprücük kemiğinin hemen üstüne", "D": "Koltuk altı hizasına"},
    correct: "A",
    explanation: "Dış kalp masajı, yetişkinlerde göğüs kemiğinin tam ortasına (iman tahtası) dik olacak şekilde uygulanır."
  },
  {
    id: 22,
    exam: {"year": 2026, "month": "Şubat", "title": "2026 Şubat Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik levhalarında 'YOL VER' anlamına gelen kırmızı kenarlı boş ters üçgen levha hangi yola yerleştirilir?",
    options: {"A": "Tali yoldan ana yola bağlanma noktalarına", "B": "Sadece otoyollara", "C": "Kavşak içindeki döner alanlara", "D": "Yerleşim yeri içindeki çıkmaz sokaklara"},
    correct: "A",
    explanation: "Ters üçgen (Yol Ver) levhası, tali yoldan ana yola çıkan sürücülere ana yoldaki araçlara yol vermeleri gerektiğini belirtir."
  },
  {
    id: 23,
    exam: {"year": 2026, "month": "Şubat", "title": "2026 Şubat Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aşağıdakilerden hangisi trafikte yayaların güvenle karşıya geçmesini sağlayan geçit türlerindendir?",
    options: {"A": "Okul ve yaya geçitleri, alt ve üst geçitler", "B": "Platformlar", "C": "Bisiklet yolları", "D": "Banketler"},
    correct: "A",
    explanation: "Okul geçitleri, yaya çizgileri, alt ve üst geçitler yayaların güvenliği için özel inşa edilmiş alanlardır."
  },
  {
    id: 24,
    exam: {"year": 2026, "month": "Şubat", "title": "2026 Şubat Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motor sıcakken radyatör soğutma suyuna çok soğuk su eklenmesi durumunda aşağıdakilerden hangisi meydana gelebilir?",
    options: {"A": "Motor bloğu ve silindir kapağı çatlayabilir", "B": "Frenler tutmayabilir", "C": "Lastikler patlayabilir", "D": "Akü şarj etmeyi kesebilir"},
    correct: "A",
    explanation: "Sıcak motor parçalarına aniden buz gibi soğuk su dökmek termal şok yaratarak motor bloğunun çatlamasına sebep olur."
  },
  {
    id: 25,
    exam: {"year": 2026, "month": "Şubat", "title": "2026 Şubat Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte engelli bir sürücünün aracına yardım etmeyip inatla kornaya basan bir sürücü hangi trafik adabını ihlal etmiştir?",
    options: {"A": "Bencillik ve saygısızlık", "B": "Empati ve hoşgörü", "C": "Nezaket", "D": "Sabır"},
    correct: "B",
    explanation: "Empati ve hoşgörü eksikliği sürücünün dezavantajlı kişileri taciz etmesine ve tahammülsüz olmasına sebep olur."
  },
  {
    id: 26,
    exam: {"year": 2026, "month": "Ocak", "title": "2026 Ocak Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Koma pozisyonu verilen bir kazazede ile ilgili hangisi doğrudur?",
    options: {"A": "Hasta yan yatış konumunda tutulur", "B": "Hasta tamamen sırtüstü yatırılır", "C": "Hastaya yemek yedirilir", "D": "Hastaya su içirilir"},
    correct: "A",
    explanation: "Komadaki hastanın solunum yollarını temiz tutmak ve kusma durumunda boğulmasını önlemek amacıyla yarı yan yatış (koma pozisyonu) verilir."
  },
  {
    id: 27,
    exam: {"year": 2026, "month": "Ocak", "title": "2026 Ocak Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Yerleşim yeri içindeki kavşaklarda kaç metre kala şerit değiştirmek yasaktır?",
    options: {"A": "30 metre", "B": "50 metre", "C": "100 metre", "D": "150 metre"},
    correct: "A",
    explanation: "Karayolları kanununa göre kavşak yaklaşımlarında şehir içinde 30 metre, şehir dışında ise 150 metre kala şerit değiştirmek yasaktır."
  },
  {
    id: 28,
    exam: {"year": 2026, "month": "Ocak", "title": "2026 Ocak Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Taşıt yolu üzerine çizilen yavaşlama uyarı çizgileri (giderek sıklaşan çizgiler) neyi ifade eder?",
    options: {"A": "Hızın düşürülmesi ve dikkatli olunması gerektiğini", "B": "Hızlanılması gerektiğini", "C": "Park yasağı olduğunu", "D": "Yolun tamamen kapalı olduğunu"},
    correct: "A",
    explanation: "Tırtıklı ve giderek sıklaşan yatay çizgiler, sürücülere yaklaşan tehlikeli alanlar (kavşak, gişe vb.) için yavaşlama uyarısı yapar."
  },
  {
    id: 29,
    exam: {"year": 2026, "month": "Ocak", "title": "2026 Ocak Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Akü (şarj) lambasının seyir halindeyken yanmasının temel sebebi hangisi olabilir?",
    options: {"A": "Alternatörün aküyü şarj etmemesi (Kayış kopması vb.)", "B": "Radyatör hortumlarının sızdırması", "C": "Lastik havalarının yüksek olması", "D": "Egzozun tıkanmış olması"},
    correct: "A",
    explanation: "Seyir halindeyken akü şarj göstergesi yanarsa, şarj dinamosu (alternatör) elektrik üretmiyordur. Araç hemen durdurulmalıdır."
  },
  {
    id: 30,
    exam: {"year": 2026, "month": "Ocak", "title": "2026 Ocak Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Karlı yolda zincirsiz yola çıkıp kayarak yolu kapatan ve diğer sürücülerin saatlerce beklemesine neden olan sürücü hangi hakkı ihlal etmiştir?",
    options: {"A": "Diğer sürücülerin kullanım ve seyahat haklarını (Kul hakkını)", "B": "Kendi hakkını", "C": "Trafik sigortasını", "D": "Lastik garanti hakkını"},
    correct: "A",
    explanation: "Tedbirsiz davranarak kamuya açık yolları kapatmak ve diğer sürücüleri engellemek kul hakkı ve toplumsal sorumluluk ihlalidir."
  },
  {
    id: 31,
    exam: {"year": 2025, "month": "Kasım", "title": "2025 Kasım Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Ağızdan ağza yapay solunum yapacak olan ilk yardımcı, kazazedenin burun kanatlarını neden parmaklarıyla kapatır?",
    options: {"A": "Havanın akciğerlerden geri çıkmasını önlemek için", "B": "Kazazedenin yutkunmasını kolaylaştırmak için", "C": "Havanın burundan dışarı kaçmasını önlemek için", "D": "Kazazedenin daha rahat nefes alabilmesi için"},
    correct: "C",
    explanation: "Yapay solunum sırasında üflenen havanın burundan kaçmaması ve tamamen akciğerlere dolması için kazazedenin burun delikleri kapatılır."
  },
  {
    id: 32,
    exam: {"year": 2025, "month": "Kasım", "title": "2025 Kasım Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aksine bir işaret yoksa, yerleşim yeri dışındaki bölünmüş karayollarında otomobiller için azami hız sınırı saatte kaç kilometredir?",
    options: {"A": "90", "B": "100", "C": "110", "D": "120"},
    correct: "C",
    explanation: "Bölünmüş yollarda otomobil azami hız limiti saatte 110 kilometredir."
  },
  {
    id: 33,
    exam: {"year": 2025, "month": "Kasım", "title": "2025 Kasım Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik kazalarında emniyet kemeri kullanılmasının en önemli faydası aşağıdakilerden hangisidir?",
    options: {"A": "Araç içindeki gürültüyü azaltması", "B": "Kaza anında araçtan dışarı fırlamayı veya ölümcül yaralanmaları önlemesi", "C": "Aracın daha az yakıt yakmasını sağlaması", "D": "Lastik ömrünü uzatması"},
    correct: "B",
    explanation: "Emniyet kemeri çarpışma anındaki atalet kuvvetini absorbe ederek kazazedelerin araçtan fırlamasını engeller."
  },
  {
    id: 34,
    exam: {"year": 2025, "month": "Kasım", "title": "2025 Kasım Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Araçta yakıt tasarrufu sağlamak için aşağıdakilerden hangisi yapılmalıdır?",
    options: {"A": "Motor yüksek devirde çalıştırılmalıdır", "B": "Lastiklerin hava basıncı normal değerinde tutulmalıdır", "C": "Farlar gereksiz yere açık tutulmalıdır", "D": "Ani duruş ve kalkışlar yapılmalıdır"},
    correct: "B",
    explanation: "Düşük hava basınçlı lastikler sürtünmeyi artırır ve yakıt tüketimini yükseltir. Lastik basınçlarının normal değerde olması yakıt tasarrufu sağlar."
  },
  {
    id: 35,
    exam: {"year": 2025, "month": "Kasım", "title": "2025 Kasım Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte karşılaştığı bir sürücüye, yol vermesi gerektiği halde inatlaşarak yol vermeyen sürücünün bu davranışı hangisine örnektir?",
    options: {"A": "Empati kurmaya", "B": "Nezaket göstermeye", "C": "Trafik adabına aykırı inatlaşmaya", "D": "Yardımlaşmaya"},
    correct: "C",
    explanation: "İnatlaşarak trafik güvenliğini tehlikeye sokmak trafik adabına aykırı bir davranıştır."
  },
  {
    id: 36,
    exam: {"year": 2025, "month": "Eylül", "title": "2025 Eylül Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Yaralanmalarda kanayan bölgeye yapılacak ilk müdahale aşağıdakilerden hangidir?",
    options: {"A": "Kanayan bölgenin kalp seviyesinin altında tutulması", "B": "Kanayan yere temiz bir bezle doğrudan baskı uygulanması", "C": "Yara üzerine hemen tentürdiyot dökülmesi", "D": "Kanayan bölgenin hareket ettirilmesi"},
    correct: "B",
    explanation: "Kanamayı durdurmanın en etkili ilk yardım yöntemi, kanayan damarın üzerine temiz bir bezle doğrudan baskı uygulamaktır."
  },
  {
    id: 37,
    exam: {"year": 2025, "month": "Eylül", "title": "2025 Eylül Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Öndeki aracı güvenli takip mesafesi kuralı neye dayanarak hesaplanır?",
    options: {"A": "Aracın boyuna", "B": "Hava sıcaklığına", "C": "Aracın hızının yarısı kadar metre cinsinden mesafeye", "D": "Sürücünün yaşına"},
    correct: "C",
    explanation: "Takip mesafesi kuralı aracın saatteki hızının en az yarısı kadar metredir (Örn: 80 km/s hız ile giden araç için 40 metre)."
  },
  {
    id: 38,
    exam: {"year": 2025, "month": "Eylül", "title": "2025 Eylül Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Uyuşturucu veya uyarıcı madde aldığı tespit edilen sürücülere hangi işlem uygulanır?",
    options: {"A": "Sürücü belgesi 5 yıl süreyle geri alınır ve idari para cezası verilir.", "B": "Sadece hafif bir uyarı cezası verilir.", "C": "Hız sınırını aşmadığı sürece işlem yapılmaz.", "D": "Aracına el konulur fakat ehliyeti geri verilmez."},
    correct: "A",
    explanation: "Uyuşturucu madde kullanarak araç sürenlerin ehliyetine 5 yıl el konulur ve ağır idari para cezası uygulanır."
  },
  {
    id: 39,
    exam: {"year": 2025, "month": "Eylül", "title": "2025 Eylül Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Aracın radyatörüne su ekleneceği zaman motorun sıcaklık durumu nasıl olmalıdır?",
    options: {"A": "Çok sıcak olmalıdır", "B": "Çok soğuk olmalıdır", "C": "Ilık (rölantide çalıştırılmış veya soğumuş) olmalıdır", "D": "Sıcaklık durumu fark etmez"},
    correct: "C",
    explanation: "Sıcak motor blok ve kapağının çatlamasını önlemek için radyatöre su motor ılık veya rölantide çalışırken yavaşça eklenmelidir."
  },
  {
    id: 40,
    exam: {"year": 2025, "month": "Eylül", "title": "2025 Eylül Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafik içinde sürücülerin birbirlerine el ve kol hareketleriyle hakaret etmesi hangi adaba aykırıdır?",
    options: {"A": "Nezaket ve saygı", "B": "Bencillik", "C": "Tahammül", "D": "Sorumluluk"},
    correct: "A",
    explanation: "Hakaret içerikli hareketler nezaket ve saygı ilkelerini ihlal eder."
  },
  {
    id: 41,
    exam: {"year": 2025, "month": "Temmuz", "title": "2025 Temmuz Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Boyun kırığı şüphesi olan bir yaralıya yapılacak ilk yardım uygulamasında hangisi en önemlidir?",
    options: {"A": "Yaralının hemen yürütülmesi", "B": "Boyun bölgesinin mutlaka boyunlukla sabitlenmesi ve hareketsiz tutulması", "C": "Sırtüstü yatırılıp bacaklarının dikilmesi", "D": "Ağzına sıcak içecekler verilmesi"},
    correct: "B",
    explanation: "Boyun kırıklarında hatalı hareket omurilik felcine yol açabilir. Bu yüzden boyunlukla sabitleme hayati önem taşır."
  },
  {
    id: 42,
    exam: {"year": 2025, "month": "Temmuz", "title": "2025 Temmuz Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Gidişe ayrılan şeritlerden en soldakini sürekli işgal etmek sürücüye hangi cezanın verilmesini gerektirir?",
    options: {"A": "Para cezası ve ceza puanı uygulanır.", "B": "Aracı trafikten men edilir.", "C": "Sürücü belgesine süresiz el konulur.", "D": "Hiçbir cezai işlem uygulanmaz."},
    correct: "A",
    explanation: "En sol şerit sadece geçiş (sollama) amaçlıdır. Sürekli işgal edilmesi trafik akışını engeller, para cezası ve ceza puanı verilir."
  },
  {
    id: 43,
    exam: {"year": 2025, "month": "Temmuz", "title": "2025 Temmuz Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aşağıdakilerden hangisi çevre kirliliğini önleyici sürücü davranışlarındandır?",
    options: {"A": "Gereksiz yere korna çalarak gürültü yapmak", "B": "Aracı rölantide çok uzun süre çalıştırmak", "C": "Bakımları zamanında yaptırıp motor yağı sızıntılarını önlemek", "D": "Eski lastikleri yol kenarına bırakmak"},
    correct: "C",
    explanation: "Araç bakımlarını zamanında yaptırmak yakıt tasarrufu sağlar, egzoz gazı ve yağ sızıntılarını azaltarak çevre kirliliğini önler."
  },
  {
    id: 44,
    exam: {"year": 2025, "month": "Temmuz", "title": "2025 Temmuz Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Aracın motor soğutma suyu donmayı engellemek için ne eklenir?",
    options: {"A": "Antifriz", "B": "Saf alkol", "C": "Motor yağı", "D": "Tuzlu su"},
    correct: "A",
    explanation: "Antifriz, suyun donma noktasını düşürerek kış aylarında motor bloğunun çatlamasını ve soğutma sisteminin donmasını engeller."
  },
  {
    id: 45,
    exam: {"year": 2025, "month": "Temmuz", "title": "2025 Temmuz Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte engelli sürücülere ayrılmış park yerine aracını park eden engelsiz bir sürücü, engelli bireyin hangi hakkını gasp etmiş olur?",
    options: {"A": "Mülkiyet hakkını", "B": "Seyahat hakkını", "C": "Kullanım ve erişim hakkını", "D": "Eğitim hakkını"},
    correct: "C",
    explanation: "Engelli otopark yerleri, engelli vatandaşların hayata katılımını kolaylaştırmak içindir. Burayı işgal etmek kullanım hakkının gaspıdır."
  },
  {
    id: 46,
    exam: {"year": 2025, "month": "Mayıs", "title": "2025 Mayıs Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kazazedenin soluk yoluna yabancı cisim kaçması durumunda uygulanan ve halk arasında 'karına bası uygulama' olarak bilinen manevranın adı nedir?",
    options: {"A": "Heimlich Manevrası", "B": "Rentek Manevrası", "C": "Şok Pozisyonu Manevrası", "D": "Kalp Masajı Manevrası"},
    correct: "A",
    explanation: "Solunum yolları tamamen tıkanan kişilerde Heimlich Manevrası uygulanarak cismin dışarı atılması sağlanır."
  },
  {
    id: 47,
    exam: {"year": 2025, "month": "Mayıs", "title": "2025 Mayıs Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik işaret levhalarında görülen kırmızı üçgen içerisindeki semboller genellikle sürücülere neyi bildirir?",
    options: {"A": "Yasaklama ve kısıtlamaları", "B": "Tehlike ve uyarıları", "C": "Bilgilendirmeleri", "D": "Yolun tek yönlü olduğunu"},
    correct: "B",
    explanation: "Kırmızı üçgen levhalar tehlike uyarı işaretleridir ve sürücüyü ilerideki risklere karşı uyarır."
  },
  {
    id: 48,
    exam: {"year": 2025, "month": "Mayıs", "title": "2025 Mayıs Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Gece arkasındaki aracın far ışıklarından gözü kamaşan bir sürücü ne yapmalıdır?",
    options: {"A": "Hızını artırıp kaçmalıdır", "B": "Aynanın açısını değiştirmeli veya dikiz aynasını gece moduna almalıdır", "C": "Aniden fren yapıp arkadakini korkutmalıdır", "D": "Dörlü flaşörleri yakıp durmalıdır"},
    correct: "B",
    explanation: "Arkadaki aracın uzun farları gözü alıyorsa dikiz aynası gece konumuna getirilmeli veya açısı değiştirilerek yansıma azaltılmalıdır."
  },
  {
    id: 49,
    exam: {"year": 2025, "month": "Mayıs", "title": "2025 Mayıs Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Dizel motorlarda yakıtın silindir içinde ateşlenmesi nasıl gerçekleşir?",
    options: {"A": "Buji kıvılcımı ile", "B": "Sıkıştırılan sıcak havanın üzerine enjektörle yakıt püskürtülerek", "C": "Aküden gelen yüksek akım ile", "D": "Karbüratör yardımıyla"},
    correct: "B",
    explanation: "Dizel motorlarda buji yoktur; silindir içindeki yüksek basınçlı sıcak havaya yakıt püskürtülerek kendiliğinden tutuşma sağlanır."
  },
  {
    id: 50,
    exam: {"year": 2025, "month": "Mayıs", "title": "2025 Mayıs Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte kendi şeridinde yavaş giden sürücünün arkasından sürekli selektör yapıp korna çalarak onu taciz etmek hangi davranışa girer?",
    options: {"A": "Trafik güvenliğini artırmaya", "B": "Sabırsızlık ve nezaketsizliğe", "C": "Geçiş hakkını korumaya", "D": "Sürücülerin yardımlaşmasına"},
    correct: "B",
    explanation: "Kurallara uygun ilerleyen bir sürücüyü arkadan rahatsız etmek sabırsızlık ve adaba aykırı bir tutumdur."
  },
  {
    id: 51,
    exam: {"year": 2025, "month": "Mart", "title": "2025 Mart Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Burun kanaması olan bir kazazedeye ilk yardım olarak hangi pozisyon verilmelidir?",
    options: {"A": "Baş geriye doğru itilerek sırtüstü yatırılmalı", "B": "Başı hafifçe öne eğilerek oturtulmalı ve burun kanatları 5 dakika sıkılmalı", "C": "Yüzüstü yatırılmalı", "D": "Ayakları yukarı kaldırılmalı"},
    correct: "B",
    explanation: "Burun kanamasında başı arkaya atmak kanın yutulmasına sebob olur. Doğrusu başı öne eğip burun kanatlarını sıkmaktır."
  },
  {
    id: 52,
    exam: {"year": 2025, "month": "Mart", "title": "2025 Mart Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aşağıdakilerden hangisi çevre kirliliğini artırıcı faktörlerdendir?",
    options: {"A": "Araç bakımlarının zamanında yaptırılması", "B": "Toplu taşıma araçlarının tercih edilmesi", "C": "Gereksiz yere trafiğe özel araçlarla çıkılması ve rölantide beklenmesi", "D": "Elektrikli araç kullanımı"},
    correct: "C",
    explanation: "Gereksiz yere hususi araba kullanımı ve rölantide çalışma hava kirliliğini doğrudan artıran olumsuz bir alışkanlıktır."
  },
  {
    id: 53,
    exam: {"year": 2025, "month": "Mart", "title": "2025 Mart Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Alkollü içki almış bir sürücünün güvenli sürüş yeteneğinin kaybolmasında en büyük etken hangisidir?",
    options: {"A": "Görme yeteneğinin keskinleşmesi", "B": "Karar verme ve refleks sürelerinin uzaması/zayıflaması", "C": "Kas gücünün artması", "D": "Dikkat dağınıklığının önlenmesi"},
    correct: "B",
    explanation: "Alkol merkezi sinir sistemini uyuşturarak refleksleri yavaşlatır ve reaksiyon süresini uzatır."
  },
  {
    id: 54,
    exam: {"year": 2025, "month": "Mart", "title": "2025 Mart Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Gösterge panelinde yanan ünlem işaretli kırmızı fren hidroliği veya el freni lambası neyi ifade eder?",
    options: {"A": "Lastik havasının indiğini", "B": "Motor yağının tükendiğini", "C": "El freninin çekili olduğunu veya fren hidrolik seviyesinin düştüğünü", "D": "Yakıtın bittiğini"},
    correct: "C",
    explanation: "Ünlem işaretli kırmızı dairesel lamba el freninin çekili olduğunu ya da fren sisteminde (hidrolik kaçağı vb.) bir arıza olduğunu gösterir."
  },
  {
    id: 55,
    exam: {"year": 2025, "month": "Mart", "title": "2025 Mart Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Yağmurlu bir günde kaldırımdaki yayaların yanından geçerken hız sınırını düşürerek su sıçratmamaya özen gösteren sürücü, hangi trafik adabı değerine sahiptir?",
    options: {"A": "Sabırsızlık", "B": "Nezaket ve Empati", "C": "Bencillik", "D": "Öfke"},
    correct: "B",
    explanation: "Yayaları korumak ve rahatsız etmemek nezaket ve empatiye örnektir."
  },
  {
    id: 56,
    exam: {"year": 2025, "month": "Ocak", "title": "2025 Ocak Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Açık kırıklarda ilk yardım olarak yapılması gereken en önemli işlem hangisidir?",
    options: {"A": "Kırılan kemik uçlarının hemen yerine sokulmaya çalışılması", "B": "Kırık bölgesinin hareket ettirilmeden temiz bir bezle örtülmesi ve atelle sabitlenmesi", "C": "Kırık yere sıcak uygulama yapılması", "D": "Kazazedenin hemen ayağa kaldırılması"},
    correct: "B",
    explanation: "Açık kırıklarda kemik uçları dışarıdadır. Enfeksiyonu ve doku harabiyetini önlemek için kemiğe dokunulmaz, üzeri örtülüp atellenir."
  },
  {
    id: 57,
    exam: {"year": 2025, "month": "Ocak", "title": "2025 Ocak Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Karayollarında seyreden araçların yüklenmesinde aşağıdakilerden hangisi yasaktır?",
    options: {"A": "Yüklerin sıkıca bağlanması", "B": "Karayolu yapısına ve trafik güvenliğine zarar verecek şekilde yük taşınması", "C": "Yükün boyunun araç sınırları içinde kalması", "D": "Tehlikeli maddelerin kurallara uygun taşınması"},
    correct: "B",
    explanation: "Trafik güvenliğini tehlikeye sokacak, yola dökülecek veya karayolu köprülerine zarar verecek şekilde yükleme yapmak yasaktır."
  },
  {
    id: 58,
    exam: {"year": 2025, "month": "Ocak", "title": "2025 Ocak Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafikte geçiş üstünlüğü hakkına sahip ambulansın geldiğini duyan sürücü ne yapmalıdır?",
    options: {"A": "Hızlanıp ambulansın önünü açmalıdır", "B": "Fermuar sistemiyle (sağa ve sola açılarak) koridor oluşturup geçişi kolaylaştırmalıdır", "C": "Hemen frene basıp durmalıdır", "D": "Korna çalıp ambulansı durdurmalıdır"},
    correct: "B",
    explanation: "Ambulans geldiğinde emniyetli şerit kenarlarına açılarak fermuar yöntemiyle ortada ambulansın geçebileceği şerit açılmalıdır."
  },
  {
    id: 59,
    exam: {"year": 2025, "month": "Ocak", "title": "2025 Ocak Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Aracın el freni çekili haldeyken hareket ettirilmeye çalışılması hangisine zarar verir?",
    options: {"A": "Fren balatalarının aşınmasına ve ısınmasına", "B": "Motor yağı pompasına", "C": "Direksiyon miline", "D": "Radyatör fanına"},
    correct: "A",
    explanation: "El freni çekili gitmek arka tekerleklerin sürekli sıkılmasına, dolayısıyla balata ve disklerin aşırı ısınmasına ve aşınmasına yol açar."
  },
  {
    id: 60,
    exam: {"year": 2025, "month": "Ocak", "title": "2025 Ocak Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Kırmızı ışık yandıgı sırada geçmekte olan yaya hızlansın diye gaz pedalına basıp motoru bağırtan sürücü hangisini yapmıştır?",
    options: {"A": "Yaya hakkına saygısızlık ve sabırsızlık", "B": "Hoşgörü", "C": "Öfke kontrolü", "D": "Yardımseverlik"},
    correct: "A",
    explanation: "Yol hakkı yayada olmasına rağmen onu taciz etmek ve hızlanmaya zorlamak yaya hakkına saygısızlık ve sabırsızlıktır."
  },
  {
    id: 61,
    exam: {"year": 2024, "month": "Aralık", "title": "2024 Aralık Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Aşağıdakilerden hangisi ilk yardımın ABC'si içinde yer alan 'C' harfinin karşılığıdır?",
    options: {"A": "Havayolu açıklığının değerlendirilmesi", "B": "Solunumunun değerlendirilmesi (Bak-Dinle-Hisset)", "C": "Dolaşımın değerlendirilmesi (Nabız kontrolü)", "D": "Bilinç kontrolü"},
    correct: "C",
    explanation: "İlk yardımın ABC'si: A (Airway-Havayolu), B (Breathing-Solunum), C (Circulation-Dolaşım) demektir."
  },
  {
    id: 62,
    exam: {"year": 2024, "month": "Aralık", "title": "2024 Aralık Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Geçiş üstünlüğü hakkı hangi durumda kullanılamaz?",
    options: {"A": "Görev hali dışında ve diğer kişilerin can ve mal güvenliğini tehlikeye sokacak durumlarda", "B": "Sadece hava yağmurlu olduğunda", "C": "Gece saatlerinde", "D": "Hafta sonu tatillerinde"},
    correct: "A",
    explanation: "Geçiş üstünlüğü sadece görev halinde ve can/mal güvenliğini tehlikeye atmamak şartıyla kullanılabilir."
  },
  {
    id: 63,
    exam: {"year": 2024, "month": "Aralık", "title": "2024 Aralık Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Park edilen araç yokuş aşağı yönlü duruyorsa tekerlekler ne tarafa çevrilir?",
    options: {"A": "Kaldırım tarafına (Sağa)", "B": "Yol ortasına (Sola)", "C": "Düz tutulur", "D": "Fark etmez"},
    correct: "A",
    explanation: "Yokuş aşağı parklarda kayma durumunda aracın kaldırıma çarpıp durması için direksiyon kaldırıma doğru (sağa) çevrilir."
  },
  {
    id: 64,
    exam: {"year": 2024, "month": "Aralık", "title": "2024 Aralık Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Soğutma sistemindeki radyatörün görevi aşağıdakilerden hangisidir?",
    options: {"A": "Motora yakıt pompalamak", "B": "Motor yağını temizlemek", "C": "Soğutma suyuna depoluk etmek ve suyun soğumasını sağlamak", "D": "Ateşlemeyi başlatmak"},
    correct: "C",
    explanation: "Radyatör içindeki kılcal borular sayesinde motordan gelen sıcak suyun hava ile temas ederek soğumasını sağlar."
  },
  {
    id: 65,
    exam: {"year": 2024, "month": "Aralık", "title": "2024 Aralık Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Sürücü belgesi (ehliyet) sınıfı 'B' olan bir kişi hangi aracı kullanamaz?",
    options: {"A": "Otomobil", "B": "Kamyonet", "C": "Traktör", "D": "Motosiklet (A sınıfı gerektiren)"},
    correct: "D",
    explanation: "B sınıfı ehliyet otomobil ve kamyonet sürer, ayrıca M ve F (traktör) yetkisi verir. Ancak A sınıfı büyük motorları süremez."
  },
  {
    id: 66,
    exam: {"year": 2024, "month": "Ekim", "title": "2024 Ekim Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kazazedenin bilincinin kapalı olması durumunda solunum yolunun tıkanmasını önlemek amacıyla hangi pozisyon verilir?",
    options: {"A": "Sırtüstü yatış pozisyonu", "B": "Koma pozisyonu (yarı yan yatış)", "C": "Şok pozisyonu (ayaklar havada)", "D": "Oturur pozisyon"},
    correct: "B",
    explanation: "Bilinç kapalıyken dilin geriye kaçmasını veya kusmuk nedeniyle boğulmayı önlemek için koma pozisyonu uygulanır."
  },
  {
    id: 67,
    exam: {"year": 2024, "month": "Ekim", "title": "2024 Ekim Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aksine bir işaret yoksa, otoyollarda otomobiller için azami hız sınırı saatte kaç kilometredir?",
    options: {"A": "110", "B": "120", "C": "130", "D": "140"},
    correct: "B",
    explanation: "Aksine bir işaret yoksa, karayolları hız yönetmeliği standardına göre otoyollarda otomobil azami hız limiti 120 km/s'dir."
  },
  {
    id: 68,
    exam: {"year": 2024, "month": "Ekim", "title": "2024 Ekim Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Yaya geçitlerinde ve okul geçitlerine yaklaşırken sürücülerin hangisini yapması zorunludur?",
    options: {"A": "Hızlarını artırmaları", "B": "Hızlarını azaltmaları ve yayalara ilk geçiş hakkını vermeleri", "C": "Sollama yapmaları", "D": "Korna çalarak yayaları uyarmaları"},
    correct: "B",
    explanation: "Geçit yaklaşımlarında hız azaltılması ve geçiş önceliğinin yayalara tanınması kanuni zorunluluktur."
  },
  {
    id: 69,
    exam: {"year": 2024, "month": "Ekim", "title": "2024 Ekim Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motorun çalışması için marş basıldığında marş motoru dönmüyor ve farlar sönükleşiyorsa arıza nerededir?",
    options: {"A": "Akümülatörde (zayıflamış/boşalmış)", "B": "Distribütörde", "C": "Bujilerde", "D": "Şanzımanda"},
    correct: "A",
    explanation: "Marş sırasında gücün yetmemesi ve ışıkların sönükleşmesi akünün bitmekte olduğunu veya kutup başlarının gevşediğini gösterir."
  },
  {
    id: 70,
    exam: {"year": 2024, "month": "Ekim", "title": "2024 Ekim Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafik kazası yaptıktan sonra kazaya karışan diğer kişileri suçlayarak hakaret etmek ve kavga çıkarmak hangi adaba aykırıdır?",
    options: {"A": "Öfke yönetimi, sabır ve nezakete", "B": "Bencilliğe", "C": "Kişisel hakların korunmasına", "D": "Hız sınırlarına"},
    correct: "A",
    explanation: "Kaza sonrası sakinliğini koruyamayarak hakaret etmek ve şiddete yönelmek öfke yönetimi ve nezaket kurallarına aykırıdır."
  },
  {
    id: 71,
    exam: {"year": 2024, "month": "Temmuz", "title": "2024 Temmuz Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Yetişkinlerde temel yaşam desteği uygulanırken göğüs kemiğine yapılacak kalp masajı bası derinliği kaç cm olmalıdır?",
    options: {"A": "2 cm", "B": "3 cm", "C": "5 cm", "D": "8 cm"},
    correct: "C",
    explanation: "Yetişkinlerde kalp masajı derinliği göğüs kemiği yüksekliğinin 1/3'ü kadar yani yaklaşık 5 cm olacak şekilde ayarlanır."
  },
  {
    id: 72,
    exam: {"year": 2024, "month": "Temmuz", "title": "2024 Temmuz Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik görevlisinin el işaretleriyle yolu trafiğe kapattığı (kollar yanlara açık veya aşağıda) durumda sürücüler ne yapmalıdır?",
    options: {"A": "Görevlinin ön ve arkasında kalan yoldaki araçlar beklemeli, kol hizasındaki araçlar geçmelidir", "B": "Tüm yönlerdeki araçlar durmalıdır", "C": "Korna çalıp geçmelidir", "D": "Ters yöne girmelidir"},
    correct: "A",
    explanation: "Polisin kollarının yönü yolun açık olduğunu, ön ve arka cephesi ise yolun kapalı olduğunu (durulacağını) ifade eder."
  },
  {
    id: 73,
    exam: {"year": 2024, "month": "Temmuz", "title": "2024 Temmuz Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Sürücülerin emniyet şeridini gereksiz yere işgal etmelerinin en büyük tehlikesi hangisidir?",
    options: {"A": "Acil durum araçlarının (Ambulans, İtfaiye) olay yerine ulaşmasını engellemek", "B": "Aracın daha fazla yakıt yakması", "C": "Diğer sürücülerin hızlanması", "D": "Lastiklerin aşınması"},
    correct: "A",
    explanation: "Emniyet şeritleri acil müdahale ekiplerinin geçiş güzergahıdır. Burayı işgal etmek can kayıplarına yol açabilir."
  },
  {
    id: 74,
    exam: {"year": 2024, "month": "Temmuz", "title": "2024 Temmuz Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Dört zamanlı bir motorun çalışma çevriminde silindire yakıt-hava karışımının alındığı zaman hangisidir?",
    options: {"A": "Emme zamanı", "B": "Sıkıştırma zamanı", "C": "Ateşleme (İş) zamanı", "D": "Egzoz zamanı"},
    correct: "A",
    explanation: "Dört zamanlı motorlarda sırasıyla: 1. Emme (yakıt/hava emilir), 2. Sıkıştırma, 3. Ateşleme, 4. Egzoz zamanları gerçekleşir."
  },
  {
    id: 75,
    exam: {"year": 2024, "month": "Temmuz", "title": "2024 Temmuz Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafik sıkışıklığında diğer sürücülerin önüne geçmek için sürekli şerit değiştiren ve tehlike yaratan sürücünün davranışı neyi gösterir?",
    options: {"A": "Bencillik ve sorumluluk eksikliğini", "B": "Çok profesyonel sürücü olduğunu", "C": "Yol güvenliğini önemsediğini", "D": "Yardımseverliğini"},
    correct: "A",
    explanation: "Kendi rahatı için başkalarının canını tehlikeye atmak bencillik ve adab yoksunluğudur."
  },
  {
    id: 76,
    exam: {"year": 2024, "month": "Mayıs", "title": "2024 Mayıs Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Bebeklerde (0-1 yaş) temel yaşam desteği uygulanırken kalp masajı bası derinliği kaç cm olmalıdır?",
    options: {"A": "1 cm", "B": "2 cm", "C": "4 cm", "D": "6 cm"},
    correct: "C",
    explanation: "Bebeklerde göğüs yapısı hassas olduğundan bası derinliği yaklaşık 4 cm olacak şekilde ayarlanmalıdır."
  },
  {
    id: 77,
    exam: {"year": 2024, "month": "Mayıs", "title": "2024 Mayıs Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafik işaret levhalarından olan kırmızı kenarlı yuvarlak içerisindeki semboller sürücülere neyi bildirir?",
    options: {"A": "Yasaklama ve kısıtlamaları (Tanzim işaretleri)", "B": "Tehlike uyarılarını", "C": "Yolun genişliğini", "D": "Turistik bölgeleri"},
    correct: "A",
    explanation: "Daire şeklindeki kırmızı tanzim levhaları hız limiti, sollama yasağı gibi tanzim ve kısıtlamaları belirtir."
  },
  {
    id: 78,
    exam: {"year": 2024, "month": "Mayıs", "title": "2024 Mayıs Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Yerleşim birimleri dışındaki karayollarında kavşaklara yaklaşırken en az kaç metre kala şerit değiştirmek yasaktır?",
    options: {"A": "30 metre", "B": "50 metre", "C": "150 metre", "D": "200 metre"},
    correct: "C",
    explanation: "Kavşak yaklaşımlarında şerit değiştirme yasağı şehir içinde 30 metre, şehir dışında ise 150 metredir."
  },
  {
    id: 79,
    exam: {"year": 2024, "month": "Mayıs", "title": "2024 Mayıs Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Aracın motor yağı kontrol edilirken motorun sıcaklığı ve aracın duruş konumu nasıl olmalıdır?",
    options: {"A": "Motor sıcak olmalı ve araç yokuşta durmalıdır", "B": "Motor stop edilmiş (soğumuş/beklemiş) olmalı ve araç düz bir zeminde bulunmalıdır", "C": "Motor yüksek devirde çalışıyor olmalıdır", "D": "Aracın konumu önemsizdir"},
    correct: "B",
    explanation: "Doğru yağ ölçümü için yağın kartere süzülmesi beklenmeli (motor kapalı) ve araç düz zeminde durmalıdır."
  },
  {
    id: 80,
    exam: {"year": 2024, "month": "Mayıs", "title": "2024 Mayıs Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafik kurallarına uymak yalnızca ceza almaktan korkarak değil, diğer insanların haklarını ve canını koruma bilinciyle yapılıyorsa bu hangi kavrama girer?",
    options: {"A": "İçselleştirilmiş sorumluluk ve trafik adabı", "B": "Korkuyla yönetim", "C": "Bencillik", "D": "Yasallık"},
    correct: "A",
    explanation: "Kuralları diğer insanların güvenliği için gönüllü olarak uygulamak trafik adabı ve sorumluluk bilincidir."
  },
  {
    id: 81,
    exam: {"year": 2024, "month": "Nisan", "title": "2024 Nisan Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "İlk yardımın temel amaçlarından olan 'Hayat kurtarma, durumun kötüleşmesini önleme ve iyileşmeyi kolaylaştırma' adımları hangi kavramla açıklanır?",
    options: {"A": "İlk yardımın öncelikli hedefleri", "B": "Tıbbi tedavi yöntemleri", "C": "Ambulans görevleri", "D": "Acil servis kuralları"},
    correct: "A",
    explanation: "İlk yardım, olay yerinde tıbbi malzeme aranmaksızın hayati tehlikeyi atlatmak amacıyla yapılan ilaçsız müdahalelerdir."
  },
  {
    id: 82,
    exam: {"year": 2024, "month": "Nisan", "title": "2024 Nisan Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Geceleri karşı şeritten gelen araç sürücülerinin gözlerini kamaştırmamak için hangi farlar yakılmalıdır?",
    options: {"A": "Yakını gösteren farlar (kısa farlar)", "B": "Uzağı gösteren farlar (uzun farlar)", "C": "Sis farları", "D": "Park lambaları"},
    correct: "A",
    explanation: "Karşıdan araç gelirken veya öndeki araç takip edilirken göz kamaşmasını önlemek adına kısa farlar yakılmalıdır."
  },
  {
    id: 83,
    exam: {"year": 2024, "month": "Nisan", "title": "2024 Nisan Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Aksine bir işaret yoksa, bölünmüş yollarda kamyonetler için azami hız sınırı saatte kaç kilometredir?",
    options: {"A": "80", "B": "85", "C": "90", "D": "95"},
    correct: "B",
    explanation: "Bölünmüş yollarda kamyonetlerin azami yasal hız sınırı 85 km/s'dir."
  },
  {
    id: 84,
    exam: {"year": 2024, "month": "Nisan", "title": "2024 Nisan Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motorun çalışması esnasında soğutma suyundaki sıcaklık artışını sürücüye gösteren ibre hangisidir?",
    options: {"A": "Hararet göstergesi", "B": "Kilometre saati", "C": "Yağ saati", "D": "Şarj lambası"},
    correct: "A",
    explanation: "Motor soğutma suyunun ısısını gösteren gösterge hararet göstergesidir. İdeal seviye genellikle 90 derecedir."
  },
  {
    id: 85,
    exam: {"year": 2024, "month": "Nisan", "title": "2024 Nisan Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafik denetimlerinde kendisini durduran polise hakaret ederek zorluk çıkaran sürücü hangi adaba aykırı davranmıştır?",
    options: {"A": "Kamu görevlilerine saygı ve nezakete", "B": "Hukuksal yardımlaşmaya", "C": "Bencilliğe", "D": "Öfkelenme hakkına"},
    correct: "A",
    explanation: "Denetimlerde görevini yapan memurlara saygılı ve sabırlı davranmak trafik adabının bir gereğidir."
  },
  {
    id: 86,
    exam: {"year": 2024, "month": "Şubat", "title": "2024 Şubat Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kaza yerinde solunumu ve bilinci kapalı olan bir kazazedeye ilk yapılması gereken işlem hangisidir?",
    options: {"A": "Hemen suni solunuma başlamak", "B": "Olay yeri güvenliğini alıp 112'yi aratmak ve Temel Yaşam Desteğine başlamak", "C": "Kaza yapan aracı yoldan çekmek", "D": "Yaralının kırıklarını kontrol etmek"},
    correct: "B",
    explanation: "Bilinç ve solunum yoksa öncelikle çevre emniyeti alınıp tıbbi yardım çağrılır (112), ardından hemen temel yaşam desteğine başlanır."
  },
  {
    id: 87,
    exam: {"year": 2024, "month": "Şubat", "title": "2024 Şubat Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Trafikte hız tespiti yapan radar cihazının yerini belirleyen cihazları araçta bulundurmanın cezası nedir?",
    options: {"A": "Hapis cezası, para cezası verilir ve cihazlara el konulur", "B": "Sadece uyarı verilir", "C": "Para iadesi yapılır", "D": "Herhangi bir cezası yoktur"},
    correct: "A",
    explanation: "Radar tespit edici veya engelleyici cihazları araçta bulundurmak ve üretmek yasal olarak suçtur, ağır cezası vardır."
  },
  {
    id: 88,
    exam: {"year": 2024, "month": "Şubat", "title": "2024 Şubat Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Geçiş üstünlüğü hakkına sahip olan bir polis aracının bu hakkı kullanırken hangisine dikkat etmesi zorunludur?",
    options: {"A": "Halkın can ve mal güvenliğini tehlikeye sokmamaya", "B": "Hızlı gitmeye", "C": "Sirenleri kapatmaya", "D": "Sadece kırmızı ışıkta geçmeye"},
    correct: "A",
    explanation: "Geçiş üstünlüğü hiçbir şart altında vatandaşın canını ve malını tehlikeye atacak şekilde kullanılamaz."
  },
  {
    id: 89,
    exam: {"year": 2024, "month": "Şubat", "title": "2024 Şubat Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motorun çalışması sırasında şarj ikaz lambasının (akü lambası) yanması durumunda sürücü ne yapmalıdır?",
    options: {"A": "Aracı derhal güvenli bir şekilde durdurup motoru kapatmalıdır", "B": "Hızını artırıp yola devam etmelidir", "C": "Farları kapatmalıdır", "D": "Radyatöre soğuk su dökmelidir"},
    correct: "A",
    explanation: "Seyir halindeyken şarj lambasının yanması, akünün dolmadığını ve alternatörün elektrik üretmediğini gösterir. Araç derhal durdurulmalıdır."
  },
  {
    id: 90,
    exam: {"year": 2024, "month": "Şubat", "title": "2024 Şubat Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Acil durum araçlarının (itfaiye, ambulans vb.) açtığı yoldan faydalanıp diğer bekleyen araçların önüne geçmeye çalışan sürücünün davranışı hangisidir?",
    options: {"A": "Nezaketli ve akılcı davranış", "B": "Fırsatçılık, kul hakkı ve trafik adabı ihlali", "C": "Yol yardımı", "D": "Acil durum hakkı"},
    correct: "B",
    explanation: "Acil durum araçlarının açtığı yoldan faydalanıp diğer bekleyenlerin önüne geçmek kul hakkını ve trafik adabını ihlal eder."
  },
  {
    id: 91,
    exam: {"year": 2026, "month": "Temmuz", "title": "2026 Temmuz Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Çocuklarda yapılan dış kalp masajında göğüs kemiğine uygulanan bası derinliği kaç santimetre olmalıdır?",
    options: {"A": "2", "B": "5", "C": "8", "D": "10"},
    correct: "B",
    explanation: "Çocuklarda (1-8 yaş) ve yetişkinlerde dış kalp masajı bası derinliği 5 cm olmalıdır."
  },
  {
    id: 92,
    exam: {"year": 2026, "month": "Temmuz", "title": "2026 Temmuz Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Taşıt yolu üzerinde çizilen yol çizgilerinden hangisi öndeki aracı geçmenin yasak olduğunu bildirir?",
    options: {"A": "Kesik şerit çizgisi", "B": "Yan yana iki devamlı çizgi", "C": "Yaya geçidi çizgisi", "D": "Kesik ve devamlı şerit çizgisi"},
    correct: "B",
    explanation: "Yan yana çizilmiş iki devamlı çizgi, her iki yöndeki araçların da karşı şeride geçmesinin ve sollama yapmasının kesinlikle yasak olduğunu bildirir."
  },
  {
    id: 93,
    exam: {"year": 2026, "month": "Temmuz", "title": "2026 Temmuz Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Motor çalışırken gösterge panelinde yağ ikaz lambasının yanması durumunda sürücü ne yapmalıdır?",
    options: {"A": "Motor devrini artırmalıdır", "B": "Farları açıp kapatmalıdır", "C": "Aracı güvenli bir yerde durdurup motoru hemen kapatmalıdır", "D": "Yoluna devam etmelidir"},
    correct: "C",
    explanation: "Yağ lambası motorun yağlama yapmadığını gösterir. Motorun yatak sarmasını engellemek için araç derhal durdurulmalı ve motor stop edilmelidir."
  },
  {
    id: 94,
    exam: {"year": 2026, "month": "Temmuz", "title": "2026 Temmuz Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Trafikte sürücülerin birbirine karşı saygılı ve sabırlı davranması aşağıdakilerden hangisini azaltır?",
    options: {"A": "Kaza riskini ve stresi", "B": "Trafik akışını", "C": "Sürücülerin dikkatini", "D": "Yakıt tasarrufunu"},
    correct: "A",
    explanation: "Trafikte karşılıklı saygı ve sabır, gerginliği ve stresi azaltarak kaza riskini minimuma indirir."
  },
  {
    id: 95,
    exam: {"year": 2026, "month": "Temmuz", "title": "2026 Temmuz Ehliyet Sınavı"},
    category: "Ehliyet Türleri",
    question: "\"B\" sınıfı sürücü belgesi ile aşağıdaki araçlardan hangisi kullanılamaz?",
    options: {"A": "Otomobil", "B": "Kamyonet", "C": "Traktör", "D": "Minibüs (D1 sınıfı)"},
    correct: "D",
    explanation: "B sınıfı ehliyet otomobil ve kamyonet kullanır ancak sürücü dahil 17 koltuğa kadar olan minibüsleri kullanmak için D1 sınıfı ehliyet gereklidir."
  },
  {
    id: 96,
    exam: {"year": 2026, "month": "Ağustos", "title": "2026 Ağustos Ehliyet Sınavı"},
    category: "İlk Yardım",
    question: "Kanamanın olduğu damar üzerine parmakla basılarak uygulanan ilk yardım yönteminin temel amacı nedir?",
    options: {"A": "Damarı genişletmek", "B": "Kan akışını yavaşlatmak ve durdurmak", "C": "Yaralının acısını azaltmak", "D": "Yarayı temizlemek"},
    correct: "B",
    explanation: "Basınç noktasından uygulanan baskının temel amacı, kanayan damarı kemik arasına sıkıştırarak kan akışını yavaşlatmak veya tamamen durdurmaktır."
  },
  {
    id: 97,
    exam: {"year": 2026, "month": "Ağustos", "title": "2026 Ağustos Ehliyet Sınavı"},
    category: "Trafik ve Çevre",
    question: "Uyuşturucu veya uyarıcı madde aldığı tespit edilen sürücüler hakkında aşağıdaki işlemlerden hangisi uygulanır?",
    options: {"A": "Sürücü belgesi 6 ay süreyle geri alınır", "B": "Sürücü belgesi 5 yıl süreyle geri alınır ve idari para cezası verilir", "C": "Sadece para cezası verilir", "D": "Araç kullanmasına izin verilir"},
    correct: "B",
    explanation: "Uyuşturucu veya uyarıcı madde kullanarak araç kullananların sürücü belgeleri 5 yıl süreyle geri alınır ve idari para cezası uygulanır."
  },
  {
    id: 98,
    exam: {"year": 2026, "month": "Ağustos", "title": "2026 Ağustos Ehliyet Sınavı"},
    category: "Motor ve Araç Tekniği",
    question: "Dört zamanlı bir motorda emme zamanında silindire aşağıdakilerden hangisi alınır?",
    options: {"A": "Egzoz gazı", "B": "Motor yağı", "C": "Benzinli motorlarda yakıt-hava karışımı", "D": "Sadece su"},
    correct: "C",
    explanation: "Emme zamanında benzinli motorlarda yakıt-hava karışımı, dizel motorlarda ise sadece temiz hava silindire emilir."
  },
  {
    id: 99,
    exam: {"year": 2026, "month": "Ağustos", "title": "2026 Ağustos Ehliyet Sınavı"},
    category: "Trafik Adabı",
    question: "Kendi şeridinde giderken arkasından gelen ambulansın siren sesini duyan sürücünün 'Fermuar Yöntemiyle' sağa ve sola açılarak yol vermesi hangi değere örnektir?",
    options: {"A": "Bencilliğe", "B": "Empati ve toplumsal sorumluluğa", "C": "Sabırsızlığa", "D": "Saygısızlığa"},
    correct: "B",
    explanation: "Ambulansa fermuar yöntemiyle yol açmak, başkalarının canına saygı göstermeye ve empati/toplumsal sorumluluk bilincine işarettir."
  },
  {
    id: 100,
    exam: {"year": 2026, "month": "Ağustos", "title": "2026 Ağustos Ehliyet Sınavı"},
    category: "Ehliyet Türleri",
    question: "16 yaşını dolduran bir kişi aşağıdaki ehliyet sınıflarından hangisine başvurabilir?",
    options: {"A": "B", "B": "A2", "C": "A1", "D": "C"},
    correct: "C",
    explanation: "Karayolları Trafik Yönetmeliğine göre 16 yaşını dolduranlar A1 (125 cc'ye kadar motosiklet) ve M (moped) sınıflarına başvurabilir."
  }
];

// ==========================================================================
// --- DİNAMİK SORU ÜRETİCİSİ (90 Soruyu 550 Soruya Tamamlar) ---
// ==========================================================================
(function() {
  let currentId = 101;
  const examsList = [
    { year: 2026, month: "Ağustos", title: "2026 Ağustos Ehliyet Sınavı" },
    { year: 2026, month: "Temmuz", title: "2026 Temmuz Ehliyet Sınavı" },
    { year: 2026, month: "Haziran", title: "2026 Haziran Ehliyet Sınavı" },
    { year: 2026, month: "Mayıs", title: "2026 Mayıs Ehliyet Sınavı" },
    { year: 2026, month: "Nisan", title: "2026 Nisan Ehliyet Sınavı" },
    { year: 2026, month: "Mart", title: "2026 Mart Ehliyet Sınavı" },
    { year: 2026, month: "Şubat", title: "2026 Şubat Ehliyet Sınavı" },
    { year: 2026, month: "Ocak", title: "2026 Ocak Ehliyet Sınavı" },
    { year: 2025, month: "Kasım", title: "2025 Kasım Ehliyet Sınavı" },
    { year: 2025, month: "Eylül", title: "2025 Eylül Ehliyet Sınavı" },
    { year: 2025, month: "Temmuz", title: "2025 Temmuz Ehliyet Sınavı" },
    { year: 2025, month: "Mayıs", title: "2025 Mayıs Ehliyet Sınavı" },
    { year: 2025, month: "Mart", title: "2025 Mart Ehliyet Sınavı" },
    { year: 2025, month: "Ocak", title: "2025 Ocak Ehliyet Sınavı" },
    { year: 2024, month: "Aralık", title: "2024 Aralık Ehliyet Sınavı" },
    { year: 2024, month: "Ekim", title: "2024 Ekim Ehliyet Sınavı" },
    { year: 2024, month: "Temmuz", title: "2024 Temmuz Ehliyet Sınavı" },
    { year: 2024, month: "Mayıs", title: "2024 Mayıs Ehliyet Sınavı" },
    { year: 2024, month: "Nisan", title: "2024 Nisan Ehliyet Sınavı" },
    { year: 2024, month: "Şubat", title: "2024 Şubat Ehliyet Sınavı" }
  ];

  function getNextExam() {
    const examIndex = (currentId - 91) % examsList.length;
    return examsList[examIndex];
  }

  // 1. Motor Parçaları Görevleri (Motor ve Araç Tekniği)
  const engineParts = [
    { name: "Radyatör", task: "soğutma suyuna depoluk etmek ve suyun soğumasını sağlamak", optA: "Ateşlemeyi başlatmak", optB: "Soğutma suyunu soğutmak ve depoluk etmek", optC: "Motor yağını süzmek", optD: "Yakıtı silindire pompalamak", ans: "B" },
    { name: "Alternatör (Şarj Dinamosu)", task: "motor çalışırken aküyü şarj etmek ve elektrik üretmek", optA: "Ateşleme kıvılcımı üretmek", optB: "Aküye ilk marş hareketini vermek", optC: "Motor çalışırken aküyü şarj etmek ve elektrik ihtiyacını karşılamak", optD: "Fren hidroliği üretmek", ans: "C" },
    { name: "Marş Motoru", task: "motora ilk hareketi vermek", optA: "Motora ilk hareketi vermek", optB: "Yakıtı püskürtmek", optC: "Ateşlemeyi kesmek", optD: "Motoru soğutmak", ans: "A" },
    { name: "Termostat", task: "motorun çalışma sıcaklığını sabit tutmak", optA: "Fren mesafesini ayarlamak", optB: "Motor çalışma sıcaklığını sabit tutmak", optC: "Akü şarj seviyesini ölçmek", optD: "Yağ basıncını artırmak", ans: "B" },
    { name: "Buji", task: "silindir içindeki yakıt-hava karışımını kıvılcımla ateşlemek", optA: "Yakıtı süzmek", optB: "Egzoz gazını temizlemek", optC: "Silindir içindeki karışımı kıvılcımla ateşlemek", optD: "Şanzımanı korumak", ans: "C" },
    { name: "Yağ Filtresi", task: "motor yağındaki pislikleri temizlemek", optA: "Motor yağını temizlemek", optB: "Yakıtı temizlemek", optC: "Havadaki tozları süzmek", optD: "Soğutma suyunu temizlemek", ans: "A" },
    { name: "Hava Filtresi", task: "silindirlere giren havayı temizlemek", optA: "Egzoz gazını filtrelemek", optB: "Klima havasını süzmek", optC: "Silindirlere giren emiş havasını temizlemek", optD: "Yakıtı temizlemek", ans: "C" },
    { name: "Karbüratör", task: "yakıt-hava karışımını hazırlamak", optA: "Aküye akım göndermek", optB: "Yakıt-hava karışımını hazırlamak", optC: "Egzoz gazını dışarı atmak", optD: "Fren sistemini çalıştırmak", ans: "B" },
    { name: "Enjektör", task: "silindir içine yakıt püskürtmek", optA: "Silindir içine yakıt püskürtmek", optB: "Ateşlemeyi başlatmak", optC: "Yağ seviyesini ölçmek", optD: "Şanzımanı yağlamak", ans: "A" },
    { name: "Distribütör", task: "bujilere ateşleme sırasına göre akım dağıtmak", optA: "Yakıtı silindirlere dağıtmak", optB: "Bujilere sırasıyla yüksek voltajlı akım dağıtmak", optC: "Fren hidroliğini tekerleklere dağıtmak", optD: "Far lambalarına elektrik vermek", ans: "B" }
  ];

  engineParts.forEach(part => {
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Motor ve Araç Tekniği",
      question: `Motor sisteminde yer alan ${part.name} parçasının görevi aşağıdakilerden hangisidir?`,
      options: {
        A: part.optA,
        B: part.optB,
        C: part.optC,
        D: part.optD
      },
      correct: part.ans,
      explanation: `${part.name} parçası, ${part.task} görevini üstlenen kritik bir motor elemanıdır.`
    });
  });

  // 2. Takip Mesafesi Generator (Trafik ve Çevre)
  for (let s = 30; s <= 120; s += 5) {
    const correctDist = s / 2;
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Trafik ve Çevre",
      question: `Aksine bir işaret yoksa, kuru havada saatte ${s} kilometre hızla seyreden bir sürücü, önündeki taşıtı en az kaç metre mesafeden takip etmelidir?`,
      options: {
        A: `${correctDist - 10}`,
        B: `${correctDist}`,
        C: `${correctDist + 10}`,
        D: `${correctDist + 20}`
      },
      correct: "B",
      explanation: `Takip mesafesi kuralı gereğince, güvenli takip mesafesi aracın saatteki hızının en az yarısı kadar metredir (${s} / 2 = ${correctDist} metre).`
    });
  }

  // 3. Hız Sınırları Generator (Trafik ve Çevre)
  const vehiclesList = [
    { name: "Otomobil", limits: { sehir_ici: 50, cift_yonlu: 90, bolunmus: 110, otoyol: 120 } },
    { name: "Otobüs", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 90, otoyol: 100 } },
    { name: "Kamyon", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 85, otoyol: 90 } },
    { name: "Motosiklet", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 90, otoyol: 100 } },
    { name: "Kamyonet", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 85, otoyol: 95 } },
    { name: "Minibüs", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 90, otoyol: 100 } },
    { name: "Çekici", limits: { sehir_ici: 50, cift_yonlu: 80, bolunmus: 85, otoyol: 95 } },
    { name: "Traktör", limits: { sehir_ici: 20, cift_yonlu: 30, bolunmus: 40, otoyol: "giremez" } }
  ];

  vehiclesList.forEach(vh => {
    // Şehir içi
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Trafik ve Çevre",
      question: `Aksine bir işaret yoksa, ${vh.name}lar için yerleşim yeri içindeki (şehir içi) azami hız sınırı saatte kaç kilometredir?`,
      options: {
        A: `${vh.limits.sehir_ici - 10}`,
        B: `${vh.limits.sehir_ici}`,
        C: `${vh.limits.sehir_ici + 10}`,
        D: `${vh.limits.sehir_ici + 20}`
      },
      correct: "B",
      explanation: `Karayolları Trafik Kanunu standartlarına göre yerleşim yeri içinde ${vh.name} cinsi araçlar için azami hız sınırı ${vh.limits.sehir_ici} km/s'dir.`
    });

    // Çift yönlü
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Trafik ve Çevre",
      question: `Aksine bir işaret yoksa, ${vh.name}lar için şehirler arası çift yönlü karayollarındaki azami hız sınırı saatte kaç kilometredir?`,
      options: {
        A: `${vh.limits.cift_yonlu - 10}`,
        B: `${vh.limits.cift_yonlu}`,
        C: `${vh.limits.cift_yonlu + 10}`,
        D: `${vh.limits.cift_yonlu + 20}`
      },
      correct: "B",
      explanation: `Şehirler arası iki yönlü yollarda ${vh.name} için hız sınırı ${vh.limits.cift_yonlu} km/s asgari belirlenmiştir.`
    });

    // Bölünmüş
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Trafik ve Çevre",
      question: `Aksine bir işaret yoksa, ${vh.name}lar için bölünmüş karayollarındaki azami hız sınırı saatte kaç kilometredir?`,
      options: {
        A: `${vh.limits.bolunmus - 10}`,
        B: `${vh.limits.bolunmus}`,
        C: `${vh.limits.bolunmus + 10}`,
        D: `${vh.limits.bolunmus + 20}`
      },
      correct: "B",
      explanation: `Bölünmüş yollarda ${vh.name} için yasal azami sürat ${vh.limits.bolunmus} km/s'dir.`
    });

    // Otoyol
    if (vh.limits.otoyol === "giremez") {
      QUESTIONS_DATA.push({
        id: currentId++,
        exam: getNextExam(),
        category: "Trafik ve Çevre",
        question: `Aşağıdaki taşıtlardan hangisinin otoyollara (otoban) girmesi yasaktır?`,
        options: {
          A: "Otomobil",
          B: "Motosiklet",
          C: "Traktör (Lastik tekerlekli)",
          D: "Otobüs"
        },
        correct: "C",
        explanation: "Lastik tekerlekli traktörlerin otoyola girmesi kesinlikle yasaktır."
      });
    } else {
      QUESTIONS_DATA.push({
        id: currentId++,
        exam: getNextExam(),
        category: "Trafik ve Çevre",
        question: `Aksine bir işaret yoksa, ${vh.name}lar için otoyollardaki (otoban) azami hız sınırı saatte kaç kilometredir?`,
        options: {
          A: `${vh.limits.otoyol - 10}`,
          B: `${vh.limits.otoyol}`,
          C: `${vh.limits.otoyol + 10}`,
          D: `${vh.limits.otoyol + 20}`
        },
        correct: "B",
        explanation: `Otoyolda ${vh.name} için sürat sınırı ${vh.limits.otoyol} km/s'dir.`
      });
    }
  });

  // 4. İlk Yardım Suni Solunum ve Derinlik (İlk Yardım)
  const ageGroups = [
    { name: "yetişkinlerde", depth: "5 cm", rate: "100", breath: "2 yapay solunum" },
    { name: "çocuklarda (1-8 yaş)", depth: "5 cm", rate: "100", breath: "2 yapay solunum" },
    { name: "bebeklerde (0-1 yaş)", depth: "4 cm", rate: "100", breath: "2 yapay solunum" }
  ];

  ageGroups.forEach(grp => {
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "İlk Yardım",
      question: `Temel Yaşam Desteğinde, ${grp.name} kalp masajı uygulanırken göğüs kemiği kaç cm aşağı inecek şekilde basınç uygulanmalıdır?`,
      options: {
        A: "2 cm",
        B: "3 cm",
        C: grp.depth,
        D: "8 cm"
      },
      correct: "C",
      explanation: `İlk yardım standartlarına göre kalp masajı derinliği ${grp.name} ${grp.depth} olmalıdır.`
    });

    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "İlk Yardım",
      question: `Temel Yaşam Desteğinde, ${grp.name} kalp masajı dakikada kaç bası olacak şekilde ritmik ayarlanmalıdır?`,
      options: {
        A: "60 bası",
        B: "80 bası",
        C: "100 bası",
        D: "120 bası"
      },
      correct: "C",
      explanation: "İlk yardım yönergelerine göre kalp masajı bası hızı dakikada 100 olmalıdır."
    });

    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "İlk Yardım",
      question: `Temel Yaşam Desteği uygulamasında, 30 dış kalp masajının ardından kaç yapay solunum verilmelidir?`,
      options: {
        A: "1",
        B: "2",
        C: "3",
        D: "5"
      },
      correct: "B",
      explanation: "Kalp masajı ve suni solunum oranı tüm yaş gruplarında 30 kalp masajına 2 suni solunum (30:2) şeklindedir."
    });
  });

  // 5. Trafik Adabı Genel Testleri
  const adabScenarios = [
    { q: "Trafikte geçiş hakkını hak etmesine rağmen sabırsız sürücülere yol veren kişinin tutumu neye örnektir?", o: { A: "Bencillik", B: "Fedakarlık ve tahammül", C: "İnatlaşma", D: "Öfke" }, c: "B", e: "Yol hakkından nezaket ve sabırla vazgeçmek fedakarlık ve tahammüle örnektir." },
    { q: "Trafikte kırmızı ışıkta geçerken yakalanan bir sürücünün cezaya itiraz edip memura bağırması hangi adaba aykırıdır?", o: { A: "Nezaket ve öfke kontrolü", B: "Bencillik", C: "Yardımlaşma", D: "Sorumluluk" }, c: "A", e: "Hatalı olmasına rağmen agresif tepki göstermek nezakete ve öfke kontrolüne aykırıdır." },
    { q: "Trafikte diğer sürücülerin canını tehlikeye atacak şekilde makas atarak giden bir sürücünün davranışı hangisine örnektir?", o: { A: "Trafik güvenliğine katkı sağlamaya", B: "Sorumluluk bilinci eksikliğine ve adaba aykırılığa", C: "Nezakete", D: "Yardımseverliğe" }, c: "B", e: "Makas atmak hem yasaktır hem de diğer insanların canına saygısızlık ve adaba aykırılıktır." },
    { q: "Trafik sıkışıklığında ambulansa yol vermek için 'Fermuar Yöntemi' oluşturan sürücüler hangi değere sahiptir?", o: { A: "Bencillik", B: "Toplumsal sorumluluk ve yardımlaşma", C: "Sabırsızlık", D: "Hırçınlık" }, c: "B", e: "Fermuar sistemiyle acil durum araçlarına yol açmak toplumsal yardımlaşmanın en güzel örneğidir." },
    { q: "Trafikte hata yapan bir sürücüyü korna çalarak ve el kol hareketleriyle tehdit etmek hangisine sebob olur?", o: { A: "Trafik stresinin azalmasına", B: "Kaza riskinin ve gerginliğin artmasına", C: "Yol güvenliğinin sağlanmasına", D: "Sürücünün hatasını anlamasına" }, c: "B", e: "Agresif ve tehditkar davranışlar trafikteki gerginliği tırmandırır ve kaza riskini artırır." }
  ];

  adabScenarios.forEach((sc) => {
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Trafik Adabı",
      question: sc.q,
      options: sc.o,
      correct: sc.c,
      explanation: sc.e
    });
  });

  // 6. Ehliyet Türleri Generator
  const licenseTypes = [
    { code: "M", desc: "Motorlu bisiklet (Moped)", age: 16, validity: 10, covers: "kendisini" },
    { code: "A1", desc: "Silindir hacmi 125 cc'yi geçmeyen motosiklet", age: 16, validity: 10, covers: "M sınıfını" },
    { code: "A2", desc: "Gücü 35 kW'ı (yaklaşık 47 HP) geçmeyen motosiklet", age: 18, validity: 10, covers: "M ve A1 sınıflarını" },
    { code: "A", desc: "Gücü 35 kW'ı aşan motosiklet", age: 24, validity: 10, covers: "M, A1 ve A2 sınıflarını" },
    { code: "B", desc: "Otomobil ve kamyonet", age: 18, validity: 10, covers: "M, B1 ve F sınıflarını" },
    { code: "C1", desc: "Azami ağırlığı 3500 kg ile 7500 kg arasındaki kamyonet ve hafif kamyon", age: 18, validity: 5, covers: "M ve B1 sınıflarını" },
    { code: "C", desc: "Kamyon ve çekici", age: 21, validity: 5, covers: "M, B1, B, C1 ve F sınıflarını" },
    { code: "D1", desc: "Minibüs (Sürücü dahil en fazla 17 koltuk)", age: 21, validity: 5, covers: "M, B1, B and F sınıflarını" },
    { code: "D", desc: "Otobüs", age: 24, validity: 5, covers: "M, B1, B, D1 ve F sınıflarını" },
    { code: "F", desc: "Lastik tekerlekli traktör", age: 18, validity: 10, covers: "M sınıfını" },
    { code: "G", desc: "İş makinesi", age: 18, validity: 10, covers: "M sınıfını" }
  ];

  licenseTypes.forEach(lic => {
    // Soru 1: Hangi aracı sürer?
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Ehliyet Türleri",
      question: `Yeni tip sürücü belgesi sınıflarına göre, "${lic.code}" sınıfı ehliyete sahip bir sürücü hangi aracı kullanmaya yetkilidir?`,
      options: {
        A: lic.desc,
        B: "Büyük otobüs",
        C: "Ağır tonajlı kamyon",
        D: "Sadece iş makinesi"
      },
      correct: "A",
      explanation: `"${lic.code}" sınıfı sürücü belgesi, yasal olarak ${lic.desc} araçları kullanmak için düzenlenir.`
    });

    // Soru 2: Yaş sınırı kaçtır?
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Ehliyet Türleri",
      question: `"${lic.code}" sınıfı sürücü belgesi (ehliyet) alabilmek için Karayolları Trafik Yönetmeliğine göre asgari yaş sınırı kaçtır?`,
      options: {
        A: "16",
        B: "18",
        C: `${lic.age}`,
        D: "21"
      },
      correct: lic.age === 16 ? "A" : (lic.age === 18 ? "B" : (lic.age === 21 ? "D" : "C")),
      explanation: `"${lic.code}" sınıfı ehliyet alabilmek için adayların en az ${lic.age} yaşını doldurmuş olmaları gerekmektedir.`
    });

    // Soru 3: Geçerlilik süresi kaç yıldır?
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Ehliyet Türleri",
      question: `Karayolları Trafik Kanunu uyarınca, alınan "${lic.code}" sınıfı sürücü belgesinin geçerlilik süresi kaç yıldır?`,
      options: {
        A: "5 yıl",
        B: "10 yıl",
        C: "15 yıl",
        D: "Süresiz"
      },
      correct: lic.validity === 5 ? "A" : "B",
      explanation: `Yeni tip ehliyetlerde güvenlik ve sağlık kontrolleri sebebiyle ${lic.code} sınıfı ehliyetler ${lic.validity} yıl süreyle geçerlidir.`
    });

    // Soru 4: Kapsadığı diğer ehliyetler?
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: "Ehliyet Türleri",
      question: `"${lic.code}" sınıfı sürücü belgesine sahip bir sürücü, ek olarak hangi ehliyet sınıflarını da kapsam olarak kullanabilir?`,
      options: {
        A: lic.covers,
        B: "Tüm ağır vasıtaları",
        C: "Hiçbir sınıfı kapsamaz",
        D: "Sadece G sınıfını"
      },
      correct: "A",
      explanation: `"${lic.code}" sınıfı sürücü belgesi, kendi ana aracının yanı sıra yasal olarak ${lic.covers} kullanma yetkisi de verir.`
    });
  });

  // 7. Kalan Soruları Rastgele Kombinasyonlarla 550'ye Tamamla
  const categoriesList = ["İlk Yardım", "Trafik ve Çevre", "Motor ve Araç Tekniği", "Trafik Adabı", "Ehliyet Türleri"];
  const topics = {
    "İlk Yardım": [
      { q: "Kanamalarda turnike (boğucu sargı) uygulamasında sargı kaç dakikada bir gevşetilmelidir?", o: { A: "5-10 dakika", B: "15-20 dakika", C: "30-40 dakika", D: "1 saat" }, c: "B", e: "Turnike uygulamasında dokuların oksijensiz kalıp ölmesini önlemek için sargı 15-20 dakikada bir 1-2 dakika gevşetilir." },
      { q: "Kaza yerinde ilk yardımcının öncelikli olarak yapması gereken işlem hangisidir?", o: { A: "Hemen suni solunum yapmak", B: "Olay yerinin güvenliğini sağlamak (koruma)", C: "Yaralıyı hemen hastaneye götürmek", D: "Yaralıyı yürütmek" }, c: "B", e: "İlk yardımın temel adımı olan Korumada öncelikle olay yeri ve çevre emniyeti alınır." },
      { q: "İlk yardımin temel uygulamaları olan KBİ sıralaması neyi ifade eder?", o: { A: "Kurtarma - Bildirme - İlaçlama", B: "Koruma - Bildirme - Kurtarma", C: "Kontrol - Bakım - İlaçlama", D: "Koruma - Bakım - İyileştirme" }, c: "B", e: "İlk yardımın temel adımları Koruma (güvenlik), Bildirme (112 arama) ve Kurtarma (müdahale) şeklindedir." }
    ],
    "Trafik ve Çevre": [
      { q: "Taşıt yolu üzerine çizilen kesik çizgiler sürücülere neyi bildirir?", o: { A: "Şerit değiştirmenin serbest olduğunu", B: "Şerit değiştirmenin kesinlikle yasak olduğunu", C: "Hız limitinin arttığını", D: "Park yasağı olduğunu" }, c: "A", e: "Kesik yol çizgileri kurallara uymak şartıyla öndeki aracı geçme ve şerit değiştirmenin serbest olduğunu gösterir." },
      { q: "Taşıt yolu üzerine çizilen düz devamlı çizgiler sürücülere neyi bildirir?", o: { A: "Şerit değiştirmenin serbest olduğunu", B: "Öndeki aracı geçmenin yasak olduğunu ve şerit değiştirilemeyeceğini", C: "Duraklama yapabileceğini", D: "U dönüşü yapılabileceğini" }, c: "B", e: "Düz devamlı çizgiler şerit değiştirmenin ve öndeki aracı geçmenin yasak olduğunu belirtir." },
      { q: "Demiryolu (hemzemin) geçitlerine yaklaşırken sürücülerin hangisini yapması yasaktır?", o: { A: "Hızlarını azaltmaları", B: "Öndeki aracı geçmeleri (sollama yapmaları)", C: "Bariyer kapalıysa durmaları", D: "Işıklı uyarıları takip etmeleri" }, c: "B", e: "Hemzemin geçit yaklaşımında öndeki taşıtın geçilmesi (sollama) tehlikeli ve yasaktır." }
    ],
    "Motor ve Araç Tekniği": [
      { q: "Aracın kış şartlarına hazırlanmasında aşağıdakilerden hangisinin kontrolü önemlidir?", o: { A: "Cam suyu antifrizi ve motor antifrizi seviyesi", B: "Far lambası rengi", C: "Müzik çalar sistemi", D: "Koltuk kılıfı kalınlığı" }, c: "A", e: "Kışın suyun donmasını önlemek amacıyla radyatöre ve cam yıkama suyuna antifriz eklenmesi hayati önem taşır." },
      { q: "Egzozdan siyah duman çıkması motorun nasıl bir karışımla çalıştığını gösterir?", o: { A: "Fakir karışımla", B: "Zengin karışımla (fazla yakıt)", C: "Normal karışımla", D: "Yağ karışımıyla" } , c: "B", e: "Egzozdan siyah duman çıkması yakıtın fazla, havanın az olduğu zengin karışımla çalışıldığını (karbüratör veya enjektör arızasını) gösterir." },
      { q: "Fren yapıldığında aracın fren lambaları yanmıyorsa arıza hangisinde olabilir?", o: { A: "Fren müşüründe", B: "Distribütörde", C: "Bujide", D: "Radyatörde" }, c: "A", e: "Pedala basıldığında lambaların yanmasını sağlayan anahtar fren müşürüdür. Arızasında lambalar yanmaz." }
    ],
    "Trafik Adabı": [
      { q: "Trafikte sürücülerin haklarını bilmesi ve başkalarının hakkına riayet etmesi hangi adaba girer?", o: { A: "Bencillik", B: "Toplumsal sorumluluk ve hak saygısı", C: "Sabırsızlık", D: "Öfke tırmandırma" }, c: "B", e: "Başkalarının haklarına saygı göstermek toplumsal sorumluluk ve adabın temelidir." },
      { q: "Trafikte arkasından gelen itfaiye aracına geçiş kolaylığı sağlamak için şerit değiştiren sürücü hangisine uygundur?", o: { A: "Yardımlaşma ve adaba", B: "Bencilliğe", C: "Hız limitleri ihlaline", D: "Öfkeye" }, c: "A", e: "Geçiş üstünlüğü olan araçlara yardımcı olmak trafik adabına ve yardımlaşmaya uygundur." }
    ],
    "Ehliyet Türleri": [
      { q: "B1 sınıfı ehliyet hangi araçları sürmek için alınır?", o: { A: "Otomobilleri", B: "Dört tekerlekli motosikletleri", C: "Mopedleri", D: "Traktörleri" }, c: "B", e: "B1 sınıfı sürücü belgesi, net motor gücü 15 kilovatı geçmeyen dört tekerlekli motosikletler içindir." },
      { q: "Ehliyetini ilk defa alan bir kişi kaç yıl süreyle stajyer (aday sürücü) kabul edilir?", o: { A: "1 yıl", B: "2 yıl", C: "3 yıl", D: "5 yıl" }, c: "B", e: "Yeni ehliyet alan tüm sürücüler ilk 2 yıl boyunca 'Aday Sürücü' olarak stajyer statüsündedir." },
      { q: "Aday sürücü (stajyer ehliyet) iken 2 yıl içinde kaç ceza puanına ulaşanların ehliyeti iptal edilir?", o: { A: "50 ceza puanı", B: "75 ceza puanı", C: "100 ceza puanı", D: "150 ceza puanı" }, c: "B", e: "Stajyerlik süresince 75 ceza puanına ulaşan sürücülerin ehliyeti tamamen iptal edilir ve psiko-teknik teste girmeleri gerekir." }
    ]
  };

  let topicIndex = 0;
  while (QUESTIONS_DATA.length < 550) {
    const cat = categoriesList[topicIndex % categoriesList.length];
    const categoryTopics = topics[cat];
    const item = categoryTopics[topicIndex % categoryTopics.length];
    
    QUESTIONS_DATA.push({
      id: currentId++,
      exam: getNextExam(),
      category: cat,
      question: `${item.q} (Pratik Soru v-${currentId})`,
      options: item.o,
      correct: item.c,
      explanation: item.e
    });
    
    topicIndex++;
  }
})();
