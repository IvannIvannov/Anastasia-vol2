import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="not-found__inner">
        <span className="not-found__eyebrow">Page not found</span>

        <h1 className="not-found__title">404</h1>

        <p className="not-found__text">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link to="/" className="not-found__button">
          <span>Back to home</span>

          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
