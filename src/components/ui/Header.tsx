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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        className="border-b border-secondary-dark/60 bg-[#f6f9f6]/95 backdrop-blur-md"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <nav className="app-container flex h-16 sm:h-20 items-center gap-4">
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white border border-secondary-dark/70 shadow-xs">
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
              <span className="truncate text-[10px] font-semibold text-neutral-soft">
                {stockistConfig.tagline}
              </span>
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
            onClick={() => setOpen(true)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-secondary-dark/80 bg-white text-primary shadow-xs transition hover:bg-secondary md:hidden"
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 className="text-xl" />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-neutral-dark/45"
            />

            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-xs flex-col bg-[#f6f9f6] shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-secondary-dark/60 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src={assets.logo2}
                    alt="Mudet"
                    className="h-7 w-7 object-contain"
                  />
                  <div className="leading-tight">
                    <p className="font-display text-base font-bold text-neutral-dark">
                      {stockistConfig.name}
                    </p>
                    <p className="text-[10px] text-neutral-soft">
                      {stockistConfig.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white border border-secondary-dark/70 text-neutral-dark"
                  aria-label="Close menu"
                >
                  <HiX className="text-xl" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 px-4 py-4">
                {navitems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={[
                        "rounded-md px-3.5 py-2.5 text-xs font-bold transition",
                        active
                          ? "bg-primary text-white"
                          : "bg-white text-neutral-dark hover:bg-secondary",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-secondary-dark/60 p-4 flex flex-col gap-2">
                <Link
                  to="/purchase-product"
                  className="btn-primary w-full text-xs"
                  onClick={() => setOpen(false)}
                >
                  Buy Mudet Products
                </Link>
                <a
                  href={`https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodeURIComponent(
                    `Hi, I want to ask about Mudet products from ${stockistConfig.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-xs"
                >
                  Message on WhatsApp
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
