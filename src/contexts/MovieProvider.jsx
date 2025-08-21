import { useState, useEffect } from "react";
import axios from "axios";
import { MovieContext } from "./MovieContext";

export default function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
  const keywords = ["love", "star", "hero", "game", "war", "dream"];

  const fetchMovies = async (keyword) => {
    setLoading(true);
    try {
      const searchKeyword = keyword || keywords[Math.floor(Math.random() * keywords.length)];
      const res = await axios.get(`${BASE_URL}&s=${searchKeyword}`);
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
     value={{ movies, loading, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
}
