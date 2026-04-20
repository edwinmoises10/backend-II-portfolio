
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'


const app = express()
const PORT = process.env?.PORT



app.listen(PORT, () => {
    console.log(`Server Connected on Port${PORT}`);
})
