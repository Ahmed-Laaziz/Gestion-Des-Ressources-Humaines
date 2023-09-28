const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const profSchema = new Schema({
        
        departement: {
            type: String,
            required: true
        },
    }
)

const Professeur = Agent.discriminator('Professeur', profSchema);
module.exports = Professeur;