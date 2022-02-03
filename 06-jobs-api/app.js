require('dotenv').config();
require('express-async-errors');
// var bodyParser = require('body-parser')
const express = require('express');
const connectDB = require('./db/connect')
const app = express();
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


//conect database
// app.use(bodyParser.urlencoded({ extended: false }))

// extra security packages
const helmet = require('helmet');
const cors = require('cors')
// const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')




// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//check register token
const authUser = require('./middleware/authentication');


// extra packages
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100 //limit each IP to 100 request per windowMs
}))

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
