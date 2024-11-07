const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');

router.get('/', async (req, res) => {
  try {
    const professores = await Professor.find();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).send("Professor não encontrado");
    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/turmas', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).send("Professor não encontrado");
    res.json(professor.turmas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professor) return res.status(404).send("Id não existente");
    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/turmas', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).send("Professor não encontrado");
    professor.turmas.push(req.body);
    await professor.save();
    res.json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/departamento/:departamento', async (req, res) => {
  try {
    const professores = await Professor.find({ departamento: req.params.departamento });
    res.json(professores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);
    if (!professor) return res.status(404).send("Id não existente");
    res.json({ message: "Professor removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
