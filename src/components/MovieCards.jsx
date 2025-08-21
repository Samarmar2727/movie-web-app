import { useContext } from "react";
import {MovieContext} from "../contexts/MovieContext"
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export default function MovieCards() {
  const { movies, loading } = useContext(MovieContext);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movies.length) return <Typography>No movies found</Typography>;

  return (
    <Box 
      sx={{ 
        display: "grid",
        gridTemplateColumns: { 
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        },
        gap: 3,
        p: 3
      }}
    >
      {movies.map((movie, index) => (
        <Card
          key={movie.imdbID}
          sx={{ 
            background: "#141414",
            color: "white",
            borderRadius: 2,
            overflow: "hidden",
            transition: "transform 0.3s, box-shadow 0.3s",
            opacity: 0,
            animation: `fadeIn 0.6s forwards`,
            animationDelay: `${index * 0.1}s`,
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 15px 25px rgba(0,0,0,0.6)"
            },
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <CardMedia 
              component="img" 
              height="350" 
              image={movie.Poster} 
              alt={movie.Title}
              sx={{
                transition: "transform 0.5s",
                "&:hover": { transform: "scale(1.1)" }
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.3)",
                transition: "background 0.5s",
                "&:hover": { background: "rgba(0,0,0,0.1)" }
              }}
            />
          </Box>

          <CardContent>
            <Typography 
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mb: 0.5
              }}
            >
              {movie.Title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {movie.Year}
            </Typography>
            <Button 
              sx={{
                background: "white",
                color: "black",
                fontWeight: "bold",
                "&:hover": { background: "#e6e6e6" }
              }}
              onClick={() => {
                const query = encodeURIComponent(`${movie.Title} trailer`);
                window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
              }}
            >
              ▶ Play
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
