const {Router} = require("express");
const bcrypt = require("bcrypt");
const {check,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User")

const router = Router()

router.post('/register',
[
    check('email','Некорректный email').isEmail(),
    check('password','Минимальная длина пароля 6 символов.').isLength({min:6})
],
async(req,res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"Некорректные данные при регистрации"
            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message:"Такой пользователь уже существует."})
        }

        const hashedPassword = await bcrypt.hash(password,7);
        const user = new User({email,password:hashedPassword})

        await user.save()

        return res.status(200).json({message:"Пользоватль создан."})

    } catch (e){
        return res.status(500).json({message:"что-то пошло не так, попробуйте снова."})
    }
});

router.post('/login',
[
    check('email','Некорректный email').isEmail(),
    check('password','введите пароль').exists()
],
async(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:"Некорректные данные при регистрации"
        })
    }

    const {email,password} = req.body

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json('Пользователь не найден.')
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:"Введен неверный пароль, попробуйте снова."})
    }
    const token = jwt.sign({
        userId:user._id},
        config.get('jwtSecret'), 
        {expiresIn:'1h'}
    );

    return res.json({token,userId:user._id})
});


router.get("/",(req,res)=>{
    res.send("hi")
})

module.exports = router;