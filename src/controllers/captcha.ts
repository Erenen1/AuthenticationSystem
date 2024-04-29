import svgCaptcha from "svg-captcha"
import express from "express"

export const captcha = (req: express.Request, res: express.Response) => {
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 2,
        color: true,
        background: '#cc9966'
    });
    (req.session as any).captcha = captcha.text
    res.type('svg');
    res.status(200).send(captcha.data)
}


export const validateCaptcha = (req: express.Request, res: express.Response) => {
    const captchaData = req.body.captchaData;
    if (captchaData !== (req.session as any).captcha) {
        return res.status(400).json("Basarisiz captcha")
    }
}