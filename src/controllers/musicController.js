const Music = require('../models/Music')
const Disk = require('../models/Disk')


module.exports = {
    async list(req, res) {
        try {
            const musics = await Music.find() 

            return res.json(musics)

        } catch (err) {

            return res.status().json({Error: err})
        }
    },

    async musicsForDisk(req, res) {
        try {
            const { id } = req.params
        
            const musics = await Music.find({disk_id:id})

            return res.json(musics)

        } catch (err) {

            return res.status().json({Error: err})
        }
    },
    
    async store(req, res) {
        try {
            const {id} = req.params

            const disk_id = await Disk.findById(id)

            const { originalname:name, blobPath, url} = req.file

            const music = await Music.create({
                name,
                blobPath,
                url,
                disk_id
            })

            await Disk.findByIdAndUpdate(disk_id, 
            {
                $push: {
                    musics: music
                }
                
            }, {useFindAndModify: false})

            return res.json(music)

        } catch (err) {

            return res.status().json({Error: err})
        }
    },

    async destroy(req, res) {
        const { id } = req.params 

        await Music.findByIdAndDelete(id, {useFindAndModify: false})

        return res.json({message:"Musicm removida"})
    },
}