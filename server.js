//Install express server
const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '../App/views'));
app.set('view engine', 'jade');
app.set('view cache', false);

require('./routes/index')(app);

// error handler

app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error');

});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);