const mongoose = require('mongoose')



const CovidSchema = new mongoose.Schema({
    countyCode: {
        type: String,
        required: [true, "Please add a county code"],
        unique: true,
        trim: true,
        maxlength: [10, "County code must be less than 10 characters"]
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    // https://mongoosejs.com/docs/geojson.html
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Covid = mongoose.model('Covid', CovidSchema)

module.exports = Covid