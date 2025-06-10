// src/pages/NotFound.jsx
function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">The page you are looking for doesn’t exist.</p>
    </div>
  );
}

export default NotFound;
