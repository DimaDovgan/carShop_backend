//const createError = require("./helpers");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// // const fileUpload=require('express-fileupload');


const indexRouter = require('./routes/api/leson');
const usersRouter = require('./routes/api/auth');
const carRouter = require('./routes/api/car');
 

const app = express();

// // // view engine setup

// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');

app.use(cors({
  origin: '*'
}));
// app.use(cors());
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   next();
// })
 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/leson', indexRouter);
app.use('/api/auth', usersRouter);
app.use('/api/car', carRouter);

// app.get('/test', (req, res) => {
//   res.send('Hello World!')
// })

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   //res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
//   res.json(err.message);
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({message})
})

module.exports = app;







// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   console.log("OKK")
//   res.send('Hello World!')
// })
// app.get('/test', (req, res) => {
//   console.log("OKK TEST")
//   res.send('Hello World! TEST')
// })

// //catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   console.log("error")
//   res.locals.message = err.message;
//   res.status(err.status || 500);
//   res.json(err.message);
// });

// module.exports = app;