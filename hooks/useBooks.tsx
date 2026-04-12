import { useCallback, useState } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
}

export function useBooks() {
  const [library, setLibrary] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [readingGoal, setReadingGoal] = useState(10);
  const moveToLibrary = useCallback((book: Book) => {
  setLibrary(prev => [book, ...prev]);
  setWishlist(prev => prev.filter(b => b.id !== book.id));
}, []);

  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  const addToLibrary = useCallback((title: string, author: string) => {
    if (!title.trim() || !author.trim()) return;
    const newBook = { id: Date.now().toString(), title, author };
    setLibrary(prev => [newBook, ...prev]);
    setNewBookTitle('');
    setNewBookAuthor('');
  }, []);

  const addToWishlist = useCallback((title: string, author: string) => {
    const newBook = { id: Date.now().toString(), title, author };
    setWishlist(prev => [newBook, ...prev]);
  }, []);

  const deleteBook = useCallback((id: string, isWishlist: boolean) => {
    if (isWishlist) {
      setWishlist(prev => prev.filter(book => book.id !== id));
    } else {
      setLibrary(prev => prev.filter(book => book.id !== id));
    }
  }, []);

  return {
    library,
    wishlist,
    readingGoal,
    newBookTitle,
    newBookAuthor,
    setReadingGoal,
    setNewBookTitle,
    setNewBookAuthor,
    addToLibrary,
    addToWishlist,
    moveToLibrary,
    deleteBook,
  };
}
