import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  isRead: boolean;
}

interface BooksContextData {
  library: Book[];
  wishlist: Book[];
  readingGoal: number;
  newBookTitle: string;
  newBookAuthor: string;
  setReadingGoal: (val: number) => void;
  setNewBookTitle: (val: string) => void;
  setNewBookAuthor: (val: string) => void;
  addToLibrary: (title: string, author: string) => void;
  addToWishlist: (title: string, author: string) => void;
  moveToLibrary: (book: Book) => void;
  deleteBook: (id: string, isWishlist: boolean) => void;
  markAsRead: (id: string) => void;
}

const BooksContext = createContext<BooksContextData>({} as BooksContextData);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [readingGoal, setReadingGoal] = useState(10);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  const moveToLibrary = useCallback((book: Book) => {
    setLibrary(prev => [{ ...book, isRead: false }, ...prev]);
    setWishlist(prev => prev.filter(b => b.id !== book.id));
  }, []);

  const addToLibrary = useCallback((title: string, author: string) => {
    if (!title.trim() || !author.trim()) return;
    const newBook: Book = { id: Date.now().toString(), title, author, isRead: false };
    setLibrary(prev => [newBook, ...prev]);
    setNewBookTitle('');
    setNewBookAuthor('');
  }, []);

  const addToWishlist = useCallback((title: string, author: string) => {
    const newBook: Book = { id: Date.now().toString(), title, author, isRead: false };
    setWishlist(prev => [newBook, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setLibrary(prev => prev.map(book => book.id === id ? { ...book, isRead: true } : book));
  }, []);

  const deleteBook = useCallback((id: string, isWishlist: boolean) => {
    if (isWishlist) {
      setWishlist(prev => prev.filter(book => book.id !== id));
    } else {
      setLibrary(prev => prev.filter(book => book.id !== id));
    }
  }, []);

  return (
    <BooksContext.Provider value={{
      library, wishlist, readingGoal, newBookTitle, newBookAuthor,
      setReadingGoal, setNewBookTitle, setNewBookAuthor,
      addToLibrary, addToWishlist, moveToLibrary, deleteBook, markAsRead
    }}>
      {children}
    </BooksContext.Provider>
  );
}
export const useBooks = () => useContext(BooksContext);
