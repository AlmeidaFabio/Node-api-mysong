const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res) {
        
        try {
            const user = await User.findOne({email:req.body.email})
            
            if(user) {
                const match = await bcrypt.compare(req.body.password, user.password) 
                if(match) {
                    return res.json(user)
                } else {
                    return res.json({Message: 'Email e/ou senha não batem!'})
                }
            } 
            
        } catch(err) {
            return res.json({Message: 'Email e/ou senha errados!!' + err})
        }
    },

    async logout(req, res) {
       req.logout()
       
       return res.json({message: "Deslogou!" })
    }
}