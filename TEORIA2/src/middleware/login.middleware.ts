
import type { Request, Response, NextFunction } from "express";
const EMAIL = 'p1@test1.com'
const PASSWORD = '1234'

export const checkuser = (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    if (email === EMAIL && password === PASSWORD) {
        console.log('login successful');
        return next()
    }

    return res.status(401).json({
        status: 'error',
        message: 'incorrect credentials'
    })
}