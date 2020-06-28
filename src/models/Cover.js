const mongoose = require('mongoose')

const coverSchema = new mongoose.Schema({
    name:String,
    blobPath:String,
    url:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    disk_id: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Disk',
        index:true 
    }
})


module.exports = mongoose.model('Cover', coverSchema)