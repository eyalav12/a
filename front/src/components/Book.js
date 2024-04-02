import classes from './Book.module.css';
function Book(props){
    return (
        <li className={classes.book}>
            <h2>{props.name}</h2>
            <h3>{props.date}</h3>
            <p>{props.desc}</p>

        </li>
    );
}
export default Book;