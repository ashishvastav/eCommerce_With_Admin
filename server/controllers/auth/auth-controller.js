

//bcrypt
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// register
const User = require('../../models/User');

const registerUser = async (req, res) => {
    const { email, password, UserName } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // user = await User.findOne({ UserName });
        // if (user) {
        //     return res.status(400).json({ success: true, message: 'UserName already exists' });
        // }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        user = new User({
            email,
            password: hashedPassword,
            UserName
        });

        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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