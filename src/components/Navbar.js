import React from 'react'
import { useState } from 'react';
import {
  Link,
} from "react-router-dom";

function Navbar({setResults}) {
  const [query, setQuery] = useState('');

  const searchBooks = async (query) => {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
    const data = await response.json();
    setResults(data.docs);
  };

  const handleSearch = () => {
    // const newQuery = document.getElementById('search').value;
    // console.log(newQuery);
    // setQuery(newQuery);
    console.log(query);
    if (query) {
      searchBooks(query);
      setQuery('');
      document.getElementById('search').value = '';
    } else {
      setResults([]);
    }
    
  }
  
  return (
    <nav className='bg-slate-50 border-b border-10 backdrop-blur-sm flex sticky top-0  py-2 px:5 md:py-4 md:px-10 md:justify-end w-full justify-center items-center'>
        <div className='w-full md:w-8/12 flex flex-col md:flex-row justify-center md:justify-between'>
        <div className='flex  flex-col md:flex-row justify-center items-center'>
            <input id="search" onChange={(e) => setQuery(e.target.value)} type="text" className='w-56 md:w-80 md:h-8 border-2 border-green-400 rounded-lg px-2 mr-2 text-2 md:text-5 font-mono' placeholder='Enter book name...'/>
            <button onClick={handleSearch} className='mt-2 md:mt-0 text-2 md:text-4 hover:opacity-90 hover:scale-105 bg-green-400 rounded-lg px-2 font-semibold border-0'>
              <Link to="/">Search</Link>
            </button>
        </div>      
        <button  className='mt-2 md:mt-0 w-8/12hover:opacity-90 hover:scale-105 bg-green-400 rounded-lg px-2 font-semibold border-0'>
        <Link to="/bookshelf">
          My Bookshelf
        </Link >
        </button>
        </div>


    </nav>
  )
}

export default Navbar
