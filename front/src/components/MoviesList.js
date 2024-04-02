import Movie from "./Movie";
import { useEffect,useState } from "react";

function MoviesList(props){
    const [movies,setMovies]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchMovies(){
            try{
                setLoading(true);
                const response=await fetch('http://localhost:8000/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                  }
                const data=await response.json();
                setMovies(data);
                setLoading(false);
            }
            catch(error){
                setLoading(false);
                console.error("error fetch movies",error);
            }
        }
        fetchMovies();

        

    },[]);

    


    return (
       <div>
            {loading?(<p>Loading...</p>):
                (
                    <div>
                        <h3>Movies List</h3>
                        <ul>
                            {movies.map((movie)=><Movie name={movie.name} date={movie.date} view={movie.overview}></Movie>)}
                        </ul>
                    </div>

                )
            }
        </div>

        
        
    );
}
export default MoviesList;