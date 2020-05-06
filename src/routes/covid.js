const express = require('express')
const router = new express.Router()
const Covid = require('../models/covid')





// get covid cases
router.get('/covid', async (req, res) => {
    try {
        const covid = await Covid.find({})

        return res.status(200).json({
            success: true,
            count: covid.length,
            data: covid
        })
    } catch (e) {
        res.status(500).json({
            error: "Server error"
        })
    }

})


router.post('/covid', async (req, res) => {
    try {
        //console.log(req.body)
        const covid = await Covid.create(req.body)

        return res.status(200).json({
            success: true,
            data: covid
        })
    } catch (e) {
        console.log(e)
        if (e.code === 11000) {
            return res.status(400).json({
                error: "This data already exists"
            })
        }
        res.status(500).json({
            error: "Server error"
        })
    }

})





module.exports = router