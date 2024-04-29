import express from "express";
export const authorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req.session as any).role === "admin") {
        return next();
    }
    if ((req.session as any).userId !== req.params.userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    next();
}