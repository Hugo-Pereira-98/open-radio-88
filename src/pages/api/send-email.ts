import type { NextApiRequest, NextApiResponse } from 'next';
const nodemailer = require('nodemailer');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message, token } = req.body;

    const secretKey = '6LeHphwqAAAAAMR7R1hKCWPHRpaTdeIU7c-uHQbE';
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const captchaResponse = await fetch(verifyUrl, {
        method: 'POST',
      });

      const captchaData = await captchaResponse.json();

      if (!captchaData.success) {
        return res.status(400).json({ error: 'Failed to verify reCAPTCHA' });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cortesaguia@gmail.com',
          pass: 'gfsazdtdbwkzhysf',
        },
      });

      const mailOptions = {
        from: 'cortesaguia@gmail.com',
        to: 'hugop868@gmail.com, dev.claitonbarbosa@gmail.com',
        subject: `New message from ${name}: ${subject}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Message: ${message}
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
