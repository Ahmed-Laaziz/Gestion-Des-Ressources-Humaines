const Admin = require("../../models/admin");
const mongoose = require('mongoose');


/*mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));*/
mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add a route to retrieve and display a list of Professeurs
exports.getAdmins = async (req, res, next) => {
    try {
      const allAdmins = await Admin.find({});
      res.status(200).json(allAdmins);
    } catch (error) {
      console.error('Error retrieving admin:', error);
      res.status(500).json({ error: 'Failed to retrieve admin' });
    }
};

exports.addAdmin = async (req, res, next) => {
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
  
      res.status(200).json(savedAdmin);
    } catch (error) {
      console.error('Error adding administrator:', error);
      res.status(500).json({ error: 'Failed to add administrator' });
    }
  };