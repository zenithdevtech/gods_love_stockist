import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const faqs = [
    {
      question: "Are all products original Mudet herbal extracts?",
      answer:
        "Yes, all extracts are 100% authentic, sealed Mudet herbal formulas supplied directly through certified channels.",
    },
    {
      question: "How do I place an order for products?",
      answer:
        "Select your extract, click 'Order Now' to enter your delivery details, transfer to the stockist bank account, and confirm via WhatsApp for rapid verification.",
    },
    {
      question: "How do I complete stockist or networker registration?",
      answer: `Go to the Register page, choose from our 7 startup packages (Lunch to Legend), fill in your personal and commission bank information, and submit via WhatsApp under sponsor ${stockistConfig.sponsorUsername}.`,
    },
    {
      question: "How fast is payment verification and delivery?",
      answer:
        "Orders and registrations are verified within minutes upon receipt submission on WhatsApp. Delivery is dispatched nationwide to your doorstep or pickup city.",
    },
    {
      question: "What payment details should I use?",
      answer: `Payments are made directly to our official stockist bank account: ${stockistConfig.bank.bankName}, Account: ${stockistConfig.bank.accountNumber} (${stockistConfig.bank.accountName}).`,
    },
    {
      question: "Can I upgrade my registration package later?",
      answer:
        "Yes, you can begin with an entry package like Lunch or Ignite and upgrade to higher packages (Momentum, Power, Scale, Turbo, Legend) as your business grows.",
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-6">
      {/* ── 1. HERO SECTION ── */}
      <section className="pt-8 pb-4 text-center max-w-3xl mx-auto">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-neutral-dark tracking-tight">
            Mudet Herbal Health Products &amp; Network
          </h1>

          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-neutral-soft">
            Get authentic Mudet herbal extracts from{" "}
            <strong className="text-neutral-dark font-bold">
              {stockistConfig.name}
            </strong>
            . Enjoy direct WhatsApp ordering, fast delivery, and straightforward
            stockist registration packages.
          </p>

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

      {/* ── 2. HOW IT WORKS ── */}
      <motion.section {...fadeUp} className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            How It Works
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Simple steps to order products and register with{" "}
            {stockistConfig.name}.
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

      {/* ── 3. FEATURED PRODUCTS ── */}
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

      {/* ── 4. COMPENSATION & EARNING MODEL (Twisted Fresh Design) ── */}
      <motion.section {...fadeUp} className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
              Mudet Compensation &amp; Earning Model
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-soft max-w-xl">
              A transparent, high-yield structure designed for personal sales
              margins, direct sponsor rewards, and long-term residual growth.
            </p>
          </div>
        </div>

        {/* 4 Earning Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="rounded-md border border-secondary-dark/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary mb-3">
                <Percent className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-neutral-dark">
                25% Retail Margin
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-soft">
                Keep upfront profit on every single bottle of Cinnamon &amp;
                ARMOR herbal extract retailed directly.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-secondary-dark/50 text-[11px] font-bold text-primary">
              Instant Sales Profit
            </div>
          </div>

          <div className="rounded-md border border-secondary-dark/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-neutral-dark">
                Direct Referral Bonuses
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-soft">
                Earn immediate cash commissions each time a new distributor
                enrolls with your sponsor username.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-secondary-dark/50 text-[11px] font-bold text-primary">
              Sponsor Cash Commissions
            </div>
          </div>

          <div className="rounded-md border border-secondary-dark/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary mb-3">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-neutral-dark">
                Indirect Leverage &amp; PV
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-soft">
                Accumulate Point Value (PV) and earn passive overrides across
                downline purchases and team activations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-secondary-dark/50 text-[11px] font-bold text-primary">
              Passive Team Overrides
            </div>
          </div>

          <div className="rounded-md border border-secondary-dark/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-neutral-dark">
                Leadership Rank Awards
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-soft">
                Unlock milestone executive awards including paid luxury travel
                trips, cash allowances, and brand new cars.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-secondary-dark/50 text-[11px] font-bold text-accent">
              Luxury Rank Incentives
            </div>
          </div>
        </div>

        {/* Action & PDF Download Strip */}
        <div className="rounded-md border border-secondary-dark/80 bg-secondary/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-sm font-bold text-neutral-dark">
              Want the full compensation breakdown?
            </h4>
            <p className="text-xs text-neutral-soft mt-0.5">
              Review full point values, payout stages, and rank qualifications
              in the official guide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn-primary text-xs min-h-9 px-4 py-2"
            >
              <TiUserAdd className="h-3.5 w-3.5" />
              Register as Stockist
            </button>
            <a
              download={true}
              href="/complan.pdf"
              className="btn-secondary text-xs min-h-9 px-4 py-2"
            >
              <FaDownload className="h-3 w-3" />
              Download Plan (PDF)
            </a>
          </div>
        </div>
      </motion.section>

      {/* ── 5. FAQ SECTION (Accordion with #faqs anchor) ── */}
      <motion.section
        {...fadeUp}
        id="faqs"
        className="scroll-mt-24 flex flex-col gap-6"
      >
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Click on any question below to view answers regarding products and
            registration.
          </p>
        </div>

        <div className="rounded-md border border-secondary-dark/80 bg-white divide-y divide-secondary-dark/70 shadow-xs overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={faq.question} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left transition hover:bg-secondary/40 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-neutral-dark text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-soft transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden bg-[#fafcfa]"
                    >
                      <p className="px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed text-neutral-soft border-t border-secondary-dark/40">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ── 6. BOTTOM CTA BANNER ── */}
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
              Start your order online or contact {stockistConfig.name} on
              WhatsApp for direct guidance and support.
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
