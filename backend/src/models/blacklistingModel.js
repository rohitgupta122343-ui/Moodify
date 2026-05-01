
const mongoose = require('mongoose')

const blacklistSchema =  mongoose.Schema({
    token : {
        type : String,
        require : [true,'token is require'],
        unique : [true]
    }
    
},{
     timestamps: true
})



const blacklistModel = mongoose.model('blacklist',blacklistSchema)

module.exports = blacklistModel