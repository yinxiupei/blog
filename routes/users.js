var express = require('express');
var router = express.Router();
var user = require('../controller/user');

router.get('/login', (req, res) => {
    res.render('users/login', { title: '登录', error: '' });
});

router.get('/register', (req, res) => {
    res.render('users/register', { title: '注册', error: '' });
});

router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
