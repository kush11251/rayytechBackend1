const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {  }
);

mongoose.connection.once('open', () => {
    console.log("mongodb connected");
})

const post = require('./routes/posts')
app.use('/post',post)

app.listen(port, () => {
    console.log("server running on port :-" + port);
});




// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// require("dotenv/config");
// app.use(bodyParser.json());

// //Import Routes
// const postsRoute = require("./routes/posts");
// app.use("/posts", postsRoute);

//Middleware
/*app.use("/posts", () => {
  console.log("This is a middleware running");
});*/

//Routes
// app.get("/", (req, res) => {
//   res.send("We are on home");
// });

//Connect to DB



/*const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
    console.log("mongodb connected");
})



app.listen(port, () => {
    console.log("server running on port :-" + port);
});*/