export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

// Przykładowe dane
const books: Book[] = [
  {
    id: 1,
    title: "Wiedźmin",
    author: "Andrzej Sapkowski",
    price: 39.99,
  },
  {
    id: 2,
    title: "Lalka",
    author: "Bolesław Prus",
    price: 29.99,
  },
  {
    id: 3,
    title: "Pan Tadeusz",
    author: "Adam Mickiewicz",
    price: 24.50,
  },
];

// Funkcja do pobierania książek
export const getProducts = (): Promise<Book[]> => {
  return Promise.resolve([...books]);
};
