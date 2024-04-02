import Book from "./Book";
import { useEffect, useState } from "react";
import classes from './BooksList.module.css';
function BooksList(){
    const[books,setBooks]=useState([]);
    const[load,setLoading]=useState(true);
    useEffect(()=>{
        async function fetchBooks(){
            try{
                setLoading(true);
                const res=await fetch('http://localhost:8000/books');
                if(!res.ok)throw new Error('failed fetch books');
                const data = await res.json();
                setBooks(data);
                setLoading(false);
            }
            catch(e){
                setLoading(false);
                console.error('error fetch books');
            }
        }
        fetchBooks();
    },[])



    return (
        <div>
            {load? (<p>Loading...</p>) :
            <div>
                <h3>Books List</h3>
                <ul>
                    {books.map((book)=><Book name={book.name} desc={book.description} date={book.date}></Book>)}
                </ul>
            </div>
            }
        </div>
    );
}
export default BooksList;