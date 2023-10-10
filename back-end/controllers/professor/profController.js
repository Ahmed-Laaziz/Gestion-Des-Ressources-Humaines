const Professeur = require("../../models/professeur");
const sendEmail = require('../../business/emailSender');
const generateRandomPassword = require('../../business/passwordGenerator');
const mongoose = require('mongoose');


/*mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));*/
mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a route to retrieve and return data from the "professeur" collection
exports.getProfs = async (req, res, next) => {
    try {
      const allProfesseurs = await Professeur.find({});
      res.status(200).json(allProfesseurs);
    } catch (error) {
      console.error('Error retrieving professeurs:', error);
      res.status(500).json({ error: 'Failed to retrieve professeurs' });
    }
};

exports.addProf =  async (req, res, next) => {
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
      res.status(200).json(savedProfesseur);
    } catch (error) {
      console.error('Error adding professeur:', error);
      res.status(500).json({ error: 'Failed to add professeur' });
    }
};