import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, InputBase, Paper, Fade } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DarkModeIcon from "@mui/icons-material/DarkMode"; // الهلال
import LightModeIcon from "@mui/icons-material/LightMode"; // الشمس
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

export default function Header() {
  const [open, setOpen] = useState(false); 
  const [searchOpen, setSearchOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // dark / light state
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.style.backgroundColor = newMode ? "#121212" : "#fff";
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
      setSearchOpen(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#fff" : "#121212",
        px: 3,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "#E50914",
          }}
        >
          MovieDB
        </Typography>

        {/* Nav Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {["Home", "Movies", "Series"].map((link) => (
            <Button
              key={link}
              component={Link}
              to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              sx={{
                color: darkMode ? "#B3B3B3" : "#333",
                textTransform: "none",
                fontWeight: "600",
                "&:hover": {
                  color: "#E50914",
                },
              }}
            >
              {link}
            </Button>
          ))}
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Favorites */}
          <IconButton component={Link} to="/favorites" sx={{ color: "#FFD700" }}>
            <Badge badgeContent={favorites.length} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          {/* Dark mode toggle */}
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <DarkModeIcon sx={{ color: "#fff" }} /> // هلال أبيض
            ) : (
              <LightModeIcon sx={{ color: "#0f172a" }} /> // شمس كحلي
            )}
          </IconButton>

          {/* Search */}
          <IconButton sx={{ color: darkMode ? "#fff" : "#121212" }} onClick={() => setSearchOpen(!searchOpen)}>
            <SearchIcon />
          </IconButton>

          {/* Mobile menu */}
          <IconButton sx={{ display: { xs: "block", md: "none" }, color: darkMode ? "#fff" : "#121212" }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Animated Search Dropdown */}
      <Fade in={searchOpen}>
        <Paper
          sx={{
            position: "absolute",
            top: "64px",
            right: "20px",
            width: { xs: "80%", sm: "300px" },
            p: "4px 8px",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            background: darkMode ? "#1F1F1F" : "#f0f0f0",
          }}
          elevation={6}
        >
          <InputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            sx={{ ml: 1, flex: 1, color: darkMode ? "white" : "black" }}
          />
        </Paper>
      </Fade>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 200, background: darkMode ? "#141414" : "#fff", height: "100%", color: darkMode ? "white" : "black" }}>
          <ListItem button component={Link} to="/">Home</ListItem>
          <ListItem button component={Link} to="/movies">Movies</ListItem>
          <ListItem button component={Link} to="/series">Series</ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
