/**
 * ==========================================================================
 * EHLİYET SINAVI BACKEND API ROTASI ŞABLONU (api_routes.js)
 * Express.js ve SQLite/PostgreSQL Veri Tabanı Entegrasyonu İçin Referans Kod
 * ==========================================================================
 */

const express = require('express');
const router = express.Router();

// Not: Bu kısımda veritabanı bağlantı nesnesinin (db) projeye dahil edildiği varsayılmıştır.
// const db = require('./db_connection'); 

/**
 * @route   GET /api/exams
 * @desc    Tüm sınav dönemlerini (Yıl ve Ay bazında çıkmış sınavları) getirir
 */
router.get('/exams', async (req, res) => {
    try {
        // SQL Sorgusu: Tüm sınavları listeler
        // const [exams] = await db.query('SELECT id, title, year, month, duration_minutes FROM exams ORDER BY year DESC, id DESC');
        
        // Mock Response Yapısı:
        const mockExams = [
            { id: 1, title: '2024 Mayıs Ehliyet Sınavı', year: 2024, month: 'Mayıs', duration_minutes: 45 },
            { id: 2, title: '2024 Şubat Ehliyet Sınavı', year: 2024, month: 'Şubat', duration_minutes: 45 },
            { id: 3, title: '2023 Aralık Ehliyet Sınavı', year: 2023, month: 'Aralık', duration_minutes: 45 },
            { id: 4, title: '2023 Eylül Ehliyet Sınavı', year: 2023, month: 'Eylül', duration_minutes: 45 }
        ];
        
        res.status(200).json({
            success: true,
            data: mockExams
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Sınavlar yüklenirken hata oluştu.', error: error.message });
    }
});

/**
 * @route   GET /api/exams/:id/questions
 * @desc    Belirli bir sınava ait tüm soruları getirir
 */
router.get('/exams/:id/questions', async (req, res) => {
    const examId = req.params.id;
    try {
        // SQL Sorgusu: Sınav sorularını kategorileriyle birlikte çekme
        /*
        const query = `
            SELECT q.id, q.question_text, q.image_url, q.option_a, q.option_b, q.option_c, q.option_d, 
                   q.correct_option, q.explanation, c.name as category
            FROM questions q
            JOIN categories c ON q.category_id = c.id
            WHERE q.exam_id = ?
            ORDER BY q.id ASC
        `;
        const [questions] = await db.query(query, [examId]);
        */
        
        res.status(200).json({
            success: true,
            message: `${examId} ID'li sınava ait sorular listelendi.`,
            data: [] // Soru dizisi dönecektir
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Sorular yüklenirken hata oluştu.' });
    }
});

/**
 * @route   GET /api/categories/:name/questions
 * @desc    Belirli bir konu kategorisine ait soruları rastgele getirir (Konu Testi)
 */
router.get('/categories/:name/questions', async (req, res) => {
    const categoryName = req.params.name;
    const limit = req.query.limit || 20; // Varsayılan 20 soru
    try {
        // SQL Sorgusu: Belirli bir kategoriye ait soruları rastgele sıralayarak limitli çeker
        /*
        const query = `
            SELECT q.id, q.question_text, q.image_url, q.option_a, q.option_b, q.option_c, q.option_d, 
                   q.correct_option, q.explanation, c.name as category
            FROM questions q
            JOIN categories c ON q.category_id = c.id
            WHERE c.name = ?
            ORDER BY RANDOM() -- PostgreSQL/SQLite için. MySQL için RAND()
            LIMIT ?
        `;
        const [questions] = await db.query(query, [categoryName, parseInt(limit)]);
        */
        
        res.status(200).json({
            success: true,
            category: categoryName,
            data: []
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Kategori soruları yüklenirken hata oluştu.' });
    }
});

/**
 * @route   POST /api/user-exams/submit
 * @desc    Kullanıcının çözdüğü sınavı veritabanına kaydeder ve puanı doğrular
 */
router.post('/user-exams/submit', async (req, res) => {
    const { userId, examId, userAnswers, timeSpentSeconds } = req.body;
    
    // userAnswers yapısı: { "1": "A", "2": "C", ... } (Soru ID ve Kullanıcının Seçtiği Şık)
    
    try {
        // 1. Sınava ait doğru cevap anahtarını çek
        // const [questions] = await db.query('SELECT id, correct_option, category_id FROM questions WHERE exam_id = ?', [examId]);
        const questions = []; // Veritabanından gelen veri
        
        let correctCount = 0;
        let wrongCount = 0;
        let blankCount = 0;
        const responsesToSave = []; // user_responses tablosuna atılacaklar
        
        questions.forEach(q => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correct_option;
            
            if (!userChoice) {
                blankCount++;
            } else if (isCorrect) {
                correctCount++;
            } else {
                wrongCount++;
            }
            
            responsesToSave.push({
                question_id: q.id,
                chosen_option: userChoice || null,
                is_correct: isCorrect
            });
        });
        
        // Puan hesaplama
        const score = Math.round((correctCount / questions.length) * 100);
        
        // 2. user_exams tablosuna ana kaydı at
        /*
        const [examResult] = await db.query(
            `INSERT INTO user_exams (user_id, exam_id, score, correct_count, wrong_count, blank_count, time_spent_seconds, is_completed, completed_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, NOW())`,
            [userId, examId, score, correctCount, wrongCount, blankCount, timeSpentSeconds]
        );
        const userExamId = examResult.insertId;
        */
        
        // 3. user_responses tablosuna her soru için verilen cevapları kaydet
        /*
        const responseQueries = responsesToSave.map(resp => {
            return db.query(
                `INSERT INTO user_responses (user_exam_id, question_id, chosen_option, is_correct) VALUES (?, ?, ?, ?)`,
                [userExamId, resp.question_id, resp.chosen_option, resp.is_correct]
            );
        });
        await Promise.all(responseQueries);
        */
        
        res.status(201).json({
            success: true,
            message: 'Sınav başarıyla kaydedildi.',
            data: {
                score: score,
                correct: correctCount,
                wrong: wrongCount,
                blank: blankCount,
                passed: score >= 70
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Sınav kaydedilirken hata oluştu.', error: error.message });
    }
});

/**
 * @route   GET /api/user/:userId/history
 * @desc    Kullanıcının geçmişte çözdüğü sınavların listesini getirir
 */
router.get('/user/:userId/history', async (req, res) => {
    const userId = req.params.userId;
    try {
        /*
        const query = `
            SELECT ue.id, ue.score, ue.correct_count, ue.wrong_count, ue.blank_count, 
                   ue.time_spent_seconds, ue.completed_at, e.title as exam_title
            FROM user_exams ue
            JOIN exams e ON ue.exam_id = e.id
            WHERE ue.user_id = ? AND ue.is_completed = TRUE
            ORDER BY ue.completed_at DESC
        `;
        const [history] = await db.query(query, [userId]);
        */
        res.status(200).json({
            success: true,
            data: [] // Sınav geçmişi dizisi
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Geçmiş yüklenirken hata oluştu.' });
    }
});

module.exports = router;
