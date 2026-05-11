export type Category =
  | "veg-pickles"
  | "non-veg-pickles"
  | "snacks"
  | "sweets"
  | "powders"
  | "masalas";

export type WeightOption = "250g" | "500g" | "1000g";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string; // path under src/assets/products
  prices: Partial<Record<WeightOption, number>>;
  preBookOnly?: boolean;
  description?: string;
}

export const CATEGORIES: { id: Category; label: string; emoji: string; blurb: string; image?: string }[] = [
  { id: "veg-pickles", label: "Veg Pickles", emoji: "🥭", blurb: "Sun-cured & spice-rich", image: "/products/mangopickle.jpg" },
  { id: "non-veg-pickles", label: "Non-Veg Pickles", emoji: "🍗", blurb: "Slow-cooked, bold heat", image: "/products/prawnspickle.jpg" },
  { id: "snacks", label: "Snacks", emoji: "🥨", blurb: "Crunchy & moreish", image: "/products/murukulu.jpg" },
  { id: "sweets", label: "Sweets", emoji: "🍬", blurb: "Festive & handcrafted", image: "/products/madatakaja.jpg" },
  { id: "powders", label: "Powders", emoji: "🌶️", blurb: "Stone-ground podis", image: "/products/karivepakukarampodi.jpg" },
  { id: "masalas", label: "Masalas", emoji: "🧂", blurb: "Family spice blends", image: "/products/redchillipowderforcurries.jpg" },
];

const pVeg = (id: string, name: string, image: string): Product => ({
  id, name, category: "veg-pickles", image,
  prices: { "250g": 4.49, "500g": 7.99, "1000g": 15.99 },
});
const pNonVeg = (id: string, name: string, image: string, prices: Product["prices"]): Product => ({
  id, name, category: "non-veg-pickles", image, prices,
});
const pSnack = (id: string, name: string, image: string): Product => ({
  id, name, category: "snacks", image,
  prices: { "250g": 3.49, "500g": 6.49, "1000g": 11.99 },
});
const pPowder = (id: string, name: string, image: string): Product => ({
  id, name, category: "powders", image,
  prices: { "250g": 3.29, "500g": 6.49 },
});
const pMasala = (id: string, name: string, image: string, p250 = 3.29, p500 = 6.49): Product => ({
  id, name, category: "masalas", image, prices: { "250g": p250, "500g": p500 },
});
const pSweet = (id: string, name: string, image: string, p250: number, p500: number): Product => ({
  id, name, category: "sweets", image, prices: { "250g": p250, "500g": p500 }, preBookOnly: true,
});

