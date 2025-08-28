import { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Pagination,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function MovieCards() {
  const { movies, loading } = useContext(MovieContext);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const navigate = useNavigate();

  // Pagination
  const [page, setPage] = useState(1);
  const moviesPerPage = 8;
  const handleChange = (event, value) => setPage(value);

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movies.length) return <Typography>No movies found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {currentMovies.map((movie, index) => {
          const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

          return (
            <Card
              key={movie.imdbID}
              sx={{
                background: "#141414",
                color: "white",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: 500, 
                transition: "transform 0.3s, box-shadow 0.3s",
                opacity: 0,
                animation: `fadeIn 0.6s forwards`,
                animationDelay: `${index * 0.1}s`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 25px rgba(0,0,0,0.6)",
                },
                "@keyframes fadeIn": {
                  "0%": { opacity: 0, transform: "translateY(20px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              {/* Poster */}
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={
                    movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"
                  }
                  alt={movie.Title}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.3)",
                    transition: "background 0.5s",
                    "&:hover": { background: "rgba(0,0,0,0.1)" },
                  }}
                />
                {/* Favorite Button */}
                <IconButton
                  onClick={() =>
                    isFav
                      ? removeFromFavorites(movie.imdbID)
                      : addToFavorites({
                          imdbID: movie.imdbID,
                          Title: movie.Title,
                          Year: movie.Year,
                          Poster: movie.Poster,
                        })
                  }
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: isFav ? "#FFD700" : "#fff",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                  }}
                  aria-label={
                    isFav ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              {/* card content*/}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", 
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mb: 0.5,
                    }}
                  >
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2">{movie.Year}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button
                    sx={{
                      background: "white",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": { background: "#e6e6e6" },
                    }}
                    onClick={() => {
                      const query = encodeURIComponent(
                        `${movie.Title} trailer`
                      );
                      window.open(
                        `https://www.youtube.com/results?search_query=${query}`,
                        "_blank"
                      );
                    }}
                  >
                    ▶ Play
                  </Button>

                  <Button
                    sx={{
                      background: "#6366f1",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": { background: "#4f46e5" },
                    }}
                    onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  >
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Pagination*/}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(movies.length / moviesPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
