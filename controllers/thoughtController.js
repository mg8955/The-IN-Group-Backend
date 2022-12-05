const { Thought } = require('../models');

module.exports = {

    // Controller to get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    },

    // Controller to get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought 
            ? res.status(404).json({ message: 'No thought with this id' })
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

    // Controller creates reactions and appends them to the thought
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true}
            )
        .then((reaction) =>
            !reaction
                ? res.status(500)
                : res.json(reaction));
    },

    // Controller removes a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
            )
        .then((reaction) =>
            !reaction
                ? res.json(500)
                : res.json(reaction));
    }
};