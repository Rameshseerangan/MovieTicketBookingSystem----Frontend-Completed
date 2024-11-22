import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../Api/apiService";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getMovieDetails(id);
      setMovie(details);
    };
    fetchDetails();
  }, [id]);

  const handleBooking = () => {
    // Navigate to the payment page 
    navigate(`/movie/${id}/seat`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-800 text-white">
      <div className="flex">
        <img src={movie.Poster} alt={movie.Title} className="w-1/3" />
        <div className="ml-4">
          <h1 className="text-4xl">{movie.Title}</h1>
          <p>{movie.Plot}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Year: {movie.Year}</p>
          <p>Cast: {movie.Actors}</p>

          <div>
            <button
              onClick={handleBooking}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
