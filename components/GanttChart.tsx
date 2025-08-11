import React from 'react';
import { Task } from '../types';

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
      <div className="grid grid-cols-12 gap-x-4 text-xs text-gray-500 font-bold mb-2">
        <div className="col-span-3">Task / Assignee</div>
        <div className="col-span-9">Timeline</div>
      </div>
      {tasks.map(task => (
        <div key={task.id} className="grid grid-cols-12 gap-x-4 items-center h-12">
          <div className="col-span-3 text-sm truncate">
            <p className="font-semibold text-gray-800">{task.name}</p>
            <p className="text-xs text-gray-500">{task.assignee}</p>
          </div>
          <div className="col-span-9 h-8 bg-gray-100 rounded-lg relative">
            <div
              className="absolute h-full rounded-lg flex items-center px-2"
              style={{
                left: `${task.start}%`,
                width: `${task.duration}%`,
                backgroundColor: task.color,
              }}
            >
              <span className="text-xs font-bold text-white truncate">{task.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GanttChart;