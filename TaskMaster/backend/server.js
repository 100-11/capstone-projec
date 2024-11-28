// // const express = require('express');
// // const dotenv = require('dotenv');

// // // Load environment variables
// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // app.get('/', (req, res) => {
// //     res.send('TaskMaster API is running...');
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });

// const express = require('express');
// const authController = require('./controllers/authController');
// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());

// // User registration route
// app.post('/api/auth/register', authController.registerUser);

// // User login route
// app.post('/api/auth/login', authController.loginUser);

// // Example protected route
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'Access granted.' });
// });

// // Middleware to authenticate token
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.sendStatus(401);  // Unauthorized
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);  // Forbidden
//     req.user = user;
//     next();
//   });
// }

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Sample route to test if server is working
app.get('/', (req, res) => {
  res.send('TaskMaster API is running...');
});

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/taskmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

