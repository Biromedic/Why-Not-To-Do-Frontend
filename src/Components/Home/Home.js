import React, { useState } from 'react';
import './Home.css'; // Importing the CSS file

function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (!input.trim()) return; // Prevent adding empty tasks
    setTasks([...tasks, input.trim()]);
    setInput(''); // Clear input field after adding
  };

  return (
    <div className="homepage">
      <h1>ToDo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
