// src/types/tour/Tour.ts
export interface Tour {
  _id: string;
  destination: string;
  duration: number;
  price: number;
  description: string;
  imageUrl: string; // Yeni resim alanı
  category: string; // Turun kategorisini belirtmek için eklendi
  link: string; // Yeni link alanı
}
