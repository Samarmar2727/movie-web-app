// src/components/Header.jsx
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, InputBase, Paper, Fade } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false); // drawer for mobile
  const [searchOpen, setSearchOpen] = useState(false); // toggle search input
  const [searchQuery, setSearchQuery] = useState(""); // store search text

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
      // here you can trigger fetchMovies(searchQuery)
      setSearchOpen(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{   background: "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(0,0,0,0.4))", // gradient background
    px:5 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "grey" }}>
          MovieWave
        </Typography>

        {/* Centered Nav Links inside pill-shaped box */}
     <Box 
  sx={{ 
    display: { xs: "none", md: "flex" }, 
    gap: 3, 
    background: "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(0,0,0,0.4))", // gradient background
    px: 3, 
    py: 1.5, 
    borderRadius: "50px", 
    mt: 2, // margin top
    mb: 2, // margin bottom
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)", // shadow effect
    width:"50%",
  }}
>
  {["Home", "Movies", "Series"].map((link) => (
    <Button
      key={link}
      sx={{ 
        color: "grey", 
        textTransform: "none", 
        textAlign:"center",
        fontWeight: "600",
        "&:hover": { 
          background:"red", // hover effect
          borderRadius: "20px"
        } 
      }}
    >
      {link}
    </Button>
  ))}
</Box>

        {/* Right Section (Search + Mobile menu) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search Icon toggles search box */}
          <IconButton sx={{ color: "white" }} onClick={() => setSearchOpen(!searchOpen)}>
            <SearchIcon />
          </IconButton>

          {/* Mobile Menu Button */}
          <IconButton sx={{ display: { xs: "block", md: "none" }, color: "white" }} onClick={() => setOpen(true)}>
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
            background: "#222",
          }}
          elevation={6}
        >
          <InputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            sx={{ ml: 1, flex: 1, color: "white" }}
          />
        </Paper>
      </Fade>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 200, background: "#141414", height: "100%", color: "white" }}>
          <ListItem button>Home</ListItem>
          <ListItem button>Movies</ListItem>
          <ListItem button>Series</ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
