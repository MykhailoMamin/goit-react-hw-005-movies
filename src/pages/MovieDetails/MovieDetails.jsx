
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "services/movieApi";
import { Loader } from "components/Loader/Loader";
import css from "./MovieDetails.module.css";

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { movieId } = useParams();

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false) 
            }
        }
        fetchData()
    }, [movieId])

    const handleGoBack = () => {
         navigate(-1);
     };

    return (
        <main className={css.main}>
            {isLoading && <Loader />}
            {error && <p className={css.error}>{error}</p>}

            {movie && (
                <section className={css.movieDetails}>
                    <button
                        className={css.backButton}
                        type="button"
                        onClick={handleGoBack}
                    >
                        ← Go Back
                    </button>

                    <div className={css.movieContent}>
                        <div className={css.movieSidebar}>
                            {movie.poster_path && (
                                <img
                                    className={css.moviePoster}
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            )}

                            <ul className={css.movieLinks}>
                                <li>
                                    <Link to={`cast`}>Cast</Link>
                                </li>
                                <li>
                                    <Link to={`reviews`}>Reviews</Link>
                                </li>
                            </ul>
                        </div>

                        <div className={css.movieInfo}>
                            <h1>
                                {movie.title} {`(${movie.release_date.split("-", 1)})`}
                            </h1>

                            <p className={css.userScore}>
                                User Score: {movie.vote_average * 10}%
                            </p>

                            <h2>Overview</h2>
                            <p>{movie.overview}</p>

                            <h2>Genres</h2>
                            <ul className={css.movieGenres}>
                                {movie.genres.map(item => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            <Outlet />
        </main>
    )
}

export default MovieDetails;
