
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "services/movieApi";
import { Loader } from "components/Loader/Loader";
import css from "./Home.module.css";

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getTrendingMovies()
                setTrendingMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <main className={css.home}>
            <h1 className={css.title}>Trending Today</h1>

            {isLoading && <Loader />}
            {error && <p className={css.error}>{error}</p>}

            {!isLoading && !error && (
                <ul className={css.movieList}>
                    {trendingMovies.length === 0 &&
                        <li className={css.empty}>
                            <p>No Movies!</p>
                        </li>
                    }

                    {trendingMovies.map(item =>
                        <li className={css.movieItem} key={item.id}>
                            <Link to={`/movies/${item.id}`}>
                                {item.title}
                            </Link>
                        </li>
                    )}
                </ul>
            )}
        </main>
    )
}

export default Home;
