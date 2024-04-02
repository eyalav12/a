import { Link } from "react-router-dom";
import classes from './NavBar.module.css';
function NavBar(){
    return (
        <nav>
            <Link className={classes.title} to="/">Movies And Books Tracker</Link>
            <ul>
                
                <li>
                    <Link to='/search'>search</Link>
                </li>

                <li>
                    <Link to="/movies">movies</Link>
                </li>
                <li>
                    <Link to="/books">books</Link>
                </li>
                <li>
                    <Link to="/add-movie">add movie</Link>
                </li>
                <li>
                    <Link to="/add-book">add book</Link>
                </li>

            </ul>
            
        </nav>
    );

}
export default NavBar;