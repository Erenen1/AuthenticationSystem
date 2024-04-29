import express from "express";
import { getUserByEmail, createUser, getUserById, updateUserById } from "../models/users"
import { hashPassword, authentication, generateResetToken } from "../helpers/auth";
import { redisClient } from "../../config/redis"
import { sendPasswordResetEmail } from "../helpers/reset_password";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    try {

        const user = await getUserByEmail(email);
        if (!user) {
            return res.sendStatus(400);
        }
        const isMatch = await authentication(password, user.password);
        if (!isMatch) {
            return res.sendStatus(403)
        }
        (req.session as any).role = user.role;
        (req.session as any).userId = user._id.toString();
        (req.session as any).email = user.email;

        return res.status(302).json({ message: "Hesaba başariyla giriş yapildi." })
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;
    try {
        const isExists = await getUserByEmail(email)
        if (isExists) {
            return res.status(201).json({ message: "Bu email adresi kullanılıyor." })
        }
        await createUser({
            name,
            email,
            password: await hashPassword(password),
            role: "user"
        })
        return res.status(201).json({ message: "Hesap başarıyla oluşturuldu." })
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}
export const resetPassword = async (req: express.Request, res: express.Response) => {
    const { password, confirmPassword } = req.body;
    const resetToken = req.params.resetToken;
    if (password !== confirmPassword) {
        return res.status(400).json("Parolalar eşleşmiyor.")
    }
    try {
        const userId = await redisClient.get(resetToken);
        if (!userId) {
            return res.status(400).json("Token is not valid.")
        }
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json("Token is not valid.")
        }
        const hashedPassword = hashPassword(password);

        await updateUserById(userId, {
            password: hashedPassword
        })

        return res.status(200).json("Sifreniz basariyla guncellendi.");
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
export const forgotPassword = async (req: express.Request, res: express.Response) => {
    const { email } = req.body
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json("Bu emaile sahip bir kullanici yok")
        }
        
        const resetToken = await generateResetToken();
        await sendPasswordResetEmail(email, resetToken)

        const tokenExpiration = 60 * 60 * 24 //24 hours
        await redisClient.set(resetToken, user._id.toString(), { "EX": tokenExpiration })

        return res.redirect("/login")
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {

        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
        })
        res.clearCookie("connect.sid", { path: "/" })

        return res.redirect("/login")
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
