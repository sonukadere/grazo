import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { whatsappNumber, phoneNumber, email, location } from "../../data/navigation";
import { submitBooking } from "../../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "Wedding Reception",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.phone.trim()) {
      errs.phone = "Please enter your phone number.";
    } else if (!/^[0-9+ -]{8,15}$/.test(form.phone.trim())) {
      errs.phone = "Please enter a valid phone number (e.g. +91 98765 43210).";
    }
    if (!form.eventType) errs.eventType = "Please select an event type.";
    if (!form.eventDate) errs.eventDate = "Please choose your prospective event date.";
    if (!form.guestCount) {
      errs.guestCount = "Please enter estimated guest count.";
    } else if (parseInt(form.guestCount, 10) < 10) {
      errs.guestCount = "Guest count should be at least 10.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await submitBooking({
        name: form.name,
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate,
        guestCount: parseInt(form.guestCount, 10) || 0,
        message: form.message,
      });
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        eventType: "Wedding Reception",
        eventDate: "",
        guestCount: "",
        message: "",
      });
    } catch {
      alert("Failed to submit inquiry. Please try again or reach out on WhatsApp directly.");
    } finally {
      setSending(false);
    }
  };

  // Pre-fill WhatsApp message with form details for instant quotes
  const buildWhatsAppQuoteLink = () => {
    const text = `Hi Grazo Bites! I would like to enquire about a luxury vegetarian catering quote:
• Name: ${form.name || "Client"}
• Phone: ${form.phone || "-"}
• Event: ${form.eventType || "Wedding"}
• Date: ${form.eventDate || "-"}
• Guests: ${form.guestCount || "-"}
• Message: ${form.message || "Please share sample packages."}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Get a Quote"
          title="Begin Planning Your Extraordinary Event"
          description="Tell us about your upcoming celebration in Indore or across Madhya Pradesh. Our culinary directors will prepare a bespoke proposal tailored to your vision."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Quote Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A24D]/25 shadow-lg"
          >
            <div className="mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1C1C1C]">
                Request a Customised Proposal
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5E5E] mt-1">
                Fill in the details below and we will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <FaCheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-heading font-bold text-2xl text-emerald-900 mb-2">
                  Inquiry Received with Thanks!
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto mb-6">
                  Our catering director is reviewing your event specifications and will contact you promptly to begin crafting your bespoke menu.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={buildWhatsAppQuoteLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs uppercase tracking-wider py-3 px-6"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Speed Up via WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary text-xs uppercase tracking-wider py-3 px-6"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Your Full Name <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.name ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Phone Number <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.phone ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Event Type */}
                  <div>
                    <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Event Type <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/40 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30"
                    >
                      <option>Wedding Reception</option>
                      <option>Haldi Ceremony</option>
                      <option>Mehendi Soirée</option>
                      <option>Sangeet Night</option>
                      <option>Corporate Gala</option>
                      <option>Milestone Celebration</option>
                      <option>Bespoke Grazing Table</option>
                      <option>Other Special Occasion</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="eventDate" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Event Date <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.eventDate ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.eventDate && <p className="text-xs text-red-500 mt-1">{errors.eventDate}</p>}
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label htmlFor="guestCount" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Estimated Guests <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <input
                      id="guestCount"
                      type="number"
                      name="guestCount"
                      min="10"
                      value={form.guestCount}
                      onChange={handleChange}
                      placeholder="e.g. 200"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.guestCount ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.guestCount && <p className="text-xs text-red-500 mt-1">{errors.guestCount}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Event Details & Culinary Preferences
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your venue, special dishes desired, dietary preferences (Jain, Vegan, Gluten-free)..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/40 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 resize-none"
                  />
                </div>

                {/* Buttons: Submit & Direct WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary flex-1 py-4 uppercase tracking-wider font-semibold text-xs sm:text-sm"
                  >
                    {sending ? "Submitting Inquiry..." : "Submit Quote Request"}
                  </button>

                  <a
                    href={buildWhatsAppQuoteLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary flex items-center justify-center gap-2 py-4 px-6 text-xs sm:text-sm uppercase tracking-wider font-semibold"
                  >
                    <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                    <span>Quote via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Details & Google Map Embed (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A24D]/25 shadow-lg">
              <h3 className="font-heading font-bold text-xl text-[#1C1C1C] mb-6">
                Direct Contact & Tasting Room
              </h3>

              <div className="space-y-5">
                <a
                  href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#5A1A1F]/10 text-[#5A1A1F] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5A1A1F] group-hover:text-white transition-colors">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5E5E5E] font-medium uppercase tracking-wider">
                      Call Us Directly
                    </p>
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5">
                      {phoneNumber}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#5A1A1F]/10 text-[#5A1A1F] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5A1A1F] group-hover:text-white transition-colors">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5E5E5E] font-medium uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5 truncate max-w-[220px] sm:max-w-none">
                      {email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-[#C9A24D]/15 text-[#C9A24D] flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5E5E5E] font-medium uppercase tracking-wider">
                      Base Location
                    </p>
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5">
                      {location}
                    </p>
                    <p className="text-xs text-[#5E5E5E] mt-0.5">
                      Catering across Indore, Ujjain, Bhopal, Dewas & all MP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl p-3 border border-[#C9A24D]/25 shadow-lg overflow-hidden">
              <div className="w-full h-56 rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  title="Grazo Bites Indore Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21679659767!2d75.78855239453126!3d22.724228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc1c1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIndore%2C+Madhya+Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
