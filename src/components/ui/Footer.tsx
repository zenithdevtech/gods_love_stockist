import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import assets from "../../assets/assets";
import stockistConfig from "../../lib/stockistConfig";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-secondary-dark/60 bg-neutral-dark text-white">
      <section className="app-container py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                <img
                  src={assets.logo2}
                  alt="Mudet"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold">{stockistConfig.name}</p>
                <p className="text-[10px] text-white/60">
                  {stockistConfig.tagline}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/70">
              Authentic Mudet herbal extracts and distributor registration support
              through {stockistConfig.name}.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/purchase-product"
                className="btn-primary bg-white text-primary hover:bg-secondary text-xs min-h-9 px-3.5 py-1.5"
              >
                Buy Products
              </Link>
              <Link
                to="/register"
                className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15 text-xs min-h-9 px-3.5 py-1.5"
              >
                Register as Stockist
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                Navigation
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {[
                  ["Home", "/"],
                  ["Register", "/register"],
                  ["Contact", "/contact"],
                ].map(([label, path]) => (
                  <Link
                    key={label}
                    to={path}
                    className="text-xs text-white/70 hover:text-white transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                Contact
              </p>
              <div className="mt-3 flex flex-col gap-2.5 text-xs text-white/70">
                <a
                  href={`tel:${stockistConfig.phone.tel}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone className="h-3.5 w-3.5 text-primary-soft shrink-0" />
                  <span>{stockistConfig.phone.display}</span>
                </a>
                <a
                  href={`mailto:${stockistConfig.email}`}
                  className="flex items-center gap-2 hover:text-white transition truncate"
                >
                  <Mail className="h-3.5 w-3.5 text-primary-soft shrink-0" />
                  <span className="truncate">{stockistConfig.email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary-soft shrink-0" />
                  <span>{stockistConfig.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {stockistConfig.name}. All rights reserved.</p>
          <a
            href="https://zenithdevtech.name.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Built by Zenith Dev
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
