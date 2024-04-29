import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail', // Kullandığınız e-posta servisine göre değiştirin
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendPasswordResetEmail = async (userEmail: string, resetToken: string) => {

    const resetUrl = `http://localhost.com/reset-password/${resetToken}`;

    const message = {
        from: 'support@yourdomain.com',
        to: userEmail,
        subject: 'Şifre Sıfırlama Talebi',
        text: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın: ${resetUrl}`
    };

    await transporter.sendMail(message);
}
