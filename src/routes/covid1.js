const express = require('express')
const router = new express.Router()
const Covid1 = require('../models/covid1')






// get covid cases
router.get('/covid1', async (req, res) => {
    try {
        const covid1 = await Covid1.find({})

        return res.status(200).json({
            success: true,
            count: covid1.length,
            data: covid1
        })
    } catch (e) {
        res.status(500).json({
            error: "Server error"
        })
    }

})

router.post('/covid1', async (req, res) => {
    try {
        //console.log(req.body)
        const covid1 = await Covid1.create(req.body)

        return res.status(200).json({
            success: true,
            data: covid1
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