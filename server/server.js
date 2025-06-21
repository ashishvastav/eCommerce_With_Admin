const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');

// cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');  
const cors = require('cors');
const authRouters = require('./routes/auth/auth-routers'); // Adjust the path as necessary
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

dotenv.config();
const bodyParser = require('body-parser');

// mysql 
// connect to mysql server  
const sequelize = require('./db');
const mysql = require("mysql2/promise");

(async () => {
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "ecommerce_admin_panel"
})
  .then((connection) => {
    console.log('Connected to MySQL database');
    return connection;
  })
  .catch((err) => {
    console.error('MySQL connection error:', err);
  });
})();
const User = require('./models/User');
// MySQL configuration  

// const MYSQL_CONFIG = {
//   host: "localhost",
//   user: "root",
//   password: "Password@123",
//   database: "ecommerce_admin_panel",
// };


// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
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
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cookieParser());
// Use the auth routes
app.use('/api/auth', authRouters);

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .catch(err => console.error('❌ MySQL connection error:', err));

// Sync models
sequelize.sync({ alter: true }) // use { force: true } to drop & recreate
  .then(() => console.log('✅ Models synced'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
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