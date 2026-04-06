const path = require('path');
const User = require('../models/userModel');

// Kayıt sayfasını gösterir
exports.getRegisterPage = (req, res) => {
    // path.resolve kullanarak mutlak yol oluşturuyoruz
    res.sendFile(path.resolve(__dirname, '..', 'views', 'register.html'));
};

// Kayıt butonuna basıldığında çalışır
exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.send("Lütfen tüm alanları doldurun.");
    }
    
    // Kullanıcıyı kaydet
    User.save({ username, password });
    
    // BAŞARI SAYFASI: Dosya yolunu '..' ile üst klasöre çıkacak şekilde garantiye alıyoruz
    res.sendFile(path.resolve(__dirname, '..', 'views', 'success.html'));
};

// Giriş sayfasını gösterir
exports.getLoginPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'login.html'));
};

// Giriş butonuna basıldığında çalışır
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    
    console.log("Giriş denemesi:", username);
    
    // Örnek kontrol: admin / 1234
    if (username === "admin" && password === "1234") {
        res.sendFile(path.resolve(__dirname, '..', 'views', 'success.html'));
    } else {
        res.send("Kullanıcı adı veya şifre hatalı! (admin/1234 deneyebilirsin)");
    }
};