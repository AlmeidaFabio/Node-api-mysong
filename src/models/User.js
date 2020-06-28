const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const slug = require('slug')

mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    slug:String,
    disks: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Disk',
        index:true
    }],
    password: {
        type: String,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField:'email', passwordField: 'password'})

userSchema.pre('save', async function(next){
    if(this.isModified('name')){
        this.slug = slug(this.name, {lower:true})

        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')

        const userWithSlug = await this.constructor.find({slug:slugRegex})

        if(userWithSlug.length > 0){
            this.slug = `${this.slug}-${userWithSlug.length + 1}`
        }
    }    
    next()
})


module.exports = mongoose.model('User', userSchema)