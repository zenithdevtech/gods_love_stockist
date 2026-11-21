import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { useFormik } from "formik";
import { affiliateFormSchema } from "../lib/validationSchemas";
import stockistConfig from "../lib/stockistConfig";

const packages = [
  { id: "lunch", name: "Lunch", price: 14000, pv: 10, products: "1 bottle" },
  { id: "ignite", name: "Ignite", price: 28000, pv: 30, products: "2 bottles" },
  {
    id: "momentum",
    name: "Momentum",
    price: 70000,
    pv: 80,
    products: "5 bottles",
  },
  {
    id: "power",
    name: "Power",
    price: 182000,
    pv: 200,
    products: "13 bottles",
  },
  {
    id: "scale",
    name: "Scale",
    price: 406000,
    pv: 500,
    products: "29 bottles",
  },
  {
    id: "turbo",
    name: "Turbo",
    price: 700000,
    pv: 700,
    products: "50 bottles",
  },
  {
    id: "legend",
    name: "Legend",
    price: 1050000,
    pv: 1000,
    products: "75 bottles",
  },
];

const Affiliate: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0].id);
  const [submitted, setSubmitted] = useState(false);

  const selectedPackageDetails =
    packages.find((pkg) => pkg.id === selectedPackage) || packages[0];

  const formik = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      city: "",
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
    validationSchema: affiliateFormSchema,
    onSubmit: (values) => {
      const message = `*📌 MUDET STOCKIST REGISTRATION 📌*

*═══════════════════════════════*
*SPONSOR & PACKAGE INFORMATION*
*═══════════════════════════════*
Sponsor Username: ${stockistConfig.sponsorUsername}
Reg. Package: ${selectedPackageDetails.name}
Price: NGN ${selectedPackageDetails.price.toLocaleString()}
PV Points: ${selectedPackageDetails.pv}
Products: ${selectedPackageDetails.products}

*═══════════════════════════════*
*NEW MEMBER DETAILS*
*═══════════════════════════════*
Username: ${values.userName}
Full Name: ${values.fullName}
Gender: ${values.gender}
Date Of Birth: ${values.dob}
Active E-mail: ${values.email}
Mobile No: ${values.phone}
Pick up City: ${values.city}

*═══════════════════════════════*
*ACCOUNT DETAILS*
*═══════════════════════════════*
Account No: ${values.accountNumber}
Account Name: ${values.accountName}
Bank Name: ${values.bankName}
`.trim();

      const registration = {
        sponsor: stockistConfig.sponsorUsername,
        package: selectedPackageDetails.name,
        ...values,
        paymentInfo: stockistConfig.bank,
        dateISO: new Date().toISOString(),
        status: "sent_to_whatsapp",
      };
      sessionStorage.setItem("mudetRegistration", JSON.stringify(registration));

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
      toast.success("Opening WhatsApp with your registration details.");
    },
  });

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
      <motion.div
        className="surface-card p-6 sm:p-8 rounded-md"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {submitted ? (
          <div className="grid gap-4 py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
              <Check className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-dark">
                Registration Prepared
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-soft max-w-md mx-auto">
                Your details have been prepared for WhatsApp. Please send your
                payment receipt to {stockistConfig.name} to complete activation.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary text-xs"
              >
                Submit Another Registration
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="border-b border-secondary-dark/70 pb-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
                Stockist Registration
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
                Select your startup package and complete your details under
                sponsor <strong className="text-neutral-dark">{stockistConfig.sponsorUsername}</strong>.
              </p>
            </div>

            <form className="grid gap-6" onSubmit={formik.handleSubmit}>
              {/* Step 1: Package Selection */}
              <div>
                <label className="text-xs font-bold text-neutral-dark block mb-2">
                  Select Package
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={[
                          "p-3 rounded-md border text-left transition cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary-soft/50 ring-1 ring-primary"
                            : "border-secondary-dark/80 bg-white hover:bg-secondary/40",
                        ].join(" ")}
                      >
                        <p className="font-display text-sm font-bold text-neutral-dark">
                          {pkg.name}
                        </p>
                        <p className="text-xs font-bold text-primary mt-0.5">
                          ₦{pkg.price.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-neutral-soft mt-1">
                          {pkg.pv} PV • {pkg.products}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Summary */}
              <div className="rounded-md border border-secondary-dark/80 bg-secondary/60 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-neutral-dark">
                    {selectedPackageDetails.name} Package
                  </h3>
                  <p className="text-xs text-neutral-soft mt-0.5">
                    Includes {selectedPackageDetails.products}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-base font-bold text-primary">
                    ₦{selectedPackageDetails.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-soft font-medium">
                    {selectedPackageDetails.pv} PV
                  </p>
                </div>
              </div>

              {/* Step 2: Member Info */}
              <div>
                <label className="text-xs font-bold text-neutral-dark block mb-2">
                  Registration Information
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["fullName", "Full name", "Your full name"],
                    ["userName", "Username", "Desired username"],
                    ["gender", "Gender", "Male / Female"],
                    ["dob", "Date of birth", ""],
                    ["email", "Email address", "yourname@example.com"],
                    ["phone", "Mobile number", stockistConfig.phone.display],
                    ["city", "Pickup City / State", "e.g. Lagos, Abuja"],
                    ["accountNumber", "Account number (For Commissions)", "10-digit NUBAN number"],
                    ["accountName", "Account name", "Bank account name"],
                    ["bankName", "Bank name", "Your bank institution"],
                  ].map(([key, label, placeholder]) => (
                    <div key={key as string}>
                      <label className="text-[11px] font-bold text-neutral-dark">
                        {label}
                      </label>
                      <input
                        type={
                          key === "dob"
                            ? "date"
                            : key === "email"
                              ? "email"
                              : "text"
                        }
                        name={key as string}
                        value={formik.values[key as keyof typeof formik.values]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder as string}
                        className="field-control"
                      />
                      {formik.touched[key as keyof typeof formik.touched] &&
                        formik.errors[key as keyof typeof formik.errors] && (
                          <p className="mt-1 text-[11px] text-red-500 font-medium">
                            {
                              formik.errors[
                                key as keyof typeof formik.errors
                              ] as string
                            }
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Bank Details */}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="btn-primary w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                Complete Registration via WhatsApp
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Affiliate;
