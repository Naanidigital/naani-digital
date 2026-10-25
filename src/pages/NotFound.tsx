import { useLocation, Link } from "react-router-dom";
import NoIndex from "@/components/NoIndex";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <NoIndex title="Page Not Found | Naani Projects" />
      <div className="flex flex-1 min-h-[70vh] items-center justify-center px-4 py-28 bg-background">
        <div className="text-center max-w-md">
          <h1 className="mb-4 text-6xl sm:text-8xl font-black text-gold-gradient">404</h1>
          <p className="mb-6 text-xl text-muted-foreground font-medium">Oops! The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-bold shadow-gold hover:opacity-95 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
