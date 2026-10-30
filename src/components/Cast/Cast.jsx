
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieCast } from "services/movieApi";
import { Loader } from "../Loader/Loader";
import css from "./Cast.module.css";

const Cast = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        let isActive = true;
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            setCast([]);

            try {
                const data = await getMovieCast(movieId);
                if (isActive) { setCast(data.cast); }
            } catch (error) {
                if (isActive) { setError(error.message); }
            } finally {
                if (isActive) { setIsLoading(false); }
            }
        }
        fetchData();

        return () => {
            isActive = false;
        }
    }, [movieId]);
    
    return (
        <section className={css.castSection}>
            <h2 className={css.castTitle}>Cast</h2>

            {isLoading && <Loader />}
            {error && <p className={css.error}>{error}</p>}

            {!isLoading && !error && cast.length === 0 && (
                <p className={css.empty}>No cast information available.</p>
            )}

            <div>
                <ul className={css.castList}>
                    {cast.map(item =>
                        <li className={css.castItem} key={item.id}>
                            {item.profile_path ? (
                                <img
                                    className={css.castImage}
                                    src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                                    alt={item.name}
                                />
                            ) : (
                                <div className={css.noImage}>
                                    No Image
                                </div>
                            )}

                            <p className={css.castName}>{item.name}</p>
                            <p className={css.castCharacter}>{item.character}</p>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Cast;
