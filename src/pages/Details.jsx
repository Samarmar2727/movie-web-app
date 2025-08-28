import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";

export default function MovieDetails() {
  const { id } = useParams(); // imdbID
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}&i=${id}&plot=full`);
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movie) return <Typography>No details found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{movie.Title}</Typography>
      <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: "300px" }} />
      <Typography variant="body1" sx={{ mt: 2 }}>{movie.Plot}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>⭐ {movie.imdbRating}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>🎬 {movie.Genre}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>📅 {movie.Year}</Typography>
    </Box>
  );
}
