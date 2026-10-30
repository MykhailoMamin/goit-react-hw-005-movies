
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieReviews } from "services/movieApi";
import { Loader } from "../Loader/Loader";
import css from "./Reviews.module.css";

const Reviews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        let isActive = true;
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            setReviews([]);

            try {
                const data = await getMovieReviews(movieId);
                if (isActive) { setReviews(data.results) }
            } catch (error) {
                if (isActive) { setError(error.message) }
            } finally {
                if (isActive) { setIsLoading(false) }
            }
        }
        fetchData();

        return () => {
            isActive = false;
        }
    }, [movieId]);

    return (
        <section className={css.reviewsSection}>
            <h2 className={css.reviewsTitle}>User Reviews</h2>

            {isLoading && <Loader />}
            {error && <p className={css.error}>{error}</p>}

            <ul className={css.reviewsList}>
                {reviews.length === 0 && !isLoading && !error && (
                    <li className={css.empty}>
                        We don't have any reviews for this movie.
                    </li>
                )}

                {reviews.map(item =>
                    <li className={css.reviewItem} key={item.id}>
                        <h3 className={css.reviewAuthor}>
                            {item.author}
                        </h3>

                        <p className={css.reviewContent}>
                            {item.content}
                        </p>
                    </li>
                )}
            </ul>
        </section>
    )
}

export default Reviews;
