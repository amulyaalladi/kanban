import React from 'react';
import { Trash2, MoveRight, MoveLeft } from 'lucide-react';

const priorityColors = {
  Low: 'bg-green-100 text-green-800 border-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  High: 'bg-red-100 text-red-800 border-red-300',
};

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const nextStatus = {
    'todo': 'in-progress',
    'in-progress': 'done',
    'done': null
  };

  const prevStatus = {
    'todo': null,
    'in-progress': 'todo',
    'done': 'in-progress'
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-slate-800 text-base">{task.title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
        <div className="flex space-x-1">
          {prevStatus[task.status] && (
            <button 
              onClick={() => onStatusChange(task._id, prevStatus[task.status])}
              className="p-1 text-slate-500 hover:bg-slate-100 rounded" 
              title="Move left"
            >
              <MoveLeft size={16} />
            </button>
          )}
          {nextStatus[task.status] && (
            <button 
              onClick={() => onStatusChange(task._id, nextStatus[task.status])}
              className="p-1 text-slate-500 hover:bg-slate-100 rounded" 
              title="Move right"
            >
              <MoveRight size={16} />
            </button>
          )}
        </div>
        <button 
          onClick={() => onDelete(task._id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}