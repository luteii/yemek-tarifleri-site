const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kayıt olma (Register) rotaları
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);

// Giriş yapma (Login) rotası - İŞTE EKSİK OLAN SİHİRLİ SATIR BURASI!
router.get('/login', userController.getLoginPage);

module.exports = router;
// Giriş yapma butonuna basıldığında çalışacak rota
router.post('/login', userController.loginUser);