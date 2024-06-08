import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const Bookshelf = ({ onRemoveFromBookshelf }) => {
    const [bookshelf, setBookshelf] = useState([]);
  
    useEffect(() => {
      const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
      setBookshelf(storedBookshelf);
    }, []);
  
    const removeBook = (book) => {
      const updatedBookshelf = bookshelf.filter(b => b.key !== book.key);
      setBookshelf(updatedBookshelf);
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
      onRemoveFromBookshelf(book); // Notify parent component about the removal
    };

  return (
    <div>
      <h2 className='text-3xl text-center font-bold font-mono mt-5 md:mt-8'>My Bookshelf</h2>
      <div className='flex flex-wrap justify-center pt-10 w-10/12 mx-auto gap-4'>
        {bookshelf.map((book, index) => (
          <BookCard key={index} book={book} onRemoveFromBookshelf={removeBook} isOnBookshelf={true} />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
