import { useState, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContext";


export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => 
      prev.find((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
