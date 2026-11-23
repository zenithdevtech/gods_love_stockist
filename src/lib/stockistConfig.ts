export interface StockistConfig {
  name: string;
  tagline: string;
  sponsorUsername: string;
  phone: {
    display: string;
    tel: string;
    whatsapp: string;
  };
  email: string;
  location: string;
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

/**
 * Single source of truth for stockist details across the platform.
 * Update this file whenever stockist contact info, banking info, or sponsor details change.
 */
export const stockistConfig: StockistConfig = {
  name: "God's Love",
  tagline: "Mudet Real Solution Stockist",
  sponsorUsername: "Godslove1",
  phone: {
    display: "0916 764 9620",
    tel: "+2349167649620",
    whatsapp: "2349167649620",
  },
  email: "sunshineer23@gmail.com",
  location: "Nigeria",
  bank: {
    bankName: "Moniepoint MFB",
    accountNumber: "8161720544",
    accountName: "Mudet Real Solutions Ltd",
  },
  seo: {
    title: "God's Love | Mudet Real Solution Stockist",
    description:
      "Order genuine Mudet herbal extracts and register as a Mudet member with God's Love. Direct stockist support, fast order processing, and WhatsApp verification.",
    keywords:
      "Mudet stockist, Mudet member registration, Mudet products, Mudet Herbal Extract, God's Love, Mudet registration, Mudet packages, Cinnamon extract, Armor extract",
  },
};

export default stockistConfig;
