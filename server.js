
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    year: Number,
    director: String,
    rating: Number
});

const Movie = mongoose.model("Movie", movieSchema);

// CREATE
app.post("/movies", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
app.put("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
app.delete("/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Connect DB first, then start server
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
    }
}

startServer();
