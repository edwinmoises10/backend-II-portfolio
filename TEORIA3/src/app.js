
import express from 'express'
import 'dotenv/config'
import { viewsMotor } from './service/handlebars.service.js'
import routerMotor from './routes/routes.js'
import path from "path";
import { connectMongo } from './database/db.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'


const app = express()
const PORT = process.env.PORT || 3012


viewsMotor(app)
app.use('/public', express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.json())

//!MongoSession
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO,
        ttl: 14 * 24 * 60 * 60
    }),
    secret: 'P3LIGR0',
    resave: false,
    saveUninitialized: false
}))

//*Routes
app.use('/', routerMotor)





app.listen(PORT, () => {
    console.log(`SERVER CONNECTED AT ${PORT}`);
})

connectMongo().then(() => console.log("Conexion Exitosa a Mongo DB")).catch((e) => console.log(`Error al Conectar a Mongo DB ${e.message}`))