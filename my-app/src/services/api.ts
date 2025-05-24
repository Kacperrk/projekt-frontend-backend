export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string; // dodaj jeśli używasz opisu w BookDetails
}

// Przykładowe dane
const books: Book[] = [
  {
    id: 1,
    title: "Wiedźmin",
    author: "Andrzej Sapkowski",
    price: 39.99,
    description: "Saga o wiedźminie Geralcie z Rivii.",
  },
  {
    id: 2,
    title: "Lalka",
    author: "Bolesław Prus",
    price: 29.99,
    description: "Powieść realistyczna z końca XIX wieku.",
  },
  {
    id: 3,
    title: "Pan Tadeusz",
    author: "Adam Mickiewicz",
    price: 24.50,
    description: "Epopeja narodowa z czasów zaborów.",
  },
];

// Pobranie wszystkich książek
export const getProducts = (): Promise<Book[]> => {
  return Promise.resolve([...books]);
};

// Pobranie jednej książki po ID
export const getBookById = (id: string | number): Promise<Book> => {
  const book = books.find(b => b.id === Number(id));
  if (!book) {
    return Promise.reject(new Error("Książka nie znaleziona"));
  }
  return Promise.resolve(book);
};
