import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const App = () => (
  <div aria-label="App" className="min-h-screen bg-primary py-14">
    <header className="fixed top-0 left-0 right-0 z-40 border-b-2 bg-white py-3 px-4">
      <Link to="/" className="font-semibold text-primary">
        Travel Buddy
      </Link>
    </header>
    <Suspense
      fallback={
        <div className="grid h-screen w-screen place-items-center">
          <FaSpinner className="animate-spin text-white" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  </div>
);

export default App;
