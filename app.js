const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}/register`);
});