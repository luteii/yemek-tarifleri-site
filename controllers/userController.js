const path = require('path');
const User = require('../models/userModel');

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
};

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("Lütfen tüm alanları doldurun.");
    }
    User.save({ username, password });
    res.send(`Kullanıcı ${username} başarıyla kaydedildi! data/users.json dosyasını kontrol edin.`);
};


exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};