import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SiteNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="group flex flex-col leading-none">
              <span className="font-display text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
                Syki-Arts
              </span>
              <span className="text-[10px] lg:text-xs tracking-[0.2em] uppercase text-primary font-body font-medium">
                Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className={`brush-underline font-body text-sm tracking-wide transition-colors ${
                    isActive(href)
                      ? "text-primary after:!transform-none after:!scaleX-100"
                      : "text-foreground hover:text-primary"
                  }`}
                  style={
                    isActive(href)
                      ? {
                          position: "relative",
                        }
                      : undefined
                  }
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-2 px-5 py-2 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded transition-all hover:bg-terracotta-600 hover:shadow-md"
              >
                Commission
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 flex flex-col gap-1.5 z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 flex flex-col items-center justify-center gap-8 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className={`font-display text-4xl font-medium transition-colors ${
              isActive(href) ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-body text-base tracking-wide rounded"
        >
          Commission a Piece
        </Link>
      </div>
    </>
  );
};

export default SiteNavigation;
