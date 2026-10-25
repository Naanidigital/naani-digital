import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import WhatsAppButton from "../WhatsAppButton";

/**
 * MainLayout - Master layout wrapper for all application routes.
 * Centralizes the unified dark luxury header, footer, floating WhatsApp CTA,
 * and background styling across all pages.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
