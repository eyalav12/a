import { useState } from "react";
function AddMovie(){
    
    const[movieName,setMovieName]=useState('');
    const[movieInfo,setMovieInfo]=useState(null);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(event){
        setMovieName(event.target.value);
    }

    async function sumbitHandler(event){
        event.preventDefault();
        setMovieName('');
        
        try{
            const response=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_KEY_M}&query=${encodeURIComponent(movieName)}`);
            if(!response.ok){
                throw new Error('failed to fetch movie info');
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { title, overview, release_date } = data.results[0];
                const movieData = { name: title, overview, date: release_date }; 
                setMovieInfo(data.results[0]);
                
                const res=await fetch('http://localhost:8000/movies',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieData)
                    
                });
                if(!res.ok)throw new Error("failed adding");
        
    
                



            } else {
                setMovieInfo(null);
            }
        }
        catch(error){
            console.error('Error adding movie:', error.message);
            console.log("error fetching movie info: ",error);
        }
        setSubmitted(true);
    }

    const handleReset = () => {
        setSubmitted(false);

      };
    


    
    return (
        <div>
          <form onSubmit={sumbitHandler}>
            <input
              type="text"
              placeholder="Enter movie name"
              value={movieName}
              onChange={handleChange}
            />
            <button onClick={handleReset}>Add Movie</button>
          </form>
          {movieInfo && (
            <div>
              <h2>{movieInfo.title}</h2>
              <p>{movieInfo.overview}</p>
              <p>Release Date: {movieInfo.release_date}</p>
            </div>
          )}


          { !movieInfo && submitted  &&  (
            <p style={{color:'red',fontStyle:'italic',fontSize:20}}>
              movie name not found
            </p>
          )}
        </div>
      );


}


export default AddMovie;