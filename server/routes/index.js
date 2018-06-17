var express = require('express');
var router = express.Router();
var database = require('../models/databasefunctions');
const { Client } = require('pg');
var path = require('path');
var http = require('http');

module.exports = function(app){

	app.all('/*', function(req, res, next) {

		var responseSettings = {

			"AccessControlAllowOrigin": req.headers.origin,
			"AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
			"AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
			"AccessControlAllowCredentials": true

		};

    /**

     * Headers

     */

     res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
     res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
     res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
     res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

     if ('OPTIONS' == req.method) {
     	res.send(200);
     }

     else {
     	next();
     }

 });
	app.get('/movies', function(req, res, next) {
		res.sendFile(path.resolve('../App/views/index.html'));

	});

	app.post('/movies', function(req, res, next) {

		var movie = encodeURIComponent(req.body.movietitle);

		http.get({
			host: 'omdbapi.com',
			path: '/?t=' + movie +'&apikey=8adb7f03'
		}, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
        	body += d;
        });
        response.on('end', function() {

        	try {
        		var parsed = JSON.parse(body);
        	} catch (err) {
        		console.error('Unable to parse response as JSON', err);
        		return cb(err);
        	}

        	var year = parsed.Year;
        	var genre = parsed.Genre;

        	database.insertmovie(req.body.movietitle,year,genre)
        	.then(function (result) {
        		res.status(200).json(parsed)
        		.catch(function (err) {
        			res.status(406).json({
        				message_class: 'error',
        				message: "ERROR PRODUCT"
        			})});
        	});

        });

    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);

	});
}
