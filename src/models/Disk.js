const mongoose = require('mongoose')
const slug = require('slug')

const diskSchema = new mongoose.Schema({
   artist:{
       type:String,
       required:true
   },
   cover: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cover',
        index:true,
    },
    slug:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        index:true
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Music',
        index:true
    } ]
})

diskSchema.pre('save', async function(next){
    if(this.isModified('artist')){
        this.slug = slug(this.artist, {lower:true})

        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')

        const discosWithSlug = await this.constructor.find({slug:slugRegex})

        if(discosWithSlug.length > 0){
            this.slug = `${this.slug}-${discosWithSlug.length + 1}`
        }
    }    
    next()
})

module.exports = mongoose.model('Disk', diskSchema)