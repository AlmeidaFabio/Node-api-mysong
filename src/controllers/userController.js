const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10 

module.exports = {

    async list(req, res) {
        const users = await User.find().populate('disks')

        return res.json(users)
    },

    async store(req, res) {
        try {

            const { name, email, password } = req.body 

            const salt = bcrypt.genSaltSync(saltRounds) 
            const hash = bcrypt.hashSync(password, salt)

            const user = await User.create({
                name,
                email,
                password: hash
            })

            await user.save()
    
            return res.json(user)

        } catch (err) {
            return res.json({Erro: "Erro ao cadastrar."})
        }
    },

    async show(req, res) {
        const { id } =req.params

        const data = req.body

        const user = await User.findById(id, data).populate('disks')

        if( !user ) {
            return res.json({message: "Usuário não encontrado!"})
        }

        return res.json(user)
    },

    async update(req, res) {
        const {id} = req.params 

        const data = req.body

        const user = await User.findByIdAndUpdate(id, data, {new: true, useFindAndModify: false})

        return res.json(user)
    },

    async destroy(req, res) {
        const {id} = req.params 

        await User.findByIdAndDelete(id)

        return res.json({message: "Usuário removido"})
    }
}