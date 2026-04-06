const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// 1. Form verilerini (input kutularını) okuyabilmek için gerekli ayarlar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. CSS, Resim gibi dosyaların olduğu 'public' klasörünü dışarı açıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 🚀 SAYFA GÖRÜNTÜLEME ROTALARI (GET)
// ==========================================

// Tarayıcıya /login yazınca login.html gitsin
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Tarayıcıya /register yazınca register.html gitsin
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Kayıt başarılı sayfasını göster
app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// Ana Sayfa (Dashboard) sayfasını göster
app.get('/anasayfa', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'anasayfa.html'));
});

// Ana sayfaya (/) gidince otomatik logine yönlendirsin
app.get('/', (req, res) => {
    res.redirect('/login');
});


// ==========================================
// 🚀 1. KAYIT OLMA (REGISTER) İŞLEMİ (POST)
// ==========================================
app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username.trim(),
        password: req.body.password.trim()
    };

    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);

        users.push(newUser);
        fs.writeFileSync(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2));

        // Kayıt bitince "Kayıt Başarılı" sayfasına git
        res.redirect('/success.html'); 
    } catch (error) {
        console.error("Kayıt hatası:", error);
        res.send("Kayıt sırasında bir hata oluştu.");
    }
});


// ==========================================
// 🚀 2. GİRİŞ YAPMA (LOGIN) İŞLEMİ (POST)
// ==========================================
app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    console.log(`Giriş deneniyor -> Kullanıcı: [${username}]`);

    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // GİRİŞ BAŞARILIYSA: Hazırladığımız anasayfa.html dosyasına gönder!
            res.redirect('/anasayfa');
        } else {
            // HATA VARSA: Şık kırmızı hata mesajı
            res.send(`
                <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
                    <h2 style="color: #D90429;">Hata: Şef bulunamadı veya şifre yanlış!</h2>
                    <p>Mutfakta böyle biri yok, bilgilerini kontrol et.</p>
                    <br>
                    <a href="/login" style="padding: 10px 20px; background-color: #D90429; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Geri dön ve tekrar dene</a>
                </div>
            `);
        }
    } catch (error) {
        console.error("Login hatası:", error);
        res.send("Sistem veritabanına ulaşamadı.");
    }
});


// ==========================================
// 🚀 SUNUCUYU BAŞLAT
// ==========================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    🚀 Sunucu hazır şefim!
    🔗 Giriş Ekranı: http://localhost:${PORT}/login
    🔗 Kayıt Ekranı: http://localhost:${PORT}/register
    `); 
});