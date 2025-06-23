require('dotenv').config();
const express = require('express');
const app = express();
require('../DB_connection/DB_connection');
const cors = require('cors');
const session = require('express-session');
const router = require('../routes/AuthRoutes');
const path = require("path");
const files = require("../routes/UpLoadFiles");
const getpost = require("../routes/PostRoutes");
const DeleteRoute = require("../routes/DeletePost");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Serve static files
app.use('/ProfileImage', express.static(path.join(__dirname, '../ProfileImage')));

// Enable CORS for both local and AWS frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://blogplatform-frontend.s3-website.eu-north-1.amazonaws.com'
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// Configure session for login tracking
// app.use(session({
//   secret: "hcuiasgdcv12h321g2e91",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     sameSite: 'none',
//     httpOnly: true,
//     secure: true, // keep false for now (unless you're using HTTPS)
//   },
// }));

// Parse incoming requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// All routes
app.use('/auth', router);
app.use('/upload', files);
app.use('/posts', getpost);
app.use('/delete', DeleteRoute);

// Test route
app.get('/', (req, res) => {
  res.send("helllo world");
});

// Start server
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Listening on port", process.env.PORT);
});