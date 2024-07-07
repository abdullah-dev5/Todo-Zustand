import React, { useState } from 'react';
import Task from './Task';
import { useStore } from '../store';
import { useEffect } from 'react';
import classNames from 'classnames';

export default function Column({ state }) {
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

  return (
    <div
      className={classNames(
        'column',
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
      <div className="bg-gray-dark min-h-20rem text-white w-80 max-w-20rem m-2 rounded p-2">
        <div className="titleWrapper flex justify-between items-center">
          <p>{state}</p>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-2 py-1 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
        {tasks.map((task) => (
          <Task title={task.title} key={task.id} />
        ))}
        {open && (
          <div className="Modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
            <div className="modalContent bg-white rounded p-4 flex justify-center items-center">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="border p-2 rounded mr-2"
                placeholder="Enter task title"
              />
              <button
                onClick={() => {
                  addTask(text, state);
                  setText('');
                  setOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
