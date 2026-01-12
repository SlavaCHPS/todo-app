import styles from "./TodoItem.module.css";

export default function TodoItem({todo,onToggle, onDelete}) {
    return ( 
    <li className={`${styles.item} ${todo.removing ? styles.removing : ""}`}>

    <input type="checkbox"
    checked = {todo.completed}
    onChange={()=> onToggle(todo.id)}/>
    <span className={todo.completed ? styles.completed : styles.text}>{todo.text}</span>
    <button 
    type="button"
    className={styles.delete}
    onClick={()=>onDelete(todo.id)}>✕</button>
    </li>
);
}