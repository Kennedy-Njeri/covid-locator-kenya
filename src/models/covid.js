const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')



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



CovidSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    // dont save address
    this.address = undefined
    next()

    console.log(loc)
})

const Covid = mongoose.model('Covid', CovidSchema)

module.exports = Covid