
import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  if (!favorites.length) {
    return (
      <Box sx={{ py: 6, textAlign: "center", color: "#B3B3B3" }}>
        <Typography variant="h6">No favorites yet</Typography>
        <Typography variant="body2">Go add some movies you love ♥</Typography>
      </Box>
    );
  }

  return (
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
        p: 3,
      }}
    >
      {favorites.map((movie) => (
        <Card
          key={movie.imdbID}
          sx={{
            background: "#1e1e1e",
            color: "white",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* صورة الفيلم */}
          <CardMedia
            component="img"
            height="350"
            image={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
            alt={movie.Title}
            sx={{ objectFit: "cover" }}
          />

          {/* العنوان + السنة */}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {movie.Title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              {movie.Year}
            </Typography>
          </CardContent>

          {/* الأزرار */}
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 2,
            }}
          >
            <Button
              component={Link}
              to={`/details/${movie.imdbID}`}
              size="small"
              variant="contained"
              color="error"
              sx={{ borderRadius: 2, fontWeight: "bold" }}
            >
              Details
            </Button>

            <IconButton
              onClick={() => removeFromFavorites(movie.imdbID)}
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "rgba(255,0,0,0.15)",
                },
              }}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
