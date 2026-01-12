import { useState } from 'react'
import TodoItem from './components/TodoItem/TodoItem';
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed; 
    if (filter === "completed") return todo.completed; 
    return true;
  });
  

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() ==="") return; 

    setTodos([...todos, 
    { id: Date.now(), 
      text: text, 
      completed: false, 
      removing: false,
    }, ]);

    setText("");
  }

  function toggleTodo(id) {
    setTodos(
    todos.map((todo) => todo.id === id 
  ? {...todo, completed: !todo.completed}
  : todo
)
    );
  }

  function deleteTodo(id) {
    setTodos(todos => todos.map(todo => 
      todo.id === id 
      ? {...todo, removing: true}
      : todo
    )
  );

    setTimeout(()=> {setTodos(todos.filter((todo)=> todo.id !== id));
    },300);
  }


  return (
    <>
      <div className={styles.container}>

      <div className={styles.list}>

      <div className={styles.title}>
        <h1>To-Do List</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input 
        className={styles.task}
        value={text} 
        onChange={(e)=> setText(e.target.value)} 
        placeholder='New Task'
        />
        <button className={styles.add}>Add</button>
      </form>

      <div className={styles.filters}>
        <button className={`${styles.filter} ${filter === "all" ? styles.active : ""}`}
        onClick={()=> setFilter("all")} ><span>All</span></button>
        <button className={`${styles.filter} ${filter === "active" ? styles.active : ""}`} onClick={()=> setFilter("active")}><span>Active</span></button>
        <button className={`${styles.filter} ${filter === 'completed' ? styles.active : ""}`} onClick={()=> setFilter("completed")}><span>Completed</span></button>
      </div>

      <div className={styles.todos}>
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          />
        ))}
      </ul>
      </div>

      </div>
    </div>
    </>
  );
}

export default App
