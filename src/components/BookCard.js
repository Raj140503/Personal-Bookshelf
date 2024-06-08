import React from 'react'

function BookCard({ book, onAddToBookshelf, onRemoveFromBookshelf, isOnBookshelf}) {

  
  return (
    <div className='border-2 border-green-400 rounded-lg px-6 w-56 min-h-64 flex flex-col gap-4 justify-evenly items-center hover:shadow-md hover:shadow-slate-500 hover:scale-105 hover:cursor-pointer'>
        <section className='flex flex-col'>
        <p className='text-xl'><span className='font-bold'>Book Name: </span>{book.title}</p>
        <p className='text-xl'><span className='font-bold'>Edition count </span>{book.edition_count}</p>
        </section>
        {isOnBookshelf ? (
          <button className='py-2 px-4 text-2 md:text-4 hover:opacity-90 hover:scale-105 bg-red-400 rounded-lg px-2 font-semibold border-0' onClick={() => onRemoveFromBookshelf(book)}>Remove from Bookshelf</button>
        ) : (
          <button className='py-2 px-4 mb-2 text-2 md:text-4 hover:opacity-90 hover:scale-105 bg-green-400 rounded-lg px-2 font-semibold border-0' onClick={() => onAddToBookshelf(book)}>Add to Bookshelf</button>
        )}
    </div>
  )
}

export default BookCard
