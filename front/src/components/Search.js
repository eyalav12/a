import classes from './Search.module.css';
import { useState } from 'react';

function Search(){
    const[bookName,setBookName]=useState('');
    const[bookInfo,setBookInfo]=useState(null);
    const [submittedBook, setSubmittedBook] = useState(false);
    const[movieName,setMovieName]=useState('');
    const[movieInfo,setMovieInfo]=useState(null);
    const [submittedMovie, setSubmittedMovie] = useState(false);

    function handleResetBook(){
        setSubmittedBook(false);
    }
    function handleResetMovie(){
        setSubmittedMovie(false);
    }

    function inputHandlerBook(event){
        setBookName(event.target.value);
    }

    function inputHandlerMovie(event){
        setMovieName(event.target.value);
    }


    async function handleBookSearch(event){
        event.preventDefault();
        setBookName('');
        
        try {
            const response = await fetch('http://localhost:8000/search/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: bookName })
            });
            if (!response.ok) throw new Error('Failed to search for book');
            const data = await response.json();
            if(data){
                setBookInfo(data.name);
            }
            else{
                setBookInfo(null);
            }
            

        } catch (error) {
            console.error('Error searching for books:', error);
        }
        setSubmittedBook(true);
    }

    async function handleMovieSearch(event){
        event.preventDefault();
        setMovieName('');
        

        try {
            const response = await fetch('http://localhost:8000/search/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: movieName })
            });
            if (!response.ok) throw new Error('Failed to search for movie');
            const data = await response.json();
            if(data){
                setMovieInfo(data.name);
            }
            else{
                setMovieInfo(null);
            }
            
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
        setSubmittedMovie(true);
    }

    return (
        <div className={classes.search}>
            <form onSubmit={handleMovieSearch} className={classes.form}>
                <input
                    value={movieName}
                    onChange={inputHandlerMovie}  
                    type="text"
                    placeholder="Search for a movie"
                    className={classes.input}
                />
                <button onClick={handleResetMovie} className={classes.button}>Search</button>
            </form>
            {movieInfo && (
                <p>you saw the movie: {movieInfo}</p>
            )}
            {!movieInfo && submittedMovie &&
            (<p>not found this movie ... go watch it</p>)}
            <form onSubmit={handleBookSearch} className={classes.form}>
                <input
                    value={bookName}
                    onChange={inputHandlerBook}  
                    type="text"
                    placeholder="Search for a book"
                    className={classes.input}
                />
                <button onClick={handleResetBook} className={classes.button}>Search</button>
            </form>

            {bookInfo && submittedBook&& (
                <p>you read the book: {bookInfo}</p>
            )}
            {!bookInfo && submittedBook &&
            (<p>not found this book ... go read it</p>)}
            
        </div>
    );


}


         

     


            
        
     


export default Search;