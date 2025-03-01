const express = require('express');
const cors = require('cors');
// const userRouter = require('./routes/user_route');
const signUpRouter = require("./routes/signup_route");
const announcementRouter = require("./routes/announcement_route");
const maintenanceRouter = require("./routes/maintenance_route");
const complaintRouter = require("./routes/complaint_route");
const connectMongoDB = require('./config/connection');
const PORT = 3000;

const app = express();

//to parse JSON requests
app.use(express.json());  
//for frontend communication
app.use(cors());  

connectMongoDB('mongodb://127.0.0.1:27017/SMS')
.then(() => console.log('MongoDB connection established'));

app.use(express.urlencoded({ extended: false }));

// app.use('/api/users', userRouter);

//User SignUp
app.use("/auth/signup", signUpRouter);

//Announcement Route
app.use('/api/announcements', announcementRouter);

//Maintenance Route
app.use('/api/maintenance', maintenanceRouter);

//Complaint Route
app.use('/api/complaints',complaintRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});