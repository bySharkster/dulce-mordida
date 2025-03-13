export const siteConfig = {
  business: {
    name: "Dulce Mordida",
    phone: " (787) 466-2860",
    email: "ashleystephanie_am@hotmail.com",
    address: "Mayaguez, Puerto Rico",
    businessHours: {
      start: '09:00',
      end: '18:00',
    },
    socialMedia: {
      instagram: "dulce_mordida2024",
      facebook: "https://www.facebook.com/profile.php?id=100083089694450",
      whatsapp: "https://wa.me/17874662860"
    },
    taxRate: 0.115
  },
  contact: {
    eventTypes: [
      "Boda",
      "Quinceañera",
      "Cumpleaños",
      "Bautizo",
      "Primera Comunión",
      "Evento Corporativo",
      "Otro"
    ]
  },
  metadata: {
    title: "Dulce Mordida | Pastelería Artesanal",
    description: "Creamos pasteles artesanales para tus momentos especiales. Especialistas en pasteles para bodas, quinceañeras y eventos.",
    keywords: "pastelería, pasteles, repostería, bodas, quinceañeras, eventos"
  },
} as const;

export type SiteConfig = typeof siteConfig;
