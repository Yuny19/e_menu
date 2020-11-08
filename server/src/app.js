const express = require('express');
const ENV = require('dotenv');
const mongoose = require('mongoose');

ENV.config();

const app = express();
const cors = require('cors');
const port = process.env.PORT;

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const userRouter = require('./routers/user.router');
const menuRouter = require('./routers/menu.router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/menu', menuRouter);


app.get('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

app.listen(port, () => {
    console.log(`server run in here ${port}`)
})