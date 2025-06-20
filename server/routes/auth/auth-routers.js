const express = require('express');



const router = require('express').Router();
const { registerUser, loginUser, logout, authMiddleware } = require('../../controllers/auth/auth-controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout); // Uncomment if you implement logout functionality   
// router.get('/profile', authenticate, getUserProfile); // Uncomment if you implement user profile retrieval
// router.put('/profile', authenticate, updateUserProfile); // Uncomment if you implement user profile update
// router.delete('/profile', authenticate, deleteUserProfile); // Uncomment if you implement user profile deletion  
router.use(authMiddleware); // Apply auth middleware to all routes below this line
module.exports = router;
 