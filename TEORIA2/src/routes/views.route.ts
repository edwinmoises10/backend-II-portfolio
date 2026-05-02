
import { Router } from "express";

const routes_views = Router()

//?Views 

routes_views.get('/', (req, res) => {
    res.render('login', { title: 'Login' })
})

export default routes_views