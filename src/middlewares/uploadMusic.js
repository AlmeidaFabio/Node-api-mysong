const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const multerAzure = require('multer-azure')

const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'musics'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    }),

    azure: multerAzure({
        connectionString: process.env.ContainerConnectionString, 
        account: process.env.StorageAccountName,
        key: process.env.StorageKey,
        container: process.env.BlobContainer 
    }),
   
    s3: multerS3({
        s3: new aws.S3(),
        bucket: '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        }
    })
}


module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'musics'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "audio/mpeg",
            "audio/aac",
            "audio/ogg",
            "audio/mp3",
        ]

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("invalid file type."))
        }
    }
}