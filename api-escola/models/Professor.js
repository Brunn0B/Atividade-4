const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  idade: {
    type: Number,
    required: true
  },
  departamento: {
    type: String,
    required: true
  },
  turmas: [{
    tipo: String,
    codigo: String,
    alunos: [String]
  }]
});

const Professor = mongoose.model('Professor', ProfessorSchema);

module.exports = Professor;
