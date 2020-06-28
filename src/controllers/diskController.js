const Disk = require('../models/Disk')
const User = require('../models/User')

module.exports = {

    async list(req, res) {
        const disks = await Disk.find().populate('musics').populate('cover')

        return res.json(disks)
    },

    async store(req, res) {
      try {
        const { artist } = req.body 

        const author = req.headers.authorization 

        const disk = await Disk.create({
            artist,
            author
        })

        await User.findByIdAndUpdate(author, {
            $push: {
                disks: disk
            }
        }, {useFindAndModify: false})

        return res.json(disk)

      } catch (err) {
        return res.json(err)
      }

    },

    async show(req, res) {
        try {
            const { id } = req.params
        
            const disks = await Disk.find({author:id}).populate('cover')

            return res.json(disks)

        } catch (err) {

            return res.status().json({Error: err})
        }
    },

    async update(req, res) {
        const {id} = req.params 

        const data = req.body

        const disk = await Disk.findByIdAndUpdate(id, data, {new: true, useFindAndModify: false})

        return res.json(disk)
    },

    async destroy(req, res) {
        const {id} = req.params 

        await Disk.findByIdAndDelete(id)

        return res.json({message: "Disco removido"})
    }
}