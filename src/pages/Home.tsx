import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import productDetails from "../lib/productDetails";
import { formatPriceByCurrency } from "../utilities/formatterUtility";
import type { HowItWorksCardProps } from "../lib/interfaces";
import HowItWorksCard from "../components/common/HowItWorkCard";
import { FaDownload } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { FaBoxOpen, FaHeartbeat, FaSitemap } from "react-icons/fa";
import ProductDetailsModal from "../components/Modals/ProductDetailsModal";
import stockistConfig from "../lib/stockistConfig";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products } = productDetails;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

  const handleOrder = (productId: string) => {
    sessionStorage.setItem("selectedProductId", productId);
    navigate("/purchase-product");
  };

  const howItWorks: HowItWorksCardProps[] = [
    {
      name: "Choose an Entry Package",
      id: "1",
      icon: <FaBoxOpen />,
      detail:
        "Select from 7 business packages to receive genuine Mudet extracts and activate your distributor account.",
    },
    {
      name: "Daily Herbal Wellness",
      id: "2",
      icon: <FaHeartbeat />,
      detail:
        "Use Cinnamon & Armor herbal formulas to support digestion, immunity, stamina, and body balance.",
    },
    {
      name: "Grow & Earn Commissions",
      id: "3",
      icon: <FaSitemap />,
      detail:
        "Introduce partners to Mudet, build your team, and unlock retail profits and sponsor bonuses.",
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-6">
      {/* ── HERO SECTION: Centered layout title and subtext concept ── */}
      <section className="pt-8 pb-4 text-center max-w-3xl mx-auto">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Centered Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-neutral-dark tracking-tight">
            Mudet Herbal Health Products &amp; Network
          </h1>

          {/* Centered Subtext */}
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-neutral-soft">
            Get authentic Mudet herbal extracts from{" "}
            <strong className="text-neutral-dark font-bold">
              {stockistConfig.name}
            </strong>
            . Enjoy direct WhatsApp ordering, fast delivery, and straightforward
            stockist registration packages.
          </p>

          {/* Centered Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleOrder(products[0].id)}
              className="btn-primary w-full sm:w-auto gap-2"
            >
              Shop Products
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn-secondary w-full sm:w-auto gap-2"
            >
              <TiUserAdd className="h-4 w-4 text-primary" />
              Register as Stockist
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <motion.section {...fadeUp} className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            Featured Products
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Order genuine Mudet herbal extracts at direct stockist pricing.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-md border border-secondary-dark/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full rounded-md bg-secondary/60 p-4 flex items-center justify-center border border-secondary-dark/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-neutral-dark">
                    {product.name}
                  </h3>
                  <span className="shrink-0 text-sm font-bold text-primary bg-primary-soft/60 px-2.5 py-1 rounded-md">
                    {formatPriceByCurrency(product.price, "NGN")}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-soft">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-secondary-dark/60">
                <button
                  type="button"
                  onClick={() => handleOrder(product.id)}
                  className="btn-primary flex-1 gap-1.5 text-xs"
                >
                  Order Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDetailsModalOpen(true);
                  }}
                  className="btn-secondary flex-1 text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── HOW IT WORKS ── */}
      <motion.section {...fadeUp} className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            How It Works
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Simple steps to order products and register with {stockistConfig.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {howItWorks.map((h) => (
            <HowItWorksCard
              key={h.id}
              name={h.name}
              id={h.id}
              detail={h.detail}
              icon={h.icon}
            />
          ))}
        </div>
      </motion.section>

      {/* ── COMPENSATION PLAN / WEALTH BANNER ── */}
      <motion.section {...fadeUp}>
        <div className="rounded-md bg-neutral-dark p-6 sm:p-8 text-white shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold">
            Mudet Business &amp; Stockist Opportunities
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/75">
            Join as a stockist or network marketer to access retail margins,
            direct referral bonuses, and store sponsor rewards.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn-primary bg-white text-primary hover:bg-secondary text-xs"
            >
              <TiUserAdd className="h-4 w-4" />
              Register as Stockist
            </button>
            <a
              download={true}
              href="/complan.pdf"
              className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15 text-xs"
            >
              <FaDownload className="h-3.5 w-3.5" />
              Download Compensation Plan
            </a>
          </div>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3 pt-6 border-t border-white/10">
            {[
              "Multiple Streams of Income",
              "25% Retail Profit Margins",
              "Direct Referral Bonuses",
              "Indirect Referral Earnings",
              "Flexible Startup Packages",
              "Rank Awards and Incentives",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs font-medium text-white/90"
              >
                <Check className="h-3.5 w-3.5 text-primary-soft shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FAQ SECTION ── */}
      <motion.section {...fadeUp} className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Quick answers regarding product orders and stockist registration.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Are all products genuine?",
              "Yes, all extracts are 100% authentic Mudet herbal solutions supplied directly through certified channels.",
            ],
            [
              "How do I complete registration?",
              "Select your package on the Register page, transfer payment to the stockist bank account, and complete via WhatsApp for verification.",
            ],
            [
              "What products are available?",
              "We stock Cinnamon Herbal Extract and ARMOR Herbal Extract with nationwide delivery.",
            ],
            [
              "How is delivery handled?",
              "Orders are processed immediately after WhatsApp verification and dispatched to your city or address.",
            ],
          ].map(([question, answer]) => (
            <div
              key={question}
              className="rounded-md border border-secondary-dark/80 bg-white p-4 sm:p-5 shadow-xs"
            >
              <div className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold text-neutral-dark text-sm">
                    {question}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-neutral-soft">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── BOTTOM CTA BANNER ── */}
      <motion.section
        {...fadeUp}
        className="rounded-md border border-secondary-dark/80 bg-secondary/50 p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
              Ready to Order or Have Questions?
            </h2>
            <p className="mt-1 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-soft">
              Start your order online or contact {stockistConfig.name} on WhatsApp
              for direct guidance and support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleOrder(products[0].id)}
              className="btn-primary text-xs"
            >
              Start an Order
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="btn-secondary text-xs"
            >
              Contact Stockist
            </button>
          </div>
        </div>
      </motion.section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        product={selectedProduct}
        onClose={() => setIsDetailsModalOpen(false)}
        onOrder={handleOrder}
      />
    </div>
  );
};

export default Home;
