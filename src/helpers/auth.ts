import bcrypt from "bcrypt"
import crypto from "crypto"

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const authentication = (password: string, expectedPassword: string) => bcrypt.compare(password, expectedPassword)

export const hashWithSha256 = (token: string) => crypto.createHash('sha256').update(token).digest('hex');
export const generateRandomBytes = () => crypto.randomBytes(20).toString('hex');

export const generateResetToken = () => hashWithSha256(generateRandomBytes());
