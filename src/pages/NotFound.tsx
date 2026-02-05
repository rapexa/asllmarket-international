import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Log 404 errors in development only
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center max-w-md mx-auto px-4 space-y-6">
        <div className="text-8xl font-extrabold text-primary/20">404</div>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xl text-muted-foreground">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => navigate('/')}
            className="btn-gradient-primary"
          >
            <Home className="h-4 w-4 me-2" />
            Return to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
