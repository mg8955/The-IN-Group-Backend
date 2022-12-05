const { User, Thought } = require('../models');

module.exports = {

    // Controller to get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // Controller gets a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({
            path: 'thoughts'
        })
        .populate({
            path: 'friends'
        })
        .then((user) => 
            !user
            ? req.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Controller creates a new User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Controller to update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id' })
                    : res.json(user) 
                )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user and their thoughts/reactions
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : Thought.deleteMany({ _id: { $in: user.thoughts } } )
            )    
            .then(() => res.json({ message: 'User and their thoughts deleted successfully' }))
            .catch((err) => res.status(500).json(err));
    },

    // This controller adds a friend to the User's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user 
                ? res.json(404).json({ message: 'No user with this id' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // This controller deletes a friend from the User's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user with this id' })
                : res.json(user)
                )
            .catch((err) => res.status(500).json(err));
    },
};