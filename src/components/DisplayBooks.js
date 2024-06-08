import React from 'react'
import Card from './BookCard';

function DisplayBooks({ results, btnRef, onAddToBookshelf, bookshelf }) {
  return (
    <div className='flex flex-wrap justify-center pt-10 w-10/12 mx-auto gap-4'>

      {
        results.map((book) => {
          return (
            <Card key={book.key} book={book} btnRef={btnRef} onAddToBookshelf={onAddToBookshelf} 
            isOnBookshelf={bookshelf.some(b => b.key === book.key)} />
          )
        })
      }

    </div>
  )
}

export default DisplayBooks
