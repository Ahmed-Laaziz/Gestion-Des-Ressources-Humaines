const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Professeur = require('./models/professeur');
const Admin = require('./models/admin');
const Historique = require('./models/historique');
//init app
const PORT = 4000;
const app = express();

// Body-parser middleware to parse JSON requests
app.use(bodyParser.json());

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI).then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));

app.get('/', (req, res) => res.send('<h1>Hello World!!</h1>'));

app.post('/add-professeur', async (req, res) => {
    try {
      const newProfesseur = new Professeur({
        nom: 'John', 
        prenom: 'Doe', 
        email: 'johndoe@example.com', 
        departement: 'Mathematics', 
      });
  
      const savedProfesseur = await newProfesseur.save();
  
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
  
app.listen(PORT, ()=> console.log(`app is un and running on port : ${PORT}`));