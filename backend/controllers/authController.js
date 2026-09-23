const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {   
    const { name, surname, address, email, phone, password } = req.body;
        console.log("REGISTER BODY", req.body);
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Benutzer mit dieser E-Mail existiert bereits' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedEmail = String(email).trim().toLowerCase();
    const role = normalizedEmail === process.env.ADMIN_EMAIL.trim().toLowerCase() ? 'admin' : 'user';

    const newUser = new User({
        name,
        surname,
        address,
        email,
        phone,
        password: hashedPassword,
        role
    });

    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
        message: 'Benutzer erfolgreich registriert',
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            surname: newUser.surname,
            address: newUser.address,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
        }
    });
    } catch (error) {
        console.error('Registrierungsfehler:', error);

        res.status(500).json({message: 'Fehler bei der Registrierung .'});
    }
    };



    const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Bitte E-Mail und Passwort angeben' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
        return res.status(400).json({ message: 'Ungültige E-Mail oder Passwort' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);      
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Ungültige E-Mail oder Passwort' });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
        message: 'Erfolgreich eingeloggt',
        token,
        user: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            address: user.address,
            email: user.email,
            phone: user.phone,
            role: user.role,
        }
    });
    } catch (error) {
        console.error('Login-Fehler:', error);
        res.status(500).json({ message: 'Fehler beim Einloggen.' });
    }
};



    module.exports = {registerUser, loginUser};

