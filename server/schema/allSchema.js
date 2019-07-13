var mongoose = require('mongoose')
var signupSchema = new mongoose.Schema({
    name: String,

    email: {
        type: String,
        unique: true
    },
    password: String,
    singupDate: String
});

var POSTAD = new mongoose.Schema({
    addTitle: String,
    catagory: String,
    model: String,
    condition: String,
    price: String,
    destination: String,
    imageList: [String],
    name: String,
    phone: String,
    city: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'createAccounts'
    },
    postDate: String,
})
const MessageSchema = new mongoose.Schema({

    userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscriptionTable'
    },
    postID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postadTable'
    },
    contact: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
})

const FavoriteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "postadTable",
    }
})
const notificationSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
    }
    ,
    subscription: {
        type: String
    }
})
module.exports = {
    signupSchema,
    POSTAD,
    MessageSchema,
    FavoriteSchema,
    notificationSchema
};