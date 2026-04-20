import type { Request, Response, NextFunction } from 'express';

const ADMIN: string = 'test1@mail.com'
const PASSWORD: string = "1234"

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    if (email === ADMIN && password === PASSWORD) {
        req.session.email = email
        return next()

    }
    // req.session.password = password
    // res.status(200).json({
    //     status: "ok",
    //     message: 'User logged'
    // })
    // } else {
    //     res.status(400).json({
    //         status: 'Error',
    //         message: 'User/Password Not found'
    //     })
    // }

    return res.status(401).json({
        status: 'Error',
        message: 'User/Password Not found'
    })

}

export const isLogged = (req: Request, res: Response, next: NextFunction) => {

    if (req.session && req.session.email) {
        console.log("Usuario Logeado");
        return next()
    }

    return res.redirect('/login')

    // return res.status(401).json({
    //     status: 'Error',
    //     message: 'Usuario no logeado'
    // })

}