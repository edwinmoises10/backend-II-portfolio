
import { Router } from "express";
import { db_newUser } from '../repositories/user.repository.js'
const routerMotor = Router()

//!View
routerMotor.get('/', (req, res) => {
    res.render('login', { title: 'Login' })
})


routerMotor.get('/create-user', (req, res) => {
    try {
        res.render('newUser')
    } catch (e) {
        res.status(400).json({ status: e.message })
    }
})

routerMotor.get('/personal-content', (req, res) => {
    try {
        res.render('main_personal')
    } catch (e) {
        res.status(401).json({ status: 'error ' })
    }
})

routerMotor.get('/edit_document', (req, res) => {
    try {
        res.render('editDocument')
    } catch (e) {
        res.status(401).json({
            status: 'ok'
        })
    }
})


//!datos recibidos desde el front    
// * const response = fetch('http://localhost:3000/data/create-user', {

routerMotor.post('/api/create-user', async (req, res) => {
    const { firstname, lastname, email, city, stateValue, zipCode, password } = req.body

    const payload = {
        firstname,
        lastname,
        email,
        city,
        stateValue,
        zipCode,
        password
    }
    if (!firstname || !lastname || !email || !city || !stateValue || !zipCode || !password) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios.' });
    }

    try {
        const data = await db_newUser.create(payload)
        if (data) {
            res.status(201).json({ status: 'ok' })
        }
    } catch (error) {
        res.status(400).json({ status: error.message })
    }
})

routerMotor.post('/api/login', async (req, res) => {

    const { email, password } = req.body


    try {

        const response = await db_newUser.find({ email, password })
        if (response.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Credenciales Incorrectas Estimado', })
        }
        req.session.user = {
            id: response[0]._id,
            email: response[0].email,
            firstname: response[0].firstname
        };
        return res.status(200).json({ status: 'ok', message: 'Bienvenido' })
    } catch (e) {
        res.status(400).json({ status: error.message })
    }
})


routerMotor.get('/api/getData', async (req, res) => {

    //!1
    try {


        if (!req.session.user) {
            return res.status(401).json({ status: 'error', message: 'No has iniciado sesión' });
        }

        const connectedId = req.session.user.id;
        const data = await db_newUser.getData(connectedId)

        if (!data) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        console.log('Se recibio datos desde Mongo');

        return res.status(200).json({
            status: 'ok',
            payload: data
        })
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message })
    }

})

routerMotor.post('/api/edituser', async (req, res) => {
    try {
        const { firstname, lastname, email, city, stateValue, zipCode, password } = req.body

        const payload = {
            firstname,
            lastname,
            email,
            city,
            stateValue,
            zipCode,
            password
        }
        if (!firstname || !lastname || !email || !city || !stateValue || !zipCode || !password) {
            return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios.' });
        }

        if (!req.session.user) {
            return res.status(401).json({ status: 'error', message: 'No has iniciado sesión' });
        }


        const connectedId = req.session.user.id;

        const data = await db_newUser.update(connectedId, payload)
        console.log(`Data Actualizado: ${data}`);
        res.status(200).json({ status: 'ok' })
    } catch (e) {
        return res.status(400).json({ status: 'error' })
    }
})

routerMotor.post('/api/logout', (req, res) => {
    if (!req.session) {
        return res.status(400).json({ status: 'error', message: 'No hay sesión activa' });
    }

    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión en MongoDB:', err);
            return res.status(500).json({ status: 'error', message: 'Fallo al cerrar la sesión en el servidor' });
        }
        
        res.clearCookie('connect.sid');
        console.log('Sesión destruida y cookie eliminada con éxito.');
        
        return res.status(200).json({ status: 'ok', message: 'Sesión cerrada correctamente' });
    });
});

export default routerMotor