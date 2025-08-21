import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MovieCards from "./components/MovieCards";
import MovieProvider from "./contexts/MovieProvider";


function App() {
  return (
    <div className="min-h-screen">
      < MovieProvider>
       {/* Header */}
      <Header />
       {/* HeroSection */}
      <HeroSection/>
       {/* MovieCards */}
      <MovieCards/>
      </MovieProvider>
    
    </div>
  );
}

export default App;
