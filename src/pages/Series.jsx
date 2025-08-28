import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const res = await fetch(`https://www.omdbapi.com/?s=breaking&type=series&apikey=${API_KEY}`);
        const data = await res.json();
        
        if (data.Search) {
          setSeries(data.Search);
        }
      } catch (err) {
         setError("Something went wrong", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, []);

  if (loading) return <p>Loading series...</p>;
   if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Series</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>    
        {series.map((show) => (
          <div key={show.imdbID} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={show.Poster}
             alt={show.Title} 
             style={{ width: "100%" }} />
            <h4>{show.Title}</h4>
            <p>{show.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
