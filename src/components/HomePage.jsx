import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Our App!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore the app by signing up, logging in, or visiting your dashboard.
      </p>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
