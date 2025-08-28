import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "Failed to fetch movies");
        }
      } catch (err) {
        setError("Something went wrong", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              style={{ width: "100%" }}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
