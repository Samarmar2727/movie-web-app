import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../contexts/MovieContext";
import { Typography, Box } from "@mui/material";
import MovieCards from "../components/MovieCards";

export default function SearchResults() {
  const { query } = useParams();
  const { movies, loading, fetchMovies } = useContext(MovieContext);

  useEffect(() => {
    if (query) {
      fetchMovies(query); // catch movie depends on the client search 
    }
  }, [query]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movies.length) return <Typography>No results found for "{query}"</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Results for "{query}"
      </Typography>
      <MovieCards movies={movies} />
    </Box>
  );
}
