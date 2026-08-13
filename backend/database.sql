-- ==========================================================================
-- EHLİYET SINAVI VERİTABANI ŞEMASI (database.sql)
-- SQLite, PostgreSQL ve MySQL Uyumlu İlişkisel Veritabanı Yapısı
-- ==========================================================================

-- 1. KULLANICILAR TABLOSU (Kullanıcı hesapları ve giriş bilgileri)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. KATEGORİLER TABLOSU (Soru Konuları: İlk Yardım, Trafik, Motor vb.)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 3. SINAVLAR TABLOSU (Resmi çıkmış sınav dönemleri veya özel denemeler)
CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    title VARCHAR(150) NOT NULL,
    year INT NOT NULL,
    month VARCHAR(20) NOT NULL, -- Örn: "Mayıs", "Şubat", "Aralık" veya "Genel Deneme"
    duration_minutes INT DEFAULT 45, -- Sınav süresi (varsayılan 45 dakika)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SORULAR TABLOSU (Ehliyet Sınavı Soruları)
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    exam_id INT,
    category_id INT NOT NULL,
    question_text TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL, -- Varsa soru görselinin sunucudaki yolu
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D' değerlerinden biri
    explanation TEXT, -- Sorunun çözüm açıklaması
    points INT DEFAULT 2, -- Her soru puanı (genelde 50 soru için 2'şer puan)
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    CHECK (correct_option IN ('A', 'B', 'C', 'D'))
);

-- 5. KULLANICI SINAV KATILIMLARI (Sınav sonuçları ve süre analizleri)
CREATE TABLE IF NOT EXISTS user_exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score INT DEFAULT 0, -- Alınan puan (0-100)
    correct_count INT DEFAULT 0,
    wrong_count INT DEFAULT 0,
    blank_count INT DEFAULT 0,
    time_spent_seconds INT NOT NULL, -- Sınavda harcanan süre (saniye cinsinden)
    is_completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

-- 6. KULLANICI CEVAPLARI TABLOSU (Kullanıcının hangi soruya ne cevap verdiğini tutar - İnceleme Ekranı için)
CREATE TABLE IF NOT EXISTS user_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- PostgreSQL için: SERIAL PRIMARY KEY
    user_exam_id INT NOT NULL,
    question_id INT NOT NULL,
    chosen_option CHAR(1) DEFAULT NULL, -- 'A', 'B', 'C', 'D' veya boş bırakılmışsa NULL
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_exam_id) REFERENCES user_exams(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CHECK (chosen_option IN ('A', 'B', 'C', 'D') OR chosen_option IS NULL)
);

-- ==========================================================================
-- DİZİNLER (INDEXES) - Performans Optimizasyonları İçin
-- ==========================================================================
CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_user_exams_user ON user_exams(user_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_exam ON user_responses(user_exam_id);
