const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Server is Running')
})

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`)
})

// DB CONNECTION ########################################################################
const connectDB = require('./config/db'); 
connectDB();

// REST API CONNECTION ##################################################################
const usersAPI = require('./src/controllers/usersAPI');
app.use('/api', usersAPI);
