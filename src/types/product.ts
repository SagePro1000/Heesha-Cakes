export type ProductCategory = "Buttercream Frosting" | "Whipped Cream Frosting" | "Plain Cakes" | "Extras";

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: ProductCategory;
  image: string;
  availableFlavors: string[];
  availableSizes: string[];
  allowInscription: boolean;
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Buttercream Custom Cake",
    description: "Our signature smooth buttercream frosting cakes available in single or double layers.",
    basePrice: 15000, 
    category: "Buttercream Frosting",
    image: "/images/8k_cake.png",
    availableFlavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
    availableSizes: [
      
      "Size 6 (1 layer)", "Size 8 (1 layer)", "Size 10 (1 layer)", "Size 12 (1 layer)",
      "Size 4 (2 layers)", "Size 6 (2 layers)", "Size 8 (2 layers)", "Size 10 (2 layers)", "Size 12 (2 layers)"
    ],
    allowInscription: true,
  },
  {
    id: "p2",
    name: "Buttercream Bento Cake",
    description: "Cute, customizable mini cake with smooth buttercream.",
    basePrice: 6000,
    category: "Buttercream Frosting",
    image: "/images/bento_cake.png",
    availableFlavors: ["Vanilla", "Chocolate", "Red Velvet"],
    availableSizes: ["Standard Bento"],
    allowInscription: true,
  },
  {
    id: "p3",
    name: "Buttercream Cupcakes",
    description: "Soft sponge cupcakes topped with our signature buttercream.",
    basePrice: 7000,
    category: "Buttercream Frosting",
    image: "/images/parfait_dessert.png",
    availableFlavors: ["Mixed Favorites", "Vanilla", "Chocolate"],
    availableSizes: ["Box of 6", "Box of 12"],
    allowInscription: false,
  },
  {
    id: "p4",
    name: "Whipped Cream Custom Cake",
    description: "Light, airy whipped cream frosting cakes available in single or double layers.",
    basePrice: 14000,
    category: "Whipped Cream Frosting",
    image: "/images/luxury_tier_cake.png",
    availableFlavors: ["Vanilla", "Chocolate", "Red Velvet"],
    availableSizes: [
      "Size 6 (1 layer)", "Size 8 (1 layer)", "Size 10 (1 layer)", "Size 12 (1 layer)",
      "Size 4 (2 layers)", "Size 6 (2 layers)", "Size 8 (2 layers)", "Size 10 (2 layers)", "Size 12 (2 layers)"
    ],
    allowInscription: true,
  },
  {
    id: "p5",
    name: "Whipped Cream Bento Cake",
    description: "Mini whipped cream cake perfect for sharing.",
    basePrice: 5500,
    category: "Whipped Cream Frosting",
    image: "/images/bento_cake.png",
    availableFlavors: ["Vanilla", "Red Velvet"],
    availableSizes: ["Standard Bento"],
    allowInscription: true,
  },
  {
    id: "p6",
    name: "Whipped Cream Cupcakes",
    description: "Soft sponge cupcakes topped with light whipped cream.",
    basePrice: 6500,
    category: "Whipped Cream Frosting",
    image: "/images/parfait_dessert.png",
    availableFlavors: ["Mixed Favorites", "Vanilla", "Chocolate"],
    availableSizes: ["Box of 6", "Box of 12"],
    allowInscription: false,
  },
  {
    id: "p7",
    name: "Plain Foil Cake",
    description: "Rich plain cake baked to perfection in a foil container.",
    basePrice: 4000,
    category: "Plain Cakes",
    image: "/images/foil_cake.png",
    availableFlavors: ["Vanilla", "Chocolate", "Red Velvet"],
    availableSizes: ["Mini Foil", "Midi Foil", "Maxi Foil"],
    allowInscription: false,
  },
  {
    id: "p8",
    name: "Plain Classic Cake",
    description: "Delicious, undecorated plain cakes.",
    basePrice: 8000,
    category: "Plain Cakes",
    image: "/images/8k_cake.png",
    availableFlavors: ["Vanilla Pound", "Chocolate", "Fruit Cake"],
    availableSizes: ["Size 4", "Size 6", "Size 8", "Size 10", "Size 12"],
    allowInscription: false,
  }
];
