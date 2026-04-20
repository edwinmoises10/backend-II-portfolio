import { Router } from "express"
import { isLogged } from "../middleware/global.middleware.js"

const viewRouter = Router()


viewRouter.get("/", (req, res) => {
    res.render('loginSession', { title: 'Login' })
})

viewRouter.get("/principal", isLogged, (req, res) => {
    res.render('principal', { title: 'PaginaPrincipal', usuario: req.session.email })
})

export default viewRouter

