import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { Minus, Plus, Send } from "lucide-react";
import { useFormik } from "formik";
import productDetails from "../lib/productDetails";
import { purchaseFormSchema } from "../lib/validationSchemas";
import stockistConfig from "../lib/stockistConfig";

const makeOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

const PurchasePage: React.FC = () => {
  const initialQty = useMemo(() => {
    const raw = sessionStorage.getItem("productCount");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, []);

  const { products, defaultProduct } = productDetails;
  const [selectedProductId, setSelectedProductId] = useState<string>(
    sessionStorage.getItem("selectedProductId") || defaultProduct.id,
  );
  const selectedProduct =
    products.find((item) => item.id === selectedProductId) || defaultProduct;

  const [qty, setQty] = useState<number>(initialQty);
  const [orderId, setOrderId] = useState<string>("");

  const grossNairaAmount = useMemo(
    () => selectedProduct.price * qty,
    [selectedProduct.price, qty],
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: purchaseFormSchema,
    onSubmit: (values) => {
      const orderData = {
        orderId: orderId || makeOrderId(),
        productName: selectedProduct.name,
        unitPrice: selectedProduct.price,
        qty,
        totalAmount: grossNairaAmount,
        ...values,
      };

      const message = `
*📦 MUDET ORDER CONFIRMATION 📦*

*Order ID:* ${orderData.orderId}

*Customer Details:*
Name: ${orderData.fullName}
Email: ${orderData.email}
Phone: ${orderData.phone}
Delivery Address: ${orderData.address}

*Product Details:*
Product: ${orderData.productName}
Unit Price: ₦${orderData.unitPrice.toLocaleString()}
Quantity: ${orderData.qty}
*Total: ₦${orderData.totalAmount.toLocaleString()}*

*📍 PAYMENT DETAILS 📍*
Account Number: ${stockistConfig.bank.accountNumber}
Account Name: ${stockistConfig.bank.accountName}
Bank: ${stockistConfig.bank.bankName}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      const orderBackup = {
        ...orderData,
        dateISO: new Date().toISOString(),
        status: "sent_to_whatsapp",
      };
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderBackup));
      toast.success("Opening WhatsApp with your order details...");
    },
  });

  useEffect(() => {
    sessionStorage.setItem("productCount", String(qty));
  }, [qty]);

  useEffect(() => {
    setOrderId(makeOrderId());
    sessionStorage.setItem("selectedProductId", selectedProductId);
  }, [selectedProductId]);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  return (
    <section className="mt-6 mb-16 max-w-3xl mx-auto">
      <div className="surface-card p-6 sm:p-8 rounded-md">
        <div className="border-b border-secondary-dark/70 pb-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
            Place Your Product Order
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
            Choose your extract, adjust quantity, and complete order via WhatsApp.
          </p>
        </div>

        {/* Step 1: Product Selection */}
        <div className="mt-6">
          <label className="text-xs font-bold text-neutral-dark block mb-2">
            Select Product
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((product) => {
              const isSelected = selectedProductId === product.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedProductId(product.id)}
                  className={[
                    "flex items-center gap-3 p-3 rounded-md border text-left transition cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary-soft/50 ring-1 ring-primary"
                      : "border-secondary-dark/80 bg-white hover:bg-secondary/40",
                  ].join(" ")}
                >
                  <div className="h-14 w-14 shrink-0 rounded-md bg-white border border-secondary-dark/60 p-1 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-neutral-dark truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-bold text-primary mt-0.5">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Quantity & Amount */}
        <div className="mt-6 rounded-md border border-secondary-dark/80 bg-secondary/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-neutral-dark">Quantity</p>
              <p className="text-[11px] text-neutral-soft">
                ₦{selectedProduct.price.toLocaleString()} per bottle
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary-dark/80 bg-white text-neutral-dark shadow-xs hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="flex h-9 min-w-12 items-center justify-center rounded-md border border-secondary-dark/80 bg-white px-3 text-sm font-bold text-primary">
                {qty}
              </div>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary-dark/80 bg-white text-neutral-dark shadow-xs hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-secondary-dark/60 flex items-center justify-between">
            <span className="text-xs text-neutral-soft font-medium">
              Order Total:
            </span>
            <span className="font-display text-lg font-bold text-primary">
              ₦{grossNairaAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Step 3: Contact Form */}
        <form onSubmit={formik.handleSubmit} className="mt-6 grid gap-5">
          <div>
            <label className="text-xs font-bold text-neutral-dark block mb-2">
              Customer Information
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-[11px] font-bold text-neutral-dark">
                  Full name
                </label>
                <input
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your full name"
                  className="field-control"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-dark">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="yourname@example.com"
                  className="field-control"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-dark">
                  Mobile / WhatsApp number
                </label>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={stockistConfig.phone.display}
                  className="field-control"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-dark">
                  Delivery address
                </label>
                <input
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Street, City, State"
                  className="field-control"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">
                    {formik.errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bank Payment */}
          <div className="rounded-md border border-secondary-dark/80 bg-white p-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-dark mb-3">
              Stockist Bank Details
            </h3>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <div className="rounded-md border border-secondary-dark/70 bg-secondary/30 p-3">
                <p className="text-[10px] text-neutral-soft font-semibold">Bank</p>
                <p className="font-display text-xs font-bold text-neutral-dark mt-0.5">
                  {stockistConfig.bank.bankName}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(stockistConfig.bank.bankName, "Bank name")}
                  className="mt-2 flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <HiOutlineClipboardCopy className="h-3.5 w-3.5" />
                  Copy Bank
                </button>
              </div>

              <div className="rounded-md border border-secondary-dark/70 bg-secondary/30 p-3">
                <p className="text-[10px] text-neutral-soft font-semibold">Account Number</p>
                <p className="font-display text-xs font-bold text-neutral-dark mt-0.5 tracking-wider">
                  {stockistConfig.bank.accountNumber}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(stockistConfig.bank.accountNumber, "Account number")
                  }
                  className="mt-2 flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <HiOutlineClipboardCopy className="h-3.5 w-3.5" />
                  Copy Account
                </button>
              </div>

              <div className="rounded-md border border-secondary-dark/70 bg-secondary/30 p-3">
                <p className="text-[10px] text-neutral-soft font-semibold">Account Name</p>
                <p className="font-display text-xs font-bold text-neutral-dark mt-0.5 truncate">
                  {stockistConfig.bank.accountName}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(stockistConfig.bank.accountName, "Account name")
                  }
                  className="mt-2 flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <HiOutlineClipboardCopy className="h-3.5 w-3.5" />
                  Copy Name
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="btn-primary w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            Send Order to WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default PurchasePage;
