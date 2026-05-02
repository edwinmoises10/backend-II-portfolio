
//!Backend
import express from 'express'
import { handlebarsExtension } from './services/handlebars.service'
import routes_views from './routes/views.route'
import path from "path";
import { checkuser } from './middleware/login.middleware';
import FileStore from 'session-file-store'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import 'dotenv/config'
import MongoStore from 'connect-mongo'

//!Varibles 
const PORT = 3010
const app = express()

//!Path
app.use('/public', express.static(path.join(process.cwd(), 'src', 'public')));

//!JSON (Para que lea el Backend)
app.use(express.json())

//!Export Handlebars
handlebarsExtension(app)

//!File Storage
//╰─ npm install --save-dev typescript tsx @types/node @types/express @types/cookie-parser @types/express-s
const fileStorage = FileStore(session)

//!Cookie Parser
app.use(cookieParser())

//!Session
app.use(session({
    // store: new fileStorage({
    //     path: './session',
    //     ttl: 60,
    //     retries: 0
    // }),
    store: MongoStore.create({
        mongoUrl: process.env.MONGO
    }),
    secret: 'P3LIGR0',
    resave: false,
    saveUninitialized: false
}))


//!Routes
app.use('/', routes_views)

app.post('/login', checkuser, (req, res) => {
    res.status(200).json({
        message: 'Data saved',
        Status: 'ok'
    })
})

app.listen(PORT, () => {
    console.log(`Backend running on Port ${PORT}`);
})