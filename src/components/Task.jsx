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
      className="task bg-white rounded-md shadow-md p-2 flex flex-col justify-between mb-2 cursor-move"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <div>{task.title}</div>
      <div className="bottomWrapper flex justify-between">
        <div>
          <img
            src={trash}
            onClick={() => deleteTask(task.title)}
            className="h-5 cursor-pointer"
            alt="Delete"
          />
        </div>
        <div
          className={classNames(
            'status p-1 rounded-md text-xs',
            {
              'bg-gray-light': task.state === 'ONGOING',
              'bg-done': task.state === 'DONE',
            }
          )}
        >
          {task.state}
        </div>
      </div>
    </div>
  );
}
