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

	app.post('/comments', function(req, res, next) {

        //verifies if post has movieid and comment, if not gives error
		if(req.body.movieid == null || req.body.movieid == 'undefined' || req.body.comment == null || req.body.comment == 'undefined'){
            res.status(406).json({
                message_class: 'error',
                message: "PARAMETERS NOT WELL DEFINED"
            })
            return;
        }

        //verifies if movieid exists and if yes, inserts the comment
        database.getmoviesID(req.body.movieid)
        .then(function (local) {

            database.insertcomment(req.body.movieid,req.body.comment)
            .then(function (local) {

                res.status(200).send(req.body.comment);

            })
            .catch(function (err) {
             res.status(406).json({
                message_class: 'error',
                message: "ERROR ADDING COMMENT"
            })})


        })
        .catch(function (err) {
         res.status(406).json({
            message_class: 'error',
            message: "NO MOVIES FOUND WITH THAT ID"
        })})


    });

    app.get('/comments', function(req, res, next) {

        //if get request has no movieid return all comments
        if(typeof req.query.movieid == "undefined"){

           database.getcomments()
           .then(function (local) {
            res.status(200).send(local.rows);
        })
           .catch(function (err) {
             res.status(406).json({
                message_class: 'error',
                message: "NO COMMENTS FOUND"
            })})

           return;

       }
      
       //if it has movieid get comments for that movie
       database.getcommentsbymovie(req.query.movieid)
       .then(function (local) {
            res.status(200).send(local.rows);
         })
       .catch(function (err) {
         res.status(406).json({
            message_class: 'error',
            message: "NO COMMENTS FOUND FOR THAT MOVIE ID"
        })})


   });

    app.get('/movies', function(req, res, next) {
		
        //if get request has year field
		if(typeof req.query.year !== "undefined")
		{
            //if get request has sortby field
           if(typeof req.query.sortby !== "undefined"){
               database.getmoviesbyyear(req.query.year,req.query.sortby)
               .then(function (local) {
                res.status(200).send(local.rows);
            })
               .catch(function (err) {
                 res.status(406).json({
                    message_class: 'error',
                    message: "NO MOVIES FOUND WITH THAT YEAR"
                })})
           }
           else
           {

               database.getmoviesbyyearsimple(req.query.year)
               .then(function (local) {
                res.status(200).send(local.rows);
            })
               .catch(function (err) {
                 res.status(406).json({
                    message_class: 'error',
                    message: "NO MOVIES FOUND WITH THAT YEAR"
                })})
           }

           return;

       }
       else if(typeof req.query.genre !== "undefined") //if get request wants to find movies with a specific genre
       {
           if(typeof req.query.sortby !== "undefined"){
              database.getmoviesbygenre(req.query.genre,req.query.sortby) //if it is getting sorted
              .then(function (local) {
                res.status(200).send(local.rows);
            })
              .catch(function (err) {
                 res.status(406).json({
                    message_class: 'error',
                    message: "NO MOVIES FOUND WITH THAT GENRE"
                })})
          }
          else{ //if request doesnt want sorted json
           database.getmoviesbygenresimple(req.query.genre)
           .then(function (local) {
            res.status(200).send(local.rows);
        })
           .catch(function (err) {
             res.status(406).json({
                message_class: 'error',
                message: "NO MOVIES FOUND WITH THAT GENRE"
            })})
       }
       return;

   }

   if(typeof req.query.sortby !== "undefined"){
     database.getmovies(req.query.sortby)
     .then(function (local) {
        res.status(200).send(local.rows);
    })
     .catch(function (err) {
         res.status(406).json({
            message_class: 'error',
            message: "NO MOVIES FOUND"
        })})
 }
 else{
    database.getmoviessimple()
    .then(function (local) {
        res.status(200).send(local.rows);
    })
    .catch(function (err) {
     res.status(406).json({
        message_class: 'error',
        message: "NO MOVIES FOUND"
    })})
}

});



    app.post('/movies', function(req, res, next) {

      var movie = encodeURIComponent(req.body.movietitle);

      if(req.body.movietitle == null || req.body.movietitle == 'undefined'){

         res.status(406).json({
            message_class: 'error',
            message: "PARAMETER MISSING"
        });
     }

     http.get({ //calls api
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

        	database.insertmovie(req.body.movietitle,year,genre) //insert movie in the database with information fetched
        	.then(function (result) {
        		res.status(200).json(parsed)
        	})
        	.catch(function (err) {
        		res.status(406).json({
        			message_class: 'error',
        			message: "ERROR PRODUCT"
        		})});
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);
    });
});
}