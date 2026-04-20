//IMPORT
import express from "express"

//express sesion
import session from 'express-session'

import 'dotenv/config'
import handlebars from "express-handlebars";
import { v4 as uuidv4 } from "uuid";
import path from "path";
//COOKIE-PARSER
import cookieParser, { signedCookie } from "cookie-parser"
//VIEW - ROUTERS
import viewRouter from "./routes/view.routers.js";
import { auth } from "./middleware/global.middleware.js";


// GLOBAL PARAMS
const app = express()



const PORT: number = Number(process.env.PORT || 3004)



//CHECKPORT
if (!PORT) {
    throw new Error(`PORT:${PORT} not found in .env`)
}

app.use(express.json())

//PATH
app.use('/public', express.static(path.join(process.cwd(), 'src', 'public')));
//!SESSION
app.use(session({
    name: 'session_noc_ai',
    secret: 'S3CR3T0',
    resave: false,
    saveUninitialized: false
}))
//?HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");
//Endpoint - Uso Views
app.use("/", viewRouter)

//Incorporar configuracion en Cookie Parser
app.use(cookieParser('K0D1G0S3CR3T0'))


//PARSER
//ENDPOINT - SETCOOKIE

// app.get('/setCookie', (req, res) => {
//     res.cookie('Coderhouse', 'Curso de backend II', { maxAge: 100000, signed: true }).status(200).json({
//         message: 'Cookie creada'
//     })
// })


// //ENDPOINT - GETCOOKIE unsignedCookie
// app.get('/getCookie', (req, res) => {
//     res.status(200).json({
//         Cookies: req.cookies, // unsigned
//         Cookie_Signed: req.signedCookies
//     })
// })

// //ENDPOINT - DELETECOOKIE
// app.get('/deleteCookie', (req, res) => {
//     res.clearCookie('Coderhouse').status(200).json({
//         Cookie: 'Se elimino cookie Signed/unsigned'
//     })
// })

//LOGIN SESION 

// app.post('/setcookie', (req, res) => {
//     try {
//         // const UUID = uuidv4()
//         const { email, password } = req.body
//         const user = { email, password }
//         res.cookie('cookie', JSON.stringify(user), { signed: true, maxAge: 20000 })
//         res.status(200).json({
//             Status: 'success',
//             Cookie: 'Cookie Creada'
//         })
//     } catch (e: any) {
//         res.status(400).json({
//             error: e.message
//         })
//     }

// })

// app.get('/readcookie', (req, res) => {
//     try {
//         res.status(200).json({
//             CookieSigned: req.signedCookies.cookie
//         })
//     } catch (e: any) {
//         res.status(500).json({
//             error: e.message
//         })
//     }


// })



//SESSIONS 

//Agregar al modulo de session 

declare module "express-session" {
    interface SessionData {
        count: number; // Aquí definimos que 'count' es un número válido
        email: string;
        password: number;
    }
}

app.get('/session', (req, res) => {
    if (req.session.count) {
        req.session.count++
        res.status(200).send(`Contador de la Sesion: ${req.session.count}`)
    } else {
        req.session.count = 1
        res.send("Bienvenido")
    }
})

app.get('/logout', (req, res) => {

    res.clearCookie('session_noc_ai', { path: '/' });

    req.session.destroy((e) => {
        if (e) {
            return res.status(500).json({
                status: "Error",
                message: 'Problema al Salir'
            })
        }

        // res.clearCookie('connect.sid')
        res.status(200).json({
            status: "ok",
            message: 'Sesión cerrada exitosamente'
        })
    })
})

app.post('/login', auth, (req, res) => {

    // const { email, password } = req.body

    // if (email === ADMIN && password === PASSWORD) {
    //     req.session.email = email
    //     // req.session.password = password
    //     res.status(200).json({
    //         status: "ok",
    //         message: 'User logged'
    //     })
    // } else {
    //     res.status(400).json({
    //         status: 'Error',
    //         message: 'User/Password Not found'
    //     })
    // }

    res.status(200).json({
        status: "ok",
        message: "User Logged (AUTH Middleware) + Backend"
    })

})

// CREATE BACKEND - NODE JS
app.listen(PORT, () => {
    console.log(`Backend connected on Port: ${PORT}`);
})