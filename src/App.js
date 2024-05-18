import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import NavbarTop from "./Components/NavbarFolder/Navbar";
import {useEffect, useState} from "react";
import axios from 'axios';
import LoginForm from "./AuthPages/loginForm";
import AboutMe from './Components/AboutMeFolder/AboutMe';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // useNavigate kancasını burada kullanıyoruz

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const response = await axios.get('http://localhost:8080/api/tasks/usertasks');
      console.log("Tasks fetched:", response.data);
      if (response && response.data) {
        setTasks(response.data);
        console.log("Fetched Tasks with IDs:", response.data.map(task => task.id));
      } else {
        throw new Error('Received no data');
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error.message || error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setToken(token);
    setIsLoggedIn(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const addTask = async (description) => {
    try {
      const newTask = {
        description: description,
        complete: false
      };
      const response = await axios.post('http://localhost:8080/api/tasks/create', newTask);
      console.log("Task added:", response.data);
      if (response && response.data) {
        setTasks(prev => [...prev, response.data]);
      } else {
        throw new Error('Failed to receive data from the server');
      }
    } catch (error) {
      console.error('Failed to add task', error.message || error);
    }
  };

  function updateTaskDone(taskIndex, newDone) {
    const taskToUpdate = tasks[taskIndex];
    if (!taskToUpdate || taskToUpdate.id === undefined) {
      console.error('Task ID is undefined');
      return;
    }
    taskToUpdate.complete = newDone;
    axios.put(`http://localhost:8080/api/tasks/${taskToUpdate.id}`, { ...taskToUpdate, complete: newDone })
      .then(response => {
        console.log("Task updated:", response.data);
        if (response && response.data) {
          setTasks(prev => prev.map((task, index) => index === taskIndex ? response.data : task));
        } else {
          throw new Error('No data returned on update');
        }
      })
      .catch(error => console.error('Failed to update task', error.message || error));
  }

  function removeTask(indexToRemove) {
    const taskId = tasks[indexToRemove].id;
    if (taskId === undefined) {
      console.error('Task ID is undefined');
      return;
    }
    axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
      .then(response => {
        console.log("Task removed:", response);
        if (response.status === 200) {
          setTasks(prev => prev.filter((_, index) => index !== indexToRemove));
        } else {
          throw new Error('Failed to delete task');
        }
      })
      .catch(error => console.error('Failed to delete task', error.message || error));
  }

  const numberComplete = tasks.filter(t => t.complete).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  function renameTask(index, newName) {
    const taskToUpdate = tasks[index];
    if (taskToUpdate.id === undefined) {
      console.error('Task ID is undefined');
      return;
    }
    taskToUpdate.description = newName;
    axios.put(`http://localhost:8080/api/tasks/${taskToUpdate.id}`, { description: newName })
      .then(response => {
        console.log("Task renamed:", response.data);
        setTasks(prev => prev.map((task, idx) => idx === index ? response.data : task));
      })
      .catch(error => console.error('Failed to rename task', error));
  }

  console.log("Tasks to render:", tasks);

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? (
          <div>
            <NavbarTop handleLogout={handleLogout} />
            <main>
              <h1>{numberComplete}/{numberTotal} Complete</h1>
              <h2>{getMessage()}</h2>
              <TaskForm onAdd={addTask} />
              {tasks.map((task, index) => (
                <Task key={task.id}
                      id={task.id}
                      description={task.description}
                      complete={task.complete}
                      onRename={newName => renameTask(index, newName)}
                      onTrash={() => removeTask(index)}
                      onToggle={done => updateTaskDone(index, done)} />
              ))}
            </main>
          </div>
        ) : (
          <Navigate to="/login" />
        )
      } />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
