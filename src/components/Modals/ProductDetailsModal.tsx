import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ArrowRight, VideoOff } from "lucide-react";
import assets from "../../assets/assets";
import { formatPriceByCurrency } from "../../utilities/formatterUtility";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  more_details: string;
};

type ProductDetailsModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrder: (productId: string) => void;
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrder,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Map product id to video demo if available in assets
  const getDemoVideo = (id: string) => {
    if (id === "cinnamon") {
      return assets.cinamonDemo;
    }
    return null;
  };

  const videoSrc = getDemoVideo(product.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Product Details: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="relative z-10 w-full max-w-4xl rounded-md bg-white shadow-xl max-h-[90vh] overflow-y-auto styled-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 sticky top-0 bg-white z-20">
          <div>
            <h3 className="font-display text-lg font-bold text-neutral-dark">
              {product.name}
            </h3>
            <span className="inline-block mt-0.5 rounded-md bg-primary-soft/60 px-2.5 py-0.5 text-xs font-bold text-primary">
              {formatPriceByCurrency(product.price, "NGN")}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-black/70 hover:bg-black/5 transition-colors"
            aria-label="Close modal"
            title="Close"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Product Info */}
          <div className="flex flex-col gap-6">
            <div className="w-full overflow-hidden rounded-md border border-secondary-dark/60 bg-secondary/50 p-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[250px] object-contain hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-extrabold text-neutral-dark text-base border-b border-black/5 pb-1">
                Overview
              </h4>
              <p className="text-sm text-neutral-soft leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-extrabold text-neutral-dark text-base border-b border-black/5 pb-1">
                More Details
              </h4>
              <p className="text-sm text-neutral-soft leading-relaxed">
                {product.more_details}
              </p>
            </div>
          </div>

          {/* Right Column: Demo Video & Action */}
          <div className="flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-3">
              <h4 className="font-extrabold text-neutral-dark text-base border-b border-black/5 pb-1">
                Video Demonstration
              </h4>

              {videoSrc ? (
                <div className="overflow-hidden rounded-xl border border-black/10 bg-black shadow-lg">
                  <video
                    src={videoSrc}
                    controls
                    preload="metadata"
                    controlsList="nodownload"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-neutral-soft/30 bg-secondary/50 p-8 text-center min-h-[220px]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent mb-3">
                    <VideoOff className="h-6 w-6" />
                  </div>
                  <h5 className="font-bold text-neutral-dark text-sm">
                    Demo video not available
                  </h5>
                  <p className="text-xs text-neutral-soft mt-2 max-w-[250px] leading-relaxed">
                    A demonstration video is currently not available for this
                    formula.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-black/5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onOrder(product.id);
                  onClose();
                }}
                className="btn-primary w-full gap-2 cursor-pointer"
              >
                Order This Product
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
