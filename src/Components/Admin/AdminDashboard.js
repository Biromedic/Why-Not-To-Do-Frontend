import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';
import TaskListAdmin from './TaskListAdmin';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      if (!id) {
        console.error('Invalid ID');
        return;
      }
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserList users={users} onDeleteUser={handleDeleteUser} />
      <TaskListAdmin tasks={tasks} />
    </div>
  );
}

export default AdminDashboard;
