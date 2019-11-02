var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/testcall', require('./routes/testcall'))
app.use('/api/v1/ban_list_dates', require('./routes/ban_lists'))


// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404))
})


// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.send()

})


app.listen(9999)
module.exports = app
