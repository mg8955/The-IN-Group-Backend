// GET all thoughts
// POST new thought
// PUT update thought
// DELETE thought
// POST reaction to thought
// DELETE reaction to thought

const { Thought, Reaction } = require('../models');

module.exports = {

    // Controller to get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => req.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // Controller to get a single thought
}