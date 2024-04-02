import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Book from './components/Book';
import Movie from './components/Movie';
import Home from './components/Home';
import classes from '../src/components/App.module.css';
import MoviesList from '../src/components/MoviesList';
import BooksList from './components/BooksList';
import AddMovie from './components/AddMovie';
import AddBook from './components/AddBook';
import Search from './components/Search';
function App() {
  return (
    <div className={classes.app}>
      <NavBar></NavBar>
      <div>
        <Routes>
            <Route path="/search" element={<Search/>}></Route>
            <Route path="/add-movie" element={<AddMovie/>}></Route>
            <Route path="/add-book" element={<AddBook/>}></Route>
            <Route path="/movies" element={<MoviesList/>} ></Route>
            <Route path="/books" element={<BooksList/>} ></Route>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
