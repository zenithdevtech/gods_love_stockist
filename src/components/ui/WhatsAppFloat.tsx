import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import stockistConfig from "../../lib/stockistConfig";

const WhatsAppFloat: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodeURIComponent(
    `Hi there, I'd like to order Mudet products from ${stockistConfig.name}.`
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed z-60 bottom-5 right-5 md:bottom-6 md:right-6 group"
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.span
            className="absolute -inset-1 rounded-md blur-md bg-primary/20 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          <motion.span
            className={[
              "relative",
              "w-11 h-11 sm:w-12 sm:h-12",
              "rounded-md flex items-center justify-center",
              "bg-white",
              "border border-secondary-dark/80",
              "shadow-sm",
            ].join(" ")}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="absolute inset-0 rounded-md ring-1 ring-primary/10" />

            <FaWhatsapp className="relative text-[#25D366] text-xl" />
          </motion.span>

          <motion.span
            className={[
              "hidden md:block",
              "absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2",
              "px-3 py-1.5 rounded-md",
              "text-xs font-semibold text-neutral-dark",
              "bg-white border border-secondary-dark/80 shadow-xs",
              "whitespace-nowrap",
            ].join(" ")}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            Chat on WhatsApp
          </motion.span>

          <style>{`
            .group:hover > span:last-child {
              opacity: 1 !important;
              transform: translateY(-50%) translateX(0) !important;
            }
          `}</style>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