export const PRODUCTS: Product[] = [
  // Veg Pickles
  pVeg("mango", "Mango (Avakaya) Pickle", "mangopickle.jpg"),
  pVeg("redchilli", "Pandu Mirchi Pickle", "redchillipickle.jpg"),
  pVeg("tomato", "Tomato Pickle", "tomatopickle.jpg"),
  pVeg("amla", "Amla (Usirikaya) Pickle", "amlapickle.jpg"),
  pVeg("ginger", "Ginger (Allam) Pickle", "gingerpickle.jpg"),
  pVeg("gongura", "Gongura Pickle", "gongurapickle.jpg"),
  pVeg("brinjal", "Brinjal Pickle", "brinjalpickle.jpg"),
  pVeg("gongura-chilli", "Gongura & Red Chilli Pickle", "gonguraandredchillipickle.jpg"),

  // Non-Veg
  pNonVeg("chicken", "Chicken Pickle", "chikenpickle.jpg", { "250g": 6.49, "500g": 12.49, "1000g": 22.99 }),
  pNonVeg("prawns", "Prawns Pickle", "prawnspickle.jpg", { "250g": 6.99, "500g": 13.99, "1000g": 25.99 }),
  pNonVeg("mutton", "Mutton Pickle", "muttonpickle.jpg", { "250g": 7.49, "500g": 13.99, "1000g": 26.99 }),

  // Powders
  pPowder("karivepaku", "Karivepaku Karam Podi", "karivepakukarampodi.jpg"),
  pPowder("nallakaram", "Nalla Karam Podi", "nallakarampodi.jpg"),
  pPowder("aviseginjala", "Avise Ginjala Karam Podi", "aviseginjalapodi.jpg"),
  pPowder("palli", "Palli Karam Podi", "pallikarampodi.jpg"),

  // Masalas
  pMasala("garam", "Garam Masala", "garammasala.jpg"),
  pMasala("mutton-masala", "Mutton Masala", "muttonmasala.jpg"),
  pMasala("fish-masala", "Fish Masala", "fishmasala.jpg"),
  pMasala("redchilli-powder", "Red Chilli Powder (Curries)", "redchillipowderforcurries.jpg", 3.69, 7.29),

  // Sweets (pre-book only)
  pSweet("madatakaja", "Madatha Kaja", "madatakaja.jpg", 3.99, 7.99),
  pSweet("bellamgavvalu", "Bellam Gavvalu", "bellamgavvalu.jpg", 3.99, 7.99),
  pSweet("dryfruit-laddoos", "Dry Fruit Laddoos", "dryfruitladoos.jpg", 5.19, 10.49),
  pSweet("dryfruit-puthareku", "Dry Fruit Putharekulu", "dryfruitputharekulu.jpg", 6.49, 11.99),
  pSweet("badusha", "Badusha", "badusha.jpg", 3.99, 7.99),
  pSweet("kakinada-kaja", "Kakinada Kaja", "kakinadakaja.jpg", 3.99, 7.99),
  pSweet("sesame-chikki", "Sesame Chikki", "sesamechekki.jpg", 3.99, 7.99),
  pSweet("peanut-chikki", "Peanut Chikki", "peanutchikki.jpg", 3.69, 7.29),
  pSweet("kaju-chikki", "Kaju Chikki", "kajuchekki.jpg", 4.99, 9.49),
  pSweet("gujia", "Gujiya", "gujia.jpg", 3.99, 7.99),
  pSweet("sugar-puthareku", "Sugar Putharekulu", "sugarputharekulu.jpg", 4.79, 8.99),
  pSweet("sugar-gavvalu", "Sugar Gavvalu", "sugargavvalu.jpg", 3.99, 7.99),
  pSweet("boondi-chikki", "Boondi Chikki", "boondichikki.jpg", 3.99, 7.99),
  pSweet("madugula-halwa", "Authentic Madugula Halwa", "specialsweetmadugulahalwa.jpg", 6.99, 12.49),
  pSweet("nethibobbatlu", "Nethi Bobbatlu", "nethibobbatlu.jpg", 3.69, 7.29),
  pSweet("motichoor", "Motichoor Laddu", "motichoorladdu.jpg", 4.79, 8.99),

  // Snacks
  pSnack("pappu-chegodi", "Pappu Chegodi", "pappuchegodi.jpg"),
  pSnack("kara-boondi", "Kara Boondi", "karaboondi.jpg"),
  pSnack("ribbon-pakodi", "Ribbon Pakodi", "ribbonpakodi.jpg"),
  pSnack("kara-sev", "Kara Sev", "karasev.jpg"),
  pSnack("dalmudi", "Dal Mudi Mixture", "dalmudimixture.jpg"),
  pSnack("murukulu", "Murukulu", "murukulu.jpg"),
  pSnack("janthikalu", "Janthikalu", "janthikalu.jpg"),
  pSnack("aloo-bhujia", "Aloo Bhujia", "aloobhujia.jpg"),
  pSnack("chekkalu", "Chekkalu", "chekkalu.jpg"),
  pSnack("banana-chips", "Banana Chips", "bananachips.jpg"),
  pSnack("ring-murukku", "Ring Murukku", "ringmurukku.jpg"),

];

export const WHATSAPP_GROUP = "https://chat.whatsapp.com/HoZoIzPCVaMBn6aU4dMdl5";
export const WHATSAPP_DIRECT = "https://wa.me/447474140956";
