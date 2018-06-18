# NODEJS Movies/Comments Test

The requested API's are implemented some with sorting/filtering as requested:
They are allocated in heroku server so if interested in calling them just call them with the provided arguments

- http://moviesnodejs.herokuapp.com/movies - GET- Returns all movies existing in the database. Also supports filtering and sorting as requested. 

**Example of requests:**

 http://moviesnodejs.herokuapp.com/movies?year=1996
 http://moviesnodejs.herokuapp.com/movies?sortby=year
 
 Basically it supports sorts the information either by year or genre. It also can fetch all the movies that belong to a certain genre or year.

-  http://moviesnodejs.herokuapp.com/movies - POST - The API connects with the  http://www.omdbapi.com/ server to extract data(I chose to extract Genre and Year, since it was not specified although a lot more could be chosen) using the title of the name provided and stores the information in the database. Also returns the objected caught by the omdbapi API as requested

**Example**:

http://moviesnodejs.herokuapp.com/movies

{

	"movietitle":"Finding Nemo"
  
}

-  http://moviesnodejs.herokuapp.com/comments - GET - Gets all comments of all the movies. Supports also some filtering with the movie ID as requested.

**Example:**

http://moviesnodejs.herokuapp.com/comments
http://moviesnodejs.herokuapp.com/comments?movieid=13

-  http://moviesnodejs.herokuapp.com/comments - POST - Post a new comment regarding a movie by passing movie ID. If the ID is not found it throws an error. Example below:

**Example**
http://moviesnodejs.herokuapp.com/comments

{

  "movieid":"20",
  
  
  "comment": "Very nice"
  
}

While I tried to implement Angular 6.0 interface, Heroku proved to be a bit hard to deal with, therefore lack of time, which did not allow to make a functional demo of the frontend part
