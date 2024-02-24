const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/signup',async(req,res)=>{
    res.render("signup");
});

router.post('/signup',async(req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");

});

router.post('/signin',async(req,res)=>{
    try{
    const {email,password} = req.body;

    const token  =  await User.matchPasswordandGenerateToken(email,password);

    console.log(token);

    return res.cookie('token',token).redirect('/');
    }
    catch(error){
        res.render('signin',{
            error : "Incorrect Email or Password!"
        });
    }


});

router.get('/signin',async(req,res)=>{
    return res.render("signin");
});


router.get('/logout',async(req,res)=>{
    res.clearCookie("token").redirect('/');
})


module.exports = router;