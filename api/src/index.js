const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Professeur = require('./models/professeur');
const Admin = require('./models/admin');
const Agent = require('./models/agent');
const Historique = require('./models/historique');
const generateRandomPassword = require('./business/passwordGenerator');
const sendEmail = require('./business/emailSender'); // Import the sendEmail function
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const bcrypt = require('bcrypt'); // For password hashing
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables from .env file

//init app
const PORT = 4000;
const app = express();

// Body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
//Docker
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
//Local
const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));

app.get('/', (req, res) => res.send('<h1>Hello World!!</h1>'));

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the Agent collection (which includes Admin and Professeur)
    const user = await Agent.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    // const passwordMatch = await bcrypt.compare(password, password);

    if (password != user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If email and password are valid, generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Define a route to get agent data by ID
app.get('/agents/:id', async (req, res) => {
  try {
    const agentId = req.params.id;

    // Find the agent by ID in your Agent collection
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Return the agent data as JSON
    res.json(agent);
  } catch (error) {
    console.error('Error fetching agent by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Add a route to retrieve and display a list of Professeurs
app.get('/admins', async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    res.json(allAdmins);
  } catch (error) {
    console.error('Error retrieving admin:', error);
    res.status(500).json({ error: 'Failed to retrieve admin' });
  }
});

// In your server-side code


app.post('/add-professeur', async (req, res) => {
    try {
      const randomPassword = generateRandomPassword(8);

      const userPass = 'HoQhjdslks'

      const newProfesseur = new Professeur({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: userPass,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        num_loyer: req.body.num_loyer,
        date_entre_ecole: req.body.date_entre_ecole,
        date_fct_publique:req.body.date_fct_publique,
        cadre:req.body.cadre,
        num_ref:req.body.num_ref,
        date_effective:req.body.date_effective,
        anciennete:req.body.anciennete,
        date_visa:req.body.date_visa
      });
  
      const savedProfesseur = await newProfesseur.save();
      

    // Create an entry in the historique
    const historiqueEntry = new Historique({
      professeur: savedProfesseur._id, // Associate the historique entry with the new professor
      grade: req.body.grade, // Set the default grade here
      classe: req.body.classe, // Set the default class here
      date: new Date() // Set the current date
    });

    await historiqueEntry.save();

// Send an email to the added professor with their login information
    const emailSubject = 'Welcome to Our Platform';
    const emailText = `Dear Professor,\n\nYou have been added to our platform. Your login email is: ${req.body.email}\nYour password is: ${userPass}\n\nPlease use these credentials to log in.\n\nBest regards,\nYour Platform Team`;

    sendEmail(req.body.email, emailSubject, emailText);
      res.json(savedProfesseur);
    } catch (error) {
      console.error('Error adding professeur:', error);
      res.status(500).json({ error: 'Failed to add professeur' });
    }
  });

  app.post('/add-admin', async (req, res) => {
    console.log(req);
    try {
      const newAdmin = new Admin({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: req.body.password,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        fonction: req.body.fonction,
      });
  
      const savedAdmin = await newAdmin.save();
  
      res.json(savedAdmin);
    } catch (error) {
      console.error('Error adding administrator:', error);
      res.status(500).json({ error: 'Failed to add administrator' });
    }
  });

  app.post('/add-historique', async (req, res) => {
    console.log(req);
    try {
      const newHistorique = new Historique({
        professeur: '6515b457e26ddce65436f34c', // Replace with the actual ObjectId of the related Professeur
        grade: 'Associate Professor', // Replace with the actual grade
        annee: 2023, // Replace with the actual year
      });
  
      const saveHistorique = await newHistorique.save();
  
      res.json(saveHistorique);
    } catch (error) {
      console.error('Error adding Historiique:', error);
      res.status(500).json({ error: 'Failed to add Historiique' });
    }
  });


// Define a route to retrieve and return data from the "professeur" collection
app.get('/professeurs', async (req, res) => {
    try {
      const allProfesseurs = await Professeur.find({});
      res.json(allProfesseurs);
    } catch (error) {
      console.error('Error retrieving professeurs:', error);
      res.status(500).json({ error: 'Failed to retrieve professeurs' });
    }
  });
  
app.listen(PORT, ()=> console.log(`app is up and running on port : ${PORT}`));