// src/services/api.ts

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
  approved?: boolean; // dodane pole approved
}

// Przykładowe dane książek z polem approved
const books: Book[] = [
  {
    id: 1,
    title: "Wiedźmin",
    author: "Andrzej Sapkowski",
    price: 39.99,
    description: "Saga o wiedźminie Geralcie z Rivii.",
    approved: true, // zatwierdzona książka
  },
  {
    id: 2,
    title: "Lalka",
    author: "Bolesław Prus",
    price: 29.99,
    description: "Powieść realistyczna z końca XIX wieku.",
    approved: false, // niezatwierdzona
  },
  {
    id: 3,
    title: "Pan Tadeusz",
    author: "Adam Mickiewicz",
    price: 24.50,
    description: "Epopeja narodowa z czasów zaborów.",
    approved: true, // zatwierdzona
  },
];

// Funkcja do pobrania wszystkich książek
export const getProducts = (): Promise<Book[]> => {
  return Promise.resolve([...books]);
};

// Funkcja do pobrania książki po ID
export const getBookById = (id: string | number): Promise<Book> => {
  const book = books.find(b => b.id === Number(id));
  if (!book) {
    return Promise.reject(new Error("Książka nie znaleziona"));
  }
  return Promise.resolve(book);
};
