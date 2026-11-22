import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import navitems from "../../lib/navitems";
import assets from "../../assets/assets";
import stockistConfig from "../../lib/stockistConfig";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        className="relative border-b border-secondary-dark/60 bg-[#f6f9f6]/95 backdrop-blur-md"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <nav className="app-container flex h-16 sm:h-20 items-center gap-4">
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">
              <img
                src={assets.logo2}
                alt="Mudet"
                className="h-6 w-6 object-contain"
              />
            </div>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-base sm:text-lg font-bold text-neutral-dark">
                {stockistConfig.name}
              </span>
              <a
                href="https://www.mudetrealsolution.com"
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-[10px] font-semibold text-neutral-soft hover:underline"
              >
                {stockistConfig.tagline}
              </a>
            </span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navitems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={[
                    "relative rounded-md px-3.5 py-2 text-sm font-semibold transition",
                    active
                      ? "text-primary bg-primary-soft/50"
                      : "text-neutral-soft hover:bg-white hover:text-primary",
                  ].join(" ")}
                >
                  <span className="relative">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="ml-auto hidden items-center gap-2.5 md:flex">
            <Link
              to="/purchase-product"
              className="btn-secondary min-h-10 px-4 py-2 text-xs"
            >
              Buy Products
            </Link>
            <a
              href={`tel:${stockistConfig.phone.tel}`}
              className="btn-primary min-h-10 gap-1.5 px-4 py-2 text-xs"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-secondary-dark/80 bg-white text-primary shadow-xs transition hover:bg-secondary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <HiX className="text-xl text-neutral-dark" />
            ) : (
              <HiOutlineMenuAlt3 className="text-xl" />
            )}
          </button>
        </nav>

        {/* Downward Mobile Overlay Menu: Displays ON TOP of the hero without shifting page content */}
        <AnimatePresence>
          {open && (
            <>
              {/* Click-outside backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setOpen(false)}
                className="fixed inset-x-0 bottom-0 top-16 sm:top-20 bg-neutral-dark/25 backdrop-blur-xs md:hidden z-40"
              />

              {/* Absolute overlay dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 w-full overflow-hidden border-b border-secondary-dark/70 bg-[#f6f9f6] md:hidden shadow-xl z-50"
              >
                <div className="app-container py-3.5 flex flex-col gap-1">
                  {navitems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={[
                          "rounded-md px-3.5 py-2.5 text-xs font-bold transition",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-neutral-dark hover:bg-secondary",
                        ].join(" ")}
                      >
                        {item.name}
                      </Link>
                    );
                  })}

                  <div className="mt-2 pt-2.5 border-t border-secondary-dark/60 flex flex-col gap-2">
                    <Link
                      to="/purchase-product"
                      className="btn-primary w-full text-xs"
                      onClick={() => setOpen(false)}
                    >
                      Buy Mudet Products
                    </Link>
                    <a
                      href={`https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodeURIComponent(
                        `Hi, I want to ask about Mudet products from ${stockistConfig.name}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-xs"
                      onClick={() => setOpen(false)}
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
