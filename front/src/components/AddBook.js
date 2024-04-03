import { useState } from "react";
import { useEffect } from "react";

function AddBook(){
    
    const [bookName,setBookName]=useState('');
    const[bookInfo,setBookInfo]=useState(null);
    const [submitted, setSubmitted] = useState(false);

    function handleReset(){
        setSubmitted(false);
    }

    async function submitHandler(event){
        event.preventDefault();
        setBookName('');
        console.log(bookName);

        try{
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&key=${process.env.REACT_APP_KEY}`);
            
            if(!response){
                throw new Error("failed to fetch book");
            }
            const data = await response.json();
            if(data.items && data.items.length>0){
                const title=data.items[0].volumeInfo.title;
                const date=data.items[0].volumeInfo.publishedDate;
                const description=data.items[0].volumeInfo.description;
                const bookData={name:title,date,description};
                setBookInfo(bookData);
                console.log("info",bookInfo);

                const res=await fetch('http://localhost:8000/books',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(bookData)
                });
                if(!res.ok)throw new Error("failed adding");
            }
            else{
                setBookInfo(null);
            }
            
        }
        catch(e){
            console.log("error fetching book info: ",e);
        }
        setSubmitted(true);
        
        

        

        
    }

    function inputHandler(event){
        setBookName(event.target.value);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input value={bookName} onChange={inputHandler} type="text" placeholder="Enter book name"></input>
                <button onClick={handleReset}>Add Book</button>
                {bookInfo && (
                    <div>
                        <h2>{bookInfo.name}</h2>
                        <p>{bookInfo.description}</p>
                        <p>Release Date: {bookInfo.date}</p>
                    </div>
                )}
                {!bookInfo && submitted  && (
                    <p style={{color:'red',fontStyle:'italic',fontSize:20}}>
                        book name not found
                    </p>
                 )}
        </form>
        </div>

    );
}
export default AddBook;