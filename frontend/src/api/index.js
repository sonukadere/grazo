import {
  GiChopsticks, GiPartyPopper, GiHealthNormal, GiFamilyHouse,
  GiChefToque, GiHotMeal, GiCampingTent, GiPartyFlags,
} from "react-icons/gi";

import { services as localServices } from "../data/services";
import { menuCategories as localMenuCategories } from "../data/menuData";
import { testimonials as localTestimonials } from "../data/testimonials";
import { events as localEvents } from "../data/events";
import { faqData as localFaqs } from "../data/faq";

const iconMap = {
  wedding: GiPartyPopper,
  corporate: GiChefToque,
  birthday: GiPartyFlags,
  "private party": GiFamilyHouse,
  "live counter": GiChopsticks,
  "luxury buffet": GiHotMeal,
  outdoor: GiCampingTent,
  festival: GiHealthNormal,
  default: GiPartyPopper,
};

export function getIcon(name) {
  const key = (name || "").toLowerCase().trim();
  return iconMap[key] || iconMap.default;
}

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getServices() {
  await delay();
  return localServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
  }));
}

const localCategories = localMenuCategories.map((c) => ({
  _id: String(c.id),
  name: c.name,
  description: c.description,
  image: c.image || "",
  order: c.id,
}));

export async function getCategories() {
  await delay();
  return localCategories;
}

export async function getMenuByCategory(categoryId) {
  await delay();
  const cat = localMenuCategories.find((c) => String(c.id) === categoryId);
  if (!cat) return [];
  return cat.items.map((item, i) => ({
    _id: `${categoryId}-${i}`,
    name: item.name,
    description: item.description || "",
    price: item.price || 0,
    image: item.image || "",
  }));
}

export async function getAllMenu() {
  await delay();
  return localMenuCategories.flatMap((cat) =>
    cat.items.map((item, i) => ({
      _id: `${cat.id}-${i}`,
      name: item.name,
      description: item.description || "",
      price: item.price || 0,
      image: item.image || "",
      category: String(cat.id),
    }))
  );
}

const localGalleryImages = [
  ...[1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26].map((n) => ({
    src: `/gallery/${n}.jpeg`,
    category: "Food",
    title: `Gallery ${n}`,
  })),
  ...[
    "WhatsApp Image 2026-07-29 at 11.56.25 PM",
    "WhatsApp Image 2026-07-29 at 11.56.26 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.26 PM (2)",
    "WhatsApp Image 2026-07-29 at 11.56.26 PM",
    "WhatsApp Image 2026-07-29 at 11.56.27 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.27 PM",
    "WhatsApp Image 2026-07-29 at 11.56.28 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.28 PM",
    "WhatsApp Image 2026-07-29 at 11.56.29 PM",
    "WhatsApp Image 2026-07-29 at 11.56.30 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.30 PM",
    "WhatsApp Image 2026-07-29 at 11.56.31 PM",
    "WhatsApp Image 2026-07-29 at 11.56.32 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.32 PM",
    "WhatsApp Image 2026-07-29 at 11.56.34 PM",
    "WhatsApp Image 2026-07-29 at 11.56.35 PM",
    "WhatsApp Image 2026-07-29 at 11.56.36 PM",
    "WhatsApp Image 2026-07-29 at 11.56.38 PM",
    "WhatsApp Image 2026-07-29 at 11.56.39 PM (1)",
    "WhatsApp Image 2026-07-29 at 11.56.39 PM",
  ].map((name, i) => ({
    src: `/gallery/${name}.jpeg`,
    category: i % 2 === 0 ? "Food" : "Event",
    title: "Event Photography",
  })),
  ...[
    { file: "WhatsApp Video 2026-07-29 at 11.56.24 PM", title: "Wedding Event Highlights" },
    { file: "WhatsApp Video 2026-07-29 at 11.56.42 PM (1)", title: "Live Counter Setup" },
    { file: "WhatsApp Video 2026-07-29 at 11.56.42 PM", title: "Grazing Table Presentation" },
  ].map((v) => ({
    src: `/gallery/${v.file}.mp4`,
    category: "Video",
    title: v.title,
    type: "video",
  })),
];

export async function getGallery() {
  await delay();
  return localGalleryImages.map((g, i) => ({
    id: i + 1,
    src: g.src,
    category: g.category,
    title: g.title,
    type: g.type || "image",
  }));
}

export async function getTestimonials() {
  await delay();
  return localTestimonials.map((t) => ({
    id: t.id,
    name: t.name,
    text: t.text,
    rating: t.rating,
    image: t.image,
    location: t.location,
    event: t.event,
  }));
}

export async function getFAQs() {
  await delay();
  return localFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));
}

export async function getEvents() {
  await delay();
  return localEvents.map((e) => ({
    id: e.id,
    title: e.title,
    tagline: e.tagline,
    capacity: e.capacity,
    description: e.description,
    image: e.image,
  }));
}

export async function getSettings() {
  await delay();
  return {};
}

export async function getStats() {
  await delay();
  return [
    { label: "Events Catered", value: 500, suffix: "+" },
    { label: "Guests Served", value: 50000, suffix: "+" },
    { label: "Menu Items", value: 250, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ];
}

export async function submitContact(data) {
  await delay();
  console.log("Contact form submitted (local):", data);
  return { success: true };
}

export async function submitBooking(data) {
  await delay(500);
  console.log("Booking submitted (local):", data);
  return { success: true };
}

export async function subscribeNewsletter(email) {
  await delay();
  console.log("Newsletter subscribed (local):", email);
  return { success: true };
}
