
const API = "/movies";

// CREATE - Add movie
async function addMovie() {

    const movie = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        year: Number(document.getElementById("year").value),
        director: document.getElementById("director").value,
        rating: Number(document.getElementById("rating").value)
    };

    if (!movie.title || !movie.genre || !movie.year || !movie.director || !movie.rating) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(movie)
    });

    if (response.ok) {
        alert("Movie Added Successfully!");

        document.querySelectorAll("input").forEach(input => input.value = "");

        loadMovies();
    } else {
        alert("Error adding movie");
    }
}

// READ - Display movies
async function loadMovies() {

    const response = await fetch(API);
    const movies = await response.json();

    const list = document.getElementById("movieList");
    list.innerHTML = "";

    movies.forEach(movie => {

        const div = document.createElement("div");
        div.className = "movie";

        const details = document.createElement("p");
        details.textContent =
            `${movie.title} | ${movie.genre} | ${movie.year} | ${movie.director} | Rating: ${movie.rating}`;

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () => updateMovie(movie._id);

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.onclick = () => deleteMovie(movie._id);

        div.append(details, edit, remove);
        list.appendChild(div);

    });
}

// UPDATE - Change movie rating
async function updateMovie(id) {

    const rating = prompt("Enter new rating:");

    if (rating === null || rating.trim() === "") return;

    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            rating: Number(rating)
        })
    });

    if (response.ok) {
        alert("Movie Updated Successfully!");
        loadMovies();
    } else {
        alert("Error updating movie");
    }
}

// DELETE - Remove movie
async function deleteMovie(id) {

    if (!confirm("Are you sure you want to delete this movie?")) {
        return;
    }

    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Movie Deleted Successfully!");
        loadMovies();
    } else {
        alert("Error deleting movie");
    }
}

// Load movies when page opens
loadMovies();
