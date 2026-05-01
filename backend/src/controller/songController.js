
const id3 = require('node-id3')
const storageServices = require('../services/storageServices');
const songModel = require('../models/songModel');

async function uploadController(req, res) {

    const songBuffer = req.file.buffer

    const { mood } = req.body;

    const tags = id3.read(songBuffer)

    // const songFile = await storageServices.uploadFile({
    //     buffer : songBuffer,
    //     filename : tags.title + ".mp3",
    //     folder : '/moodify/songs'
    // })

    // const posterFile = await storageServices.uploadFile({
    //     buffer : tags.image.imageBuffer,
    //     filename : tags.filename + '.jpeg',
    //     folder : '/moodify/posters'
    // })

     const [songFile, posterFile] = await Promise.all([


        storageServices.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: '/moodify/songs'
        }),

        storageServices.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.filename + '.jpeg',
            folder: '/moodify/posters'
        })


    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

   

    res.status(201).json({
        message: "song create sucessfully",
        song
    })
}

async function getSong(req,res){

    const {mood} = req.query

    const song =  await songModel.findOne({
        mood
    })


    res.status(200).json({
        message : "song fetched sucessfully.",
        song
    })
}

module.exports = {
    uploadController,
    getSong
}