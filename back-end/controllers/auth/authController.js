const Agent = require("../../models/agent");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "RandomJWTSecretKey123"


/*mongoose.connect("mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('connect to db...')).catch(err => console.log('failed to connect to db : ', err));*/
mongoose.connect('mongodb://127.0.0.1:27017/ensaj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.login =  async (req, res) => {
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
      /*const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });*/
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
  
      // Send the token as a response
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };