import React from 'react';
import classNames from 'classnames';
import { useStore } from '../store';
import trash from '../assets/trash-2.svg';

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div
      className="task bg-yellow-200 rounded-lg shadow-md p-4 flex flex-col justify-between mb-4 cursor-move"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <div className="text-xl font-medium mb-2">{task.title}</div>
      <div className="bottomWrapper flex justify-between items-center">
        <img
          src={trash}
          onClick={() => deleteTask(task.title)}
          className="h-6 w-6 cursor-pointer"
          alt="Delete"
        />
        <div
          className={classNames('status px-2 py-1 rounded-md text-sm font-bold', {
            'bg-gray-200 text-gray-800': task.state === 'ONGOING',
            'bg-gray-300 text-gray-700': task.state === 'DONE',
          })}
        >
          {task.state}
        </div>
      </div>
    </div>
  );
}
