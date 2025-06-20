const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');  
const cors = require('cors');
const authRouters = require('./routes/auth/auth-routers'); // Adjust the path as necessary

dotenv.config();
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
const app = express();
const PORT = process.env.PORT || 5001;
const path = require('path');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Requested-With',
    'Accept',   
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Content-Length',
    'X-CSRF-Token',
    'X-Requested-With',
    'Content-Length',
    'Cache-Control',
    'Pragma',
    'Expires',
    'X-Frame-Options',
],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cookieParser());
// Use the auth routes
app.use('/api/auth', authRouters);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);


// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });