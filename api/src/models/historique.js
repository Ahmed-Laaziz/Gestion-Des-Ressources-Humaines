const mongoose = require('mongoose');

const gradeHistoriqueSchema = new mongoose.Schema({
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' },
  grade: String,
  classe: String,
  date: Date,
});

const Historique = mongoose.model('GradeHistorique', gradeHistoriqueSchema);

module.exports = Historique;