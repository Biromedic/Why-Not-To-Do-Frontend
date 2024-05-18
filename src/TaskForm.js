import {useState} from "react";

export default function TaskForm({onAdd}) {
  const [taskName,setTaskName] = useState('');
  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }
  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <button className="taskAddButton" >+</button>
      <input type="text"
             className="taskInput"
             value={taskName}
             onChange={ev => setTaskName(ev.target.value)}
             placeholder="Your next task..."/>
    </form>
  );
}