const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const recipesRoutes = require('./routes/recipes');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const cron = require('node-cron');
const sendEmail = require('./helpers/sendEmail');

const app = express();
app.use(express.static('public'));
const mongoUrl = "mongodb+srv://unrivaledking:test1234@mern-cluster.ws65mut.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster";
mongoose.connect(mongoUrl).then(() => {
    console.log('conenct to db');
    app.listen(process.env.PORT, () => {
        console.log('app is running on localhost:' + process.env.PORT);
        // cron.schedule('*/4 * * * * *', () => {
        //   console.log('running a task every 4 seconds');
        // });
    });
});

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.json({ hello: 'world' });
});

app.get('/send-email', async (req, res) => {
    try {
        await sendEmail({
            view: 'test',
            data: { name: 'kyawkyaw' },
            from: 'kl6022448@gmail.com',
            to: 'kyawkyaw@gmail.com',
            subject: 'Hello kyawkyaw'
        });
        return res.send('email already sent');
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
});

app.use('/api/recipes', AuthMiddleware, recipesRoutes);
app.use('/api/users', usersRoutes);
