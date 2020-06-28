const Cover = require('../models/Cover')
const Disk = require('../models/Disk')

module.exports = {
    
    async store(req, res) {

        const {id} = req.params

        const disk_id = await Disk.findById(id)

        const { originalname:name, blobPath, url} = req.file

        const cover = await Cover.create({
            name,
            blobPath,
            url,
            disk_id
        })

        await Disk.findByIdAndUpdate(disk_id, 
        {
            cover:cover
            
        }, {useFindAndModify: false})

        return res.json(cover)
    },

    async destroy(req, res) {
        const { id } = req.params 

        await Cover.findByIdAndDelete(id, {useFindAndModify: false})

        return res.json({message:"Coverm removida"})
    }
}