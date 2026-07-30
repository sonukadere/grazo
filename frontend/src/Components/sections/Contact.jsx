import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { whatsappLink, phoneNumber, email, location } from "../../data/navigation";
import { submitBooking } from "../../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    eventType: "Wedding",
    eventDate: "",
    guests: "",
    budget: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitBooking({
        name: form.name,
        phone: form.mobile,
        email: form.email,
        eventType: form.eventType,
        eventDate: form.eventDate,
        guestCount: parseInt(form.guests) || 0,
        message: `Budget: ${form.budget}\n${form.message}`,
      });
      setSubmitted(true);
      setForm({
        name: "",
        mobile: "",
        email: "",
        eventType: "Wedding",
        eventDate: "",
        guests: "",
        budget: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          subtitle="Get in Touch"
          title="Let's Create Something Beautiful Together"
          description="Tell us about your event and we'll curate a bespoke dining experience that exceeds your expectations and delights every guest."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gold/10"
          >
            {submitted && (
              <div className="mb-6 p-4 bg-primary/10 text-primary rounded-xl text-sm font-medium">
                Thank you for your inquiry! We&apos;ve received your details and will reach out within 24 hours to begin planning your celebration.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Mobile Number *</label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Event Type *</label>
                <select name="eventType" value={form.eventType} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm bg-white">
                  {["Wedding", "Reception", "Engagement", "Birthday", "Corporate", "Private Party", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Event Date *</label>
                <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Number of Guests *</label>
                <input type="number" name="guests" value={form.guests} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm" placeholder="e.g. 150" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Budget Range</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm bg-white">
                  {["Select range", "Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "₹2,50,000 – ₹5,00,000", "Above ₹5,00,000"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-dark mb-1.5">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all text-sm resize-none" placeholder="Tell us more about your event..." />
              </div>
            </div>

            <button type="submit" disabled={sending}
              className="mt-6 w-full px-8 py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gold/10">
              <h3 className="text-lg font-heading font-bold text-dark mb-5">Contact Information</h3>
              <div className="space-y-5">
                <a href={`tel:${phoneNumber}`}
                  className="flex items-center gap-4 text-gray-600 hover:text-gold transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <FaPhone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone / WhatsApp</p>
                    <p className="text-sm font-medium">{phoneNumber}</p>
                  </div>
                </a>

                <a href={`mailto:${email}`}
                  className="flex items-center gap-4 text-gray-600 hover:text-gold transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <FaEnvelope className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium">{email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-gray-600">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm font-medium">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            <a href={whatsappLink} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-green-600/20 active:scale-[0.98]">
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            {/* Google Map Placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gold/10 h-48 bg-gray-200 flex items-center justify-center">
              <iframe
                title="Grazo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21679659767!2d75.78855239453126!3d22.724228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc1c1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIndore%2C+Madhya+Pradesh!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
