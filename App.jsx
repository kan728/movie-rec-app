import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "7fb1d6fd"; 

function App() {
  const [genre, setGenre] = useState("action");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (selectedGenre) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${selectedGenre}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found!");
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(genre);
  }, [genre]);

  return (
    <div className="container">
      <h1>🎬 Movie Recommendation App</h1>

      <div className="controls">
        <label>Select Genre: </label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
          <option value="horror">Horror</option>
        </select>
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
