import express from "express"
export const isAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req.session as any).role === "admin") {
        return next();
    }
    if (!(req.session as any).userId || !(req.session as any).email) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if ((req.session as any).role !== "admin") {
        return res.status(403).json("Forbidden");
    }
    next();
}