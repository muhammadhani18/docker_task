const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Establishing connection to MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 8080,
  dialect: 'mysql'
});


// Define a model for the User table
const User = sequelize.define('Credentials', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TimeRanges: false
});

// Synchronize the model with the database
(async () => {
  await sequelize.sync();
  console.log("Database synchronized");
})();

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else
    console.log("Error occurred, server can't start", error);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find a user with the provided email and password
    const user = await User.findOne({
        where: { email, password },
        attributes: ['email', 'password'] 
    });
    
    console.log(user);
    
    if (user) {    
      res.status(200).send("Success");
    } else {
      res.status(401).send("Invalid username or password.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
