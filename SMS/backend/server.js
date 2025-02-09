const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const connectMongoDB = require('./config/connection');
const PORT = 3000;

const app = express();

app.use(cors());

connectMongoDB('mongodb://127.0.0.1:27017/demo')
.then(() => console.log('MongoDB connection established'));

app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);

// app.get('/', (req, res) => {
//     res.send('Hello, Society Management System!');
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});