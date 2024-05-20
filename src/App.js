import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import NavbarTop from "./Components/NavbarFolder/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import LoginForm from "./AuthPages/loginForm";
import AboutMe from './Components/AboutMeFolder/AboutMe';
import AdminDashboard from './Components/Admin/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminRoute from './Components/Admin/AdminRoute';
import ForgotPasswordForm from './AuthPages/ForgotPasswordForm';
import SmtpAnimation from './AuthPages/Smtp/SmtpAnimation';
import RegisterForm from './AuthPages/RegisterForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      axios.get('http://localhost:8080/api/user/me')
        .then(response => {
          if (response.data) {
            localStorage.setItem("userRole",response.data.role);
            setIsLoggedIn(true);
            fetchTasks();
          } else {
            setIsLoggedIn(false);
            navigate('/login');
          }
        })
        .catch(error => {
          console.error('Token verification failed:', error.message || error);
          setIsLoggedIn(false);
          navigate('/login');
        });
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks/usertasks');
      if (response.data) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error.message || error);
      setTasks([]);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8080/api/user/me')
      .then(response => {
        if (response.data) {
          localStorage.setItem('userRole', response.data.role); 
          fetchTasks();
          navigate('/');
        } else {
          setIsLoggedIn(false);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Failed to fetch user role:', error.message || error);
        setIsLoggedIn(false);
        navigate('/login');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const addTask = async (description) => {
    try {
      const newTask = {
        description: description,
        complete: false
      };
      const response = await axios.post('http://localhost:8080/api/tasks/create', newTask);
      if (response.data) {
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
        if (response.data) {
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
        setTasks(prev => prev.map((task, idx) => idx === index ? response.data : task));
      })
      .catch(error => console.error('Failed to rename task', error));
  }

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={
            isLoggedIn ? (
              <div>
                <NavbarTop handleLogout={handleLogout} />
                <main>
                  <h1>{numberComplete}/{numberTotal} Complete</h1>
                  <h2>{getMessage()}</h2>
                  <TaskForm onAdd={addTask} />
                  {tasks.length > 0 ? tasks.map((task, index) => (
                    <Task key={task.id}
                          id={task.id}
                          description={task.description}
                          complete={task.complete}
                          onRename={newName => renameTask(index, newName)}
                          onTrash={() => removeTask(index)}
                          onToggle={done => updateTaskDone(index, done)} />
                  )) : <p>No tasks available</p>}
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/smtp-animation" element={<SmtpAnimation />} />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
