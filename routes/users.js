const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const auth = require('../middleware/auth');
const { User, validate } = require('../model/user');

router.get('/', async (req, res) => {
    const users = await User.find();

    if (!users) return res.status(400).send('کاربری وجود ندارد');

    res.status(200).send(users);
});


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(405).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
