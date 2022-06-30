const {Router} = require('express');
const config = require("config");
const shortId = require('shortid')

const Link = require('../models/Link');
const authMiddleware = require("../middleware/auth.middleware")

const router = Router()

router.post('/generate',authMiddleware, async (req,res)=>{
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const existing = await Link.findOne({from})

        if(existing){
            return res.json({link:existing})
        }

        const code = shortId.generate()

        const to = baseUrl + '/t/' + code
        const link = new Link({
            code,to,from, owner:req.user.userId
        })
        await link.save()

        return res.status(201).json({link})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get('/',authMiddleware, async (req,res)=>{
    try {
        const links = await Link.find({owner:req.user.userId})
        res.json(links)
    } catch (error) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова."})
    }
})

router.get('/:id', authMiddleware,async (req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
        const link = await Link.findById(id)
        console.log(link)
        res.json(link)
    } catch (error) {
        res.status(500).json({message:"Что-то пошло не так, попробуйте снова."})
    }
})



module.exports = router;