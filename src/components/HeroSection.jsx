import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { Box, Typography, Button } from "@mui/material";

export default function HeroSection() {
  // Access movies and loading state from MovieContext
  const { movies, loading } = useContext(MovieContext);

  //  Track the currently displayed movie index
  const [movieIndex, setMovieIndex] = useState(0);

  //  Auto-change movie every 5 seconds
  useEffect(() => {
    if (movies.length) {
      const interval = setInterval(() => {
        setMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 5000);

      return () => clearInterval(interval); // cleanup interval on unmount
    }
  }, [movies]);

  // 🔹 Show loading state while fetching
  if (loading) return <Typography>Loading...</Typography>;

  // 🔹 Show fallback if no movies found
  if (!movies.length) return <Typography>No movies found</Typography>;

  const movie = movies[movieIndex]; // current movie

  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4,
        transition: "background-image 1s ease-in-out", // smooth fade when movie changes
        backgroundImage: `url(${movie.Poster})`, // movie poster as background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔹 Dark overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* 🔹 Movie details */}
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {movie.Title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {movie.Year}
        </Typography>

        {/* 🔹 Play Trailer button (redirects to YouTube search) */}
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: "20px", px: 3, py: 1 }}
          onClick={() => {
            const query = encodeURIComponent(`${movie.Title} trailer`);
            window.open(
              `https://www.youtube.com/results?search_query=${query}`,
              "_blank"
            );
          }}
        >
          ▶ Play Trailer
        </Button>
      </Box>
    </Box>
  );
}
