
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-2" />
        <h2 className="text-lg">{movie.Title}</h2>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
