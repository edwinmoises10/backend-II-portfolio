



import { Schema, model } from 'mongoose'
/// NEW USER 

const newUserSchema = Schema({
    firstname: { type: String, required: [true, 'firstname required'] },
    lastname: { type: String, required: [true, 'secondname required'] },
    email: { type: String, required: [true, 'username required'] },
    city: { type: String, required: [true, 'city required'] },
    stateValue: { type: String, required: [true, 'state required'] },
    zipCode: { type: String, required: [true, 'zipCode required'] },
    password: { type: String, required: [true, 'zipCode required'] },


})

export const newUser = model('newUser', newUserSchema)
