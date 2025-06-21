//bcrypt
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;
// register
const User = require('../../models/User');

const registerUser = async (req, res) => {
    const { email, password, UserName } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already exists,Please try with different email' });
        }
        // Create a new user (password will be hashed by the model hook)
        user = await User.create({
            email,
            password,
            UserName
        });

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: '1h'
        });

        res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// login

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use Sequelize syntax
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist,Please Register first" });
        }

        // Use instance method for password comparison if defined, else use bcrypt
        let isMatch = false;
        if (typeof user.comparePassword === 'function') {
            isMatch = await user.comparePassword(password);
        } else {
            isMatch = await bcrypt.compare(password, user.password);
        }
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Use user.id for Sequelize
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, secret, {
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
        }).json({ success: true, message: 'Login successful', checkUser: {
            email: user.email,
            role: user.role,
            id: user.id
        }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Login Failed, Server error 500' });
    }
};

//logout
const logout = (req, res) => {  
    // Invalidate the token on the client side
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// get user profile
const getUserProfile = async (req, res) => {    
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User profile retrieved successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
// update user profile
const updateUserProfile = async (req, res) => {
    const { email, UserName } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user details
        user.email = email || user.email;
        user.UserName = UserName || user.UserName;

        await user.save();

        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }

};
// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
// export all functions
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    authMiddleware
};