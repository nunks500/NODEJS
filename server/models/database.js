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


