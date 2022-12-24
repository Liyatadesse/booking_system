const express= require('express');
const router= express.Router();

const authControllers= require('../controllers/auth')

router.post('/register',authControllers.registerUser);

router.post('/login',authControllers.login)
router.post('/forgot',authControllers.forgot)
router.get('/reset/:id/:token',authControllers.reset)
router.post('/reset/:id/:token',authControllers.resetpd)
module.exports = router ;