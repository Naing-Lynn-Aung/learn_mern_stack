const Recipe = require("../models/Recipe");
const mongoose = require('mongoose');
const removeFile = require("../helpers/removeFile");
const User = require("../models/User");
const emailQueue = require('../queues/emailQueue');

const RecipeController = {
    index: async (req, res) => {
        const limit = 6;
        const page = req.query.page || 1;
        const recipes = await Recipe
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        const totalRecipesCount = await Recipe.countDocuments();
        const totalPagesCount = Math.ceil(totalRecipesCount / limit);
        const links = {
            nextPage: totalPagesCount == page ? false : true,
            previousPage: page == 1 ? false : true,
            currentPage: page,
            loopableLinks: []
        };
        // generate loopableLink array
        for (let index = 0; index < totalPagesCount; index++) {
            const number = index + 1;
            links.loopableLinks.push({ number });
        }
        const response = { links, recipes };
        return res.json(response);
    },
    store: async (req, res) => {
        try {
            const { title, description, ingredients } = req.body;
            const recipe = await Recipe.create({
                title,
                description,
                ingredients
            });
            const users = await User.find(null, ['email']);
            let emails = users.map(user => user.email);
            emails = emails.filter(email => email !== req.user.email);
            // email queue
            emailQueue.add({
                view: 'email',
                data: {
                    name: req.user.name,
                    title: recipe.title
                },
                from: req.user.email,
                to: emails,
                subject: 'New Recipe is created by someone'
            });
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    show: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'not a valid id' });
            }
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                return res.status(404).json({ msg: 'recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: 'internet server error' });
        }
    },
    destroy: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'not a valid id' });
            }
            const recipe = await Recipe.findByIdAndDelete(id);
            await removeFile(__dirname + '/../public' + recipe.photo);
            if (!recipe) {
                return res.status(404).json({ msg: 'recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: 'internet server error' });
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'not a valid id' });
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {
                ...req.body
            });
            await removeFile(__dirname + '/../public' + recipe.photo);
            if (!recipe) {
                return res.status(404).json({ msg: 'recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: 'internet server error' });
        }
    },
    upload: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'not a valid id' });
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {
                photo: '/' + req.file.filename
            });
            if (!recipe) {
                return res.status(404).json({ msg: 'recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            return res.status(500).json({ msg: 'internet server error' });
        }
    }
};

module.exports = RecipeController;
