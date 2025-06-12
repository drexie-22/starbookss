const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator'); 

// Register 
router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        ); 

        if (user.rows.length > 0) {
            return res.status(401).send('User already exists' );
        }

        const saltRound = 10;   
        const salt = await bcrypt.genSalt(saltRound);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );





        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



// Login
router.post('/login', async (req, res) => {
    try{
        
        const { email, password } = req.body;
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (user.rows.length === 0) {
            return res.status(401).json('Password or email is incorrect');
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json('Password or email is incorrect');
        }
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
    }catch (err) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
