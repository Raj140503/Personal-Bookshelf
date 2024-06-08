import Navbar from './components/Navbar';
import './App.css';
import DisplayBooks from './components/DisplayBooks';
import { useRef, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Bookshelf from './components/Bookshelf';

function App() {
  const btnRef = useRef(null);
  const [results, setResults] = useState([]);
  const [bookshelf, setBookshelf] = useState(() => {
    return JSON.parse(localStorage.getItem('bookshelf')) || [];
  });

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  const addToBookshelf = (book) => {
    if (!bookshelf.some(b => b.key === book.key)) {
      const updatedBookshelf = [...bookshelf, book];
      setBookshelf(updatedBookshelf);
    }
  };

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter(b => b.key !== book.key);
    setBookshelf(updatedBookshelf);
  };

  return (
    <Router>
      <Navbar setResults={setResults}/>
      <Routes>
        <Route path="/" element={<DisplayBooks results={results} btnRef={btnRef} onAddToBookshelf={addToBookshelf} bookshelf={bookshelf}/>}></Route>
        <Route path="/bookshelf" element={<Bookshelf onRemoveFromBookshelf={removeFromBookshelf} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
