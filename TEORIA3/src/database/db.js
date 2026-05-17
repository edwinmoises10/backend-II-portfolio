import { connect } from "mongoose";
import 'dotenv/config'

export const connectMongo = async () => {
    const URL = process.env.MONGO
    if (!URL) {
        console.log('Conexion no establecida');
    }
    try {
        console.log('Iniciando proceso');
        await connect(URL)

        console.log(`Mongo Atlas conectado a Backend - Port: ${process.env.PORT}`)

    } catch (e) {
        console.error('Error al conectar a Mongo', e.message)
    }
}
