import { FC, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Error: FC<FallbackProps> = () => (
  <div className="grid h-screen w-full place-content-center place-items-center gap-2">
    <FaExclamationTriangle className="text-6xl text-white" />
    <div className="text-white">Oops! Something went wrong!</div>
  </div>
);

const App = () => (
  <div aria-label="App" className="min-h-screen bg-primary py-14">
    <header className="fixed top-0 left-0 right-0 z-40 border-b-2 bg-white py-3 px-4">
      <Link to="/" className="font-semibold text-primary">
        Travel Buddy
      </Link>
    </header>

    <ErrorBoundary FallbackComponent={Error}>
      <Suspense
        fallback={
          <div className="grid h-screen w-full place-items-center">
            <FaSpinner className="animate-spin text-2xl text-white" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
