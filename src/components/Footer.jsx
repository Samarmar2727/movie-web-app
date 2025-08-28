
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1F1F1F",
        color: "#B3B3B3",
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2025 MovieDB. Built by{" "}
        <span style={{ color: "#E50914", fontWeight: "600" }}>Samar Khaled</span>
      </Typography>

      <Box sx={{ mt: 1 }}>
        <IconButton
          href="https://github.com/YOUR_GITHUB"
          target="_blank"
          sx={{ color: "#fff", "&:hover": { color: "#E50914" } }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href="https://linkedin.com/in/YOUR_LINKEDIN"
          target="_blank"
          sx={{ color: "#fff", "&:hover": { color: "#E50914" } }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
