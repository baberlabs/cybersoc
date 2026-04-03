import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main id="main" className="container py-16 text-white">
      <p className="page-kicker">Error 404</p>
      <h1 className="page-title">Page Not Found</h1>
      <p className="page-intro max-w-2xl">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link to="/" className="btn-base btn-secondary mt-8">
        Go to homepage
      </Link>
    </main>
  );
};

export default NotFound;
