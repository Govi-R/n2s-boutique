// lib/site-config.js
//
// Everything you need to personalise is in this one file. Replace the values
// marked REPLACE_ME and nothing else in the project needs editing.

export const site = {
  name: "N2S Boutique",
  tagline: "Handpicked sarees and traditional wear for Prosper and Celina families",
  serviceArea: "Prosper, Celina and the surrounding North Dallas area",

  // Contact details shown on the site.
  phone: "(518) 951-0079",              // e.g. "(555) 123-4567"
  email: "info@n2sboutique.com",              // e.g. "hello@n2sboutique.com"

  // Full https links. Leave a value as an empty string ("") to hide that link.
  instagram: "https://www.instagram.com/n2s.boutique",
  facebook: "https://www.facebook.com/n2sboutique",
  whatsappGroup: "https://chat.whatsapp.com/JhCjcVrQjc4Kk9jxEX6iFL?mode=wwc",      // WhatsApp group invite link

  // Formspree receives the order form and emails it to you.
  // Create a free form at formspree.io, then paste the form ID here.
  // The ID is the last part of the URL Formspree gives you, e.g. "xabcdefg".
  formspreeId: "xjyyepql",

  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX".
  // Leave as an empty string until you have one.
  googleAnalyticsId: "G-44W8KK8QCC",

  // How long you aim to reply to an order request. Shown to customers so they
  // know what to expect.
  responseTime: "within 24 hours",
};

// The pickup address is deliberately NOT in this file. Per the specification it
// is shared only after an order is confirmed, so it must never appear anywhere
// in the website code.
