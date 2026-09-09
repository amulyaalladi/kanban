import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { Plus, LogOut, Layout } from 'lucide-react';
import { API_URL } from '../config';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-200 text-slate-700' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  { id: 'done', title: 'Completed', color: 'bg-green-100 text-green-700' },
];

export default function Dashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState('todo');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    if(!token) return;
    try{
    const res = await fetch(`${API_URL}/api/boards`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      if (res.status === 401) logout();
      return;
    }
    const data = await res.json();
    if (data && data.length > 0) {
      setBoard(data[0]);
      fetchTasks(data[0]._id);
    }
  }  catch (err) {
    console.error('Error fetching boards:', err);
  }
};

  const fetchTasks = async (boardId) => {
    if(!token || !boardId) return;
    try{
    const res = await fetch(`${API_URL}/api/tasks/${boardId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};

  const handleCreateTask = async (taskData) => {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...taskData, boardId: board._id })
    });
    if (res.ok) {
    const newTask = await res.json();
    setTasks(prev => [...prev, newTask]);
  }

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    const updated = await res.json();
    setTasks(tasks.map(t => t._id === taskId ? updated : t));
  };

  const handleDeleteTask = async (taskId) => {
    await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Layout size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{board?.title || 'Workspace'}</h1>
            <p className="text-xs text-slate-500">Logged in as {user?.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-slate-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </header>

      {/* Board Canvas */}
      <main className="flex-1 p-6 overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto h-full items-start">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 flex flex-col max-h-[80vh]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${col.color}`}>
                      {col.title}
                    </span>
                    <span className="text-slate-400 text-sm font-medium">{colTasks.length}</span>
                  </div>
                  <button
                    onClick={() => { setActiveColumn(col.id); setIsModalOpen(true); }}
                    className="p-1 text-slate-500 hover:bg-slate-200 rounded-md transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {colTasks.map(task => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                  {colTasks.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                      No tasks in {col.title.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
        currentStatus={activeColumn}
      />
    </div>
  );
}
