const { Client } = require('pg')

const client = new Client({
  host: 'ec2-54-75-239-237.eu-west-1.compute.amazonaws.com',
  port: 5432,
  user: 'vznryfdfgphwnc',
  password: 'dcda1b0a5bdf52dba03cd33c935483a04df0a6d967c0d157f45f78bdbd277187',
  ssl:true,
  database:'d3ktg98lp58nm0'
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected');
  }
})

exports.insertmovie = function (title,year,genre) {
 return new Promise(function (resolve, reject) {
  client.query("INSERT INTO movies(title,year,Genre) VALUES ($1, $2, $3)",[title,year,genre],
    function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
});

}

exports.getmoviessimple = function () {
 return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies",
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});

}

exports.getmovies = function (sortby) {
  if(sortby == 'year'){
 return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies ORDER BY movies.year",
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});
}
else if(sortby == 'genre'){
   return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies ORDER BY movies.Genre",
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});
}
else if(sortby == 'title'){
   return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies ORDER BY movies.title",
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});
}

}

exports.getmoviesbyyearsimple = function (year) {
  console.log("boh yead")
 return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies WHERE movies.year = $1",[year],
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});

}

exports.getmoviesbyyear = function (year,sortby) {
  console.log("fuk me");
  if(sortby == 'year'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.year = $1 ORDER BY movies.year",[year],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }
 else if(sortby == 'genre'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.year = $1 ORDER BY movies.Genre",[year],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }
 else if (sortby == 'title'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.year = $1 ORDER BY movies.title",[year],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }

}


exports.getmoviesbygenresimple = function (genre) {
 return new Promise(function (resolve, reject) {
  client.query("SELECT * FROM movies WHERE movies.Genre = $1",[genre],
    function (err, result) {
      if (err) {
        reject(err);
      } else {
       if(result.rows.length == 0)
        reject(err);
      else
        resolve(result);
      
    }
  });
});

}

exports.getmoviesbygenre = function (genre,sortby) {
  if(sortby == 'year'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.Genre = $1 ORDER BY movies.year",[genre],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }
 else if(sortby == 'genre'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.Genre = $1 ORDER BY movies.Genre",[genre],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }
 else if(sortby == 'title'){
   return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM movies WHERE movies.Genre = $1 ORDER BY movies.title",[genre],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
         if(result.rows.length == 0)
          reject(err);
        else
          resolve(result);

      }
    });
  });
 }


}
