const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
        
        role: {
            type: String,
            default: 'admin'
        },
    }
)

const Admin = Agent.discriminator('Admin', adminSchema);
module.exports = Admin;