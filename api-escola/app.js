const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://britobrunnob:rYmtGfkn1x1qcjro@ac2.rzozf.mongodb.net/AC2?retryWrites=true&w=majority')
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

app.use(express.json());

const Professor = mongoose.model('Professor', new mongoose.Schema({
  nome: String,
  idade: Number,
  departamento: String,
  turmas: [{
    codigo: String,
    disciplina: String,
    alunos: [String]
  }]
}));

app.get('/professores', async (req, res) => {
  try {
    res.json(await Professor.find());
  } catch (err) {
    res.status(500).json({ message: 'Erro ao recuperar os professores', error: err });
  }
});

app.post('/professores', async (req, res) => {
  try {
    const novoProfessor = await new Professor(req.body).save();
    res.status(201).json(novoProfessor);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao adicionar professor', error: err });
  }
});

app.post('/professores/:id/turmas', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, {
      $push: { turmas: req.body }
    }, { new: true });

    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.status(200).json({ message: 'Turma adicionada', professor });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar turma', error: err });
  }
});

app.get('/professores/:id/turmas', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.status(200).json(professor.turmas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar turmas', error: err });
  }
});

app.get('/professores/:id', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar professor', error: err });
  }
});

app.get('/professores/departamento/:depto', async (req, res) => {
  try {
    const professores = await Professor.find({ departamento: req.params.depto });
    if (!professores.length) return res.status(404).json({ message: 'Nenhum professor encontrado' });
    res.status(200).json(professores);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar professores', error: err });
  }
});

app.put('/professores/:id', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar professor', error: err });
  }
});

app.delete('/professores/:id', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.status(200).json({ message: 'Professor deletado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar professor', error: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
