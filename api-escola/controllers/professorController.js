const Professor = require('../models/Professor');

exports.getProfessores = async (req, res) => {
  const professores = await Professor.find();
  res.json(professores);
};

exports.getProfessorById = async (req, res) => {
  const professor = await Professor.findById(req.params.id);
  if (!professor) return res.status(404).send("Professor não encontrado");
  res.json(professor);
};

exports.getTurmasByProfessorId = async (req, res) => {
  const professor = await Professor.findById(req.params.id);
  if (!professor) return res.status(404).send("Professor não encontrado");
  res.json(professor.turmas);
};

exports.updateProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professor) return res.status(404).send("Id não existente");
    res.json(professor);
  } catch (error) {
    res.status(500).send("Erro ao atualizar professor");
  }
};

exports.addTurmaToProfessor = async (req, res) => {
  const professor = await Professor.findById(req.params.id);
  if (!professor) return res.status(404).send("Professor não encontrado");
  professor.turmas.push(req.body);
  await professor.save();
  res.json(professor);
};

exports.getProfessoresByDepartamento = async (req, res) => {
  const professores = await Professor.find({ departamento: req.params.departamento });
  res.json(professores);
};

exports.deleteProfessor = async (req, res) => {
  const professor = await Professor.findByIdAndDelete(req.params.id);
  if (!professor) return res.status(404).send("Id não existente");
  res.send("Professor removido com sucesso");
};
