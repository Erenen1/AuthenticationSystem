import express from "express";
import { getUsers, getUserById, updateUserById, deleteUserById } from "../models/users";
import { hashPassword } from "../helpers/auth";
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json();
        console.log(error)
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    try {
        const user = await getUserById(userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(404).json();
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const { name, password } = req.body;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json("Kullanıcı bulunamadı.")
        }
        const hashedPassword = await hashPassword(password);
        await updateUserById(userId, {
            name,
            password: hashedPassword
        });
        res.status(200).json({ message: "Hesap başarıyla güncellendi." })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Hesap güncellemenedi." });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı." })
        }
        await deleteUserById(userId);
        return res.status(200).json({ message: "Kullanıcı başarıyla silindi." })
    } catch (error) {
        return res.status(400).json({ message: "Kullanıcı silinemedi." })
    }
}