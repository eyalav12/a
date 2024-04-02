import classes from './Movie.module.css';
function Movie(props){
    return(
        
            <li className={classes.movie}> 
                <h2>{props.name}</h2>
                <h3>{props.date}</h3>
                <p>{props.view}</p>
            </li> 
       

    );
}
export default Movie;