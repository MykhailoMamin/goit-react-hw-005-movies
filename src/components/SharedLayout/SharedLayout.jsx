import { Outlet, NavLink } from "react-router-dom";
import css from "./SharedLayout.module.css";

const SharedLayout = () => {
    return (
        <div className={css.app}>
            <header className={css.header}>
                <nav className={css.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? css.active : css.link
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                            isActive ? css.active : css.link
                        }
                    >
                        Movies
                    </NavLink>
                </nav>
            </header>

            <main className={css.container}>
                <Outlet />
            </main>
        </div>
    );
};

export default SharedLayout;