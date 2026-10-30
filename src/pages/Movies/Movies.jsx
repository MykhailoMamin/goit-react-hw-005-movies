
import { useState, useEffect } from "react";
import { searchMovies } from "services/movieApi";
import { Loader } from "components/Loader/Loader";
import { Link, useSearchParams } from "react-router-dom";
import css from "./Movies.module.css";

const Movies = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";

    useEffect(() => {
        setSearchQuery(query);

        if (!query.trim()) {
            setMovies([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        let isActive = true;

        const handleSearchMovies = async () => {
            setIsLoading(true);
            setError(null);
            setMovies([]);

            try {
                const data = await searchMovies(query);

                if (isActive) {
                    setMovies(data.results);
                }
            } catch (error) {
                if (isActive) {
                    setError(error.message);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        handleSearchMovies();

        return () => {
            isActive = false;
        };
    }, [query]);

    const handleChange = evt => {
        setSearchQuery(evt.target.value);
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        const searchValue = searchQuery.trim();

        if (!searchValue) {
            return;
        }

        setSearchParams({ query: searchValue });
    };

    return (
        <main className={css.movies}>
            <h1 className={css.title}>Search Movies</h1>

            <form className={css.searchForm} onSubmit={handleSubmit}>
                <input
                    className={css.searchInput}
                    value={searchQuery}
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter movie title..."
                />
                <button className={css.searchButton} type="submit">
                    Search
                </button>
            </form>

            {isLoading && <Loader />}

            {error && <p className={css.error}>{error}</p>}

            <ul className={css.movieList}>
                {!isLoading && !error && query && movies.length === 0 && (
                    <li className={css.empty}>
                        The Movies not found!
                    </li>
                )}

                {movies.map(item => (
                    <li className={css.movieItem} key={item.id}>
                        <Link to={`/movies/${item.id}`}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Movies;
