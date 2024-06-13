const {PORT} = require('./config/config')

const express = require('express')
const app = express();
const userRouter = require('./routes/userRoutes')

app.set('view engine','ejs')
app.set('views')

app.use('/',userRouter);

app.get('/admin',(req,res) => {
    res.send('Hello world')
})


app.listen(2000,() => {
    console.log(`ShoeShope is listening at http://localhost:${PORT}`)
})