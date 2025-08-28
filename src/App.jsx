import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MovieCards from "./components/MovieCards";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import Details from "./pages/Details";
import MovieProvider from "./contexts/MovieProvider";
import FavoritesProvider from "./contexts/FavoriteProvider";

function App() {
  return (
    <MovieProvider>
        <FavoritesProvider>
      <BrowserRouter>
        {/* Header*/}
        <Header />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <MovieCards />
              </>
            }
          />
          {/* movies Page */}
          <Route path="/movies" element={<Movies />} />
            {/* series Page */}
          <Route path="/series" element={<Series />} />
          {/* Favorites Page */}
          <Route path="/favorites" element={<Favorites />} />
          {/* Search Results */}
          <Route path="/search/:query" element={<SearchResults />} />
          {/* Movie Details */}
          <Route path="/details/:id" element={<Details />} />
        </Routes> 

        {/*Footer*/}
        <Footer />
      </BrowserRouter>
      </FavoritesProvider>
    </MovieProvider>
  );
}

export default App;
