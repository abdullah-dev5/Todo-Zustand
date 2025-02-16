import React, { useState } from 'react';
import Task from './Task';
import { useStore } from '../store';
import classNames from 'classnames';

const Column = ({ state }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const columnBgColors = {
    PLANNED: 'bg-blue-200',
    ONGOING: 'bg-yellow-200',
    DONE: 'bg-green-200',
  };

  return (
    <div
      className={classNames(
        'column p-2',
        { 'border-white border-dashed border-4': drop }
      )}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className={`text-black w-80 max-w-xs m-2 rounded-lg p-4 ${columnBgColors[state]}`}>
        <div className="titleWrapper flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">{state}</p>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-3 py-2 rounded-md cursor-pointer"
          >
            Add Task
          </button>
        </div>
        {tasks.map((task) => (
          <Task title={task.title} key={task.id} columnState={state} />
        ))}
        {open && (
          <div className="Modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modalContent bg-white rounded-lg p-6 flex items-center">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="border p-3 rounded-md mr-3 w-60"
                placeholder="Enter task title"
              />
              <button
                onClick={() => {
                  addTask(text, state);
                  setText('');
                  setOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
