import 'dotenv/config'
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT 

if (!PORT) throw new Error("Port not exist")

//!Middleware a nivel de aplicacion
app.use(cookieParser(process.env.SECRET_KEY))

app.get("/set-cookie", (req, res) => {
    //!Setear Cookie
    // const user = req.cookies.user
    //! res.cookie(name, value) 
    const { idioma } = req.query
    res.cookie('idioma', idioma).json({ msg: 'Idioma guardado en la cookie' })
    // res.cookie('user', 'juan', { httpOnly: true, maxAge: 3600000 }
})

app.get('/cookies', (req, res) => {
    console.log(req.cookies);
    const { idioma } = req.cookies
    console.log(`Cookie 'idioma' recibida: [${idioma}]`);

    idioma && idioma.trim() === "ingles" ? res.status(200).json({ msm: "Language English" }) : res.status(200).json({ msm: "Idioma Español;" })
})

app.delete('/clearCookie', (req, res) => {
    if (req.cookies.idioma) {
        res.clearCookie('idioma')
        console.log("Cookie Deleted");
        return res.status(200).json({ msg: "Cookie Deleted" })
    }

    res.status(404).json({ msg: "No se encontró la cookie para eliminar" });

})


app.listen(PORT, () => {
    console.log(`Conectado a al Port ${PORT}`);
})

