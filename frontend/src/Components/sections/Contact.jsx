import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaInstagram, FaCalendarAlt } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { whatsappNumber, phoneNumber, email, location, instagramUrl } from "../../data/navigation";
import { submitBooking } from "../../api";

function isValidDDMMYYYY(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return false;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 2024 || year > 2100) return false;
  const dt = new Date(year, month - 1, day);
  return dt.getFullYear() === year && dt.getMonth() === month - 1 && dt.getDate() === day;
}

function ddmmyyyyToISO(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export default function Contact() {
  const datePickerRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "House Parties & Soirées",
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
      errs.phone = "Please enter a valid phone number (e.g. +91 62647 91823).";
    }
    if (!form.eventType) errs.eventType = "Please select an event type.";
    if (!form.eventDate.trim()) {
      errs.eventDate = "Please enter event date (dd/mm/yyyy).";
    } else if (!isValidDDMMYYYY(form.eventDate)) {
      errs.eventDate = "Use valid dd/mm/yyyy format (e.g. 25/12/2026).";
    }
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

  const handleDateTyping = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    setForm((prev) => ({ ...prev, eventDate: formatted }));
    if (errors.eventDate) {
      setErrors((prev) => ({ ...prev, eventDate: "" }));
    }
  };

  const handleNativeDatePick = (e) => {
    const iso = e.target.value; // yyyy-mm-dd
    if (!iso) return;
    const [year, month, day] = iso.split("-");
    setForm((prev) => ({ ...prev, eventDate: `${day}/${month}/${year}` }));
    if (errors.eventDate) {
      setErrors((prev) => ({ ...prev, eventDate: "" }));
    }
  };

  const openDatePicker = () => {
    const input = datePickerRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.click();
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
        eventType: "House Parties & Soirées",
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
• Event: ${form.eventType || "Small Party"}
• Date: ${form.eventDate || "-"}
• Guests: ${form.guestCount || "-"}
• Message: ${form.message || "Please share sample packages."}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#FFFDF9] border-t border-[#C9A24D]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Get a Quote"
          title="Begin Planning Your Extraordinary Event"
          description="Tell us about your upcoming celebration in Indore or across Madhya Pradesh. Our culinary directors will prepare a bespoke proposal tailored to your vision."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Quote Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#C9A24D]/25 shadow-lg flex flex-col"
          >
            <div className="mb-6">
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
              <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col gap-5">
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
                      placeholder="e.g. Sonu Kadere"
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
                      placeholder="+91 62647 91823"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.phone ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
                  {/* Event Type */}
                  <div className="sm:col-span-5">
                    <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Event Type <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/40 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30"
                    >
                      <option>House Parties & Soirées</option>
                      <option>Birthday Celebrations</option>
                      <option>Anniversary & Family Dinners</option>
                      <option>Kitty Parties & Hi-Tea</option>
                      <option>Corporate Meetups & Lunches</option>
                      <option>Festive & Private Gatherings</option>
                      <option>Bespoke Grazing Table</option>
                      <option>Other Small Party</option>
                    </select>
                  </div>

                  {/* Date (dd/mm/yyyy with integrated calendar picker) */}
                  <div className="sm:col-span-4">
                    <label htmlFor="eventDate" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Event Date <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="eventDate"
                        type="text"
                        name="eventDate"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="dd/mm/yyyy"
                        value={form.eventDate}
                        onChange={handleDateTyping}
                        className={`w-full pl-3.5 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                          errors.eventDate ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={openDatePicker}
                        aria-label="Open calendar date picker"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E5E5E] hover:text-[#5A1A1F] transition-colors cursor-pointer"
                      >
                        <FaCalendarAlt className="w-4 h-4" />
                      </button>
                      <input
                        ref={datePickerRef}
                        type="date"
                        tabIndex={-1}
                        aria-hidden="true"
                        value={ddmmyyyyToISO(form.eventDate)}
                        onChange={handleNativeDatePick}
                        className="sr-only"
                      />
                    </div>
                    {errors.eventDate && <p className="text-xs text-red-500 mt-1">{errors.eventDate}</p>}
                  </div>

                  {/* Guest Count */}
                  <div className="sm:col-span-3">
                    <label htmlFor="guestCount" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                      Guests <span className="text-[#5A1A1F]">*</span>
                    </label>
                    <input
                      id="guestCount"
                      type="number"
                      name="guestCount"
                      min="10"
                      value={form.guestCount}
                      onChange={handleChange}
                      placeholder="e.g. 40"
                      className={`w-full px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 ${
                        errors.guestCount ? "border-red-400 bg-red-50/20" : "border-gray-200 bg-[#FAF7F2]/40 focus:border-[#C9A24D]"
                      }`}
                    />
                    {errors.guestCount && <p className="text-xs text-red-500 mt-1">{errors.guestCount}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] mb-1.5">
                    Event Details & Culinary Preferences
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your venue, special dishes desired, dietary preferences (Jain, Vegan, Gluten-free)..."
                    className="w-full flex-1 min-h-[120px] px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/40 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 resize-none"
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
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A24D]/25 shadow-lg">
              <h3 className="font-heading font-bold text-xl text-[#1C1C1C] mb-5">
                Direct Contact & Tasting Room
              </h3>

              <div className="space-y-4">
                <a
                  href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#5A1A1F]/10 text-[#5A1A1F] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5A1A1F] group-hover:text-white transition-colors">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
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
                  <div className="min-w-0">
                    <p className="text-xs text-[#5E5E5E] font-medium uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5 break-all sm:break-normal">
                      {email}
                    </p>
                  </div>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#5A1A1F]/10 text-[#5A1A1F] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5A1A1F] group-hover:text-white transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#5E5E5E] font-medium uppercase tracking-wider">
                      Instagram
                    </p>
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-0.5">
                      @grazo_bites
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-[#C9A24D]/15 text-[#C9A24D] flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
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
            <div className="bg-white rounded-3xl p-3 border border-[#C9A24D]/25 shadow-lg overflow-hidden flex-1 flex flex-col">
              <div className="w-full flex-1 min-h-[240px] rounded-2xl overflow-hidden bg-gray-100 relative">
                <iframe
                  title="Grazo Bites Indore Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21679659767!2d75.78855239453126!3d22.724228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc1c1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIndore%2C+Madhya+Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full min-h-[240px] border-0"
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
