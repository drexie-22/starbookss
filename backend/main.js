const express  = require('express');
const app = express();
const corse = require('cors');


app.use(express.json());
app.use(corse());


// Register and Login routes
app.use("/auth", require('./routes/jwtAuth'));


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

