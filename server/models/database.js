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

client.query('DROP TABLE IF EXISTS movies cascade')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))

client.query('DROP TABLE IF EXISTS comments cascade')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))

client.query('CREATE TABLE movies(id SERIAL PRIMARY KEY, title VARCHAR(50) not null, year varchar(50) not null,Genre varchar(50) not null)')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))

client.query('CREATE TABLE comments(id SERIAL PRIMARY KEY, comment VARCHAR(150) not null,  movieid int REFERENCES movies(id))')
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))



