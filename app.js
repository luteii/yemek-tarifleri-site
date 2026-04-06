const express = require('express');
const path = require('path'); // Yol modülünü ekledik
const userRoutes = require('./routes/userRoutes');
const app = express();

// 1. Form verilerini (body) okuyabilmek için
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. EN ÖNEMLİ DÜZELTME: Statik dosyaları tam yol (absolute path) ile bağlayalım
// Bu satır sayesinde 'public' klasörü nerede olursa olsun Express onu bulur.
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rotalar
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu aktif: http://localhost:${PORT}/login`);
});