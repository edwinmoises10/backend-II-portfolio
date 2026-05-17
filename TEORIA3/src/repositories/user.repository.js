import { newUser } from "../schemas/loginSession.js"



class UsersPlataform {
    constructor(model) {
        this.model = model
    }

    create = async (body) => {
        try {
            return await this.model.create(body)
        } catch (e) {
            throw new Error('No se creo usuario')
        }
    }

    find = async (body) => {
        try {
            return await this.model.find(body)
        } catch (e) {
            throw new Error('No se encuenta User')
        }
    }

    getData = async (id) => {
        try {
            //*get all data from db ..
            return await this.model.findOne({ _id: id })
        } catch (err) {
            throw new Error('No se adquiere data del User')
        }
    }

    update = async (id, updateBody) => {
        try {
            //!Actualizar
            return await this.model.updateOne(
                { _id: id },
                { $set: updateBody }
            )
        } catch (e) {
            throw new Error('Sin Actualizar')
        }
    }
}
export const db_newUser = new UsersPlataform(newUser)


