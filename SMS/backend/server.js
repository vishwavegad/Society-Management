require("dotenv").config();

const express = require("express");
const cors = require("cors");

// const userRouter = require('./routes/user_route');
const loginRouter = require("./routes/login_route");
const signUpRouter = require("./routes/signup_route");
const announcementRouter = require("./routes/announcement_route");
const maintenanceRouter = require("./routes/maintenance_route");
const complaintRouter = require("./routes/complaint_route");
const visitorRouter = require("./routes/visitorsLog_route");
const amenitiesformRouter = require("./routes/amenitiesform_route");
const contactUsRouter = require("./routes/contactus_route");
const forgotPasswordRouter = require("./routes/forgotPassword_route");

const connectMongoDB = require("./config/connection");
const PORT = process.env.PORT || 3000;

const app = express();

//to parse JSON requests
app.use(express.json());
//for frontend communication
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));

connectMongoDB(process.env.MONGODB_URI).then(() =>
  console.log("MongoDB connection established")
);

app.use(express.urlencoded({ extended: false }));

// app.use('/api/users', userRouter);

//User Login
app.use("/auth/login", loginRouter);

//User SignUp
app.use("/auth/signup", signUpRouter);

//Announcement Route
app.use("/api/announcements", announcementRouter);

//Maintenance Route
app.use("/api/maintenance", maintenanceRouter);

//Complaint Route
app.use("/api/complaints", complaintRouter);

//Visitor Route
app.use("/api/visitorsLog", visitorRouter);

//Amenities Form Route
app.use("/api/amenities/book", amenitiesformRouter);

//Contact Us Route
app.use("/api/contactus", contactUsRouter);

//Forgot Password Route
app.use("/api/forgotpassword", forgotPasswordRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
