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
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('__v')
        .then((thought) => 
            !thought 
            ? req.status(404).json({ message: 'No thought with this id' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Controller creates a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // Controller updates a thought - Need to push to Users thought array
    updateThought(req, res) {
        Thought.findOneAndUpdate(

            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id' })
                    : res.json(thought));
    },

    // Controller to delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.json({ message: 'Thought deleted successfully' }))
            .catch((err) => res.status(404).json({ message: 'No thought with this id' }));
    },
}