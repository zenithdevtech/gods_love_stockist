import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { useFormik } from "formik";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { contactFormSchema } from "../lib/validationSchemas";
import stockistConfig from "../lib/stockistConfig";

const Contact: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: (values) => {
      const text =
        `Hello ${stockistConfig.name}, my name is ${values.fullName}.\n\n` +
        `Email: ${values.email}\n` +
        `Subject: ${values.subject || "General enquiry"}\n\n` +
        `Message:\n${values.message}`;

      window.open(
        `https://wa.me/${stockistConfig.phone.whatsapp}?text=${encodeURIComponent(text)}`,
        "_blank",
      );
      toast.success("Opening WhatsApp with your message...");
      formik.resetForm();
    },
  });

  return (
    <section className="mt-6 mb-16 max-w-4xl mx-auto">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Contact Info */}
        <div className="surface-card p-6 rounded-md flex flex-col justify-between">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-dark">
              Contact {stockistConfig.name}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-soft">
              Direct stockist support for orders, payment verification, and registration.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/${stockistConfig.phone.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-md border border-secondary-dark/70 bg-secondary/30 hover:border-primary/40 transition"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#25D366]/15 text-[#25D366]">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-soft font-semibold">WhatsApp</p>
                  <p className="font-display text-xs font-bold text-neutral-dark">
                    {stockistConfig.phone.display}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${stockistConfig.phone.tel}`}
                className="flex items-center gap-3 p-3 rounded-md border border-secondary-dark/70 bg-secondary/30 hover:border-primary/40 transition"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-soft font-semibold">Phone</p>
                  <p className="font-display text-xs font-bold text-neutral-dark">
                    {stockistConfig.phone.display}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${stockistConfig.email}`}
                className="flex items-center gap-3 p-3 rounded-md border border-secondary-dark/70 bg-secondary/30 hover:border-primary/40 transition"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-soft font-semibold">Email</p>
                  <p className="font-display text-xs font-bold text-neutral-dark truncate">
                    {stockistConfig.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-md border border-secondary-dark/70 bg-secondary/30">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-soft font-semibold">Location</p>
                  <p className="font-display text-xs font-bold text-neutral-dark">
                    {stockistConfig.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="surface-card p-6 rounded-md">
          <h3 className="font-display text-lg font-bold text-neutral-dark">
            Send an Inquiry
          </h3>
          <p className="mt-1 text-xs text-neutral-soft">
            Message will open in WhatsApp directly with {stockistConfig.name}.
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-5 grid gap-4">
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
                  placeholder="Your name"
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
                  placeholder="name@example.com"
                  className="field-control"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-dark">
                Subject
              </label>
              <input
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Product order, payment, or registration"
                className="field-control"
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">
                  {formik.errors.subject}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-dark">
                Message
              </label>
              <textarea
                rows={5}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write your message..."
                className="field-control resize-none"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="btn-primary w-full gap-2 py-2.5 text-xs sm:text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-3.5 w-3.5" />
              Continue to WhatsApp Chat
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
