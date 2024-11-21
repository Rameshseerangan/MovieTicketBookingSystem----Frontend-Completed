// pages/HomePage.js
import { useEffect, useState } from 'react';
import { searchMovies } from '../Api/apiService';  
import MovieGrid from '../Components/MovieGrid';  
import FilterDropdown from '../Components/FilterDropdown'; 
import Pagination from '../Components/Pagination';
import Header from '../Components/Header';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('avengers');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setError('');
      try {
        const data = await searchMovies(query, type, page);
        if (data.Response === "True") {
          setMovies(data.Search || []);
          setTotalPages(Math.ceil(data.totalResults / 10));
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching movies.');
      }
    };

    fetchMovies();
  }, [query, type, page]);

  return (
    <div>
      <Header setSearchQuery={setQuery} />
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <FilterDropdown setType={setType} />
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <MovieGrid movies={movies} />
      <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default HomePage;
