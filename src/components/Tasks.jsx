import { useState, useEffect } from 'react';
import { firestore } from './../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
  const [updateTaskName, setUpdateTaskName] = useState('');
  const [updateTaskDeadline, setUpdateTaskDeadline] = useState('');

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(firestore, 'tasks');
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    };

    fetchTasks();
  }, []);

  // Create a new task
  const handleCreateTask = async () => {
    if (!taskName.trim() || !deadline.trim()) {
      alert('Please provide both task name and deadline');
      return;
    }

    const tasksCollection = collection(firestore, 'tasks');
    const newTask = { name: taskName, deadline: deadline };
    const docRef = await addDoc(tasksCollection, newTask);

    setTasks([...tasks, { id: docRef.id, ...newTask }]);
    setTaskName('');
    setDeadline('');
    alert('Task created successfully');
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    const taskDoc = doc(firestore, 'tasks', taskId);
    await deleteDoc(taskDoc);
    setTasks(tasks.filter((task) => task.id !== taskId));
    alert('Task deleted successfully');
  };

  // Update a task
  const handleUpdateTask = async () => {
    if (!updateTaskName.trim() || !updateTaskDeadline.trim()) {
      alert('Please provide both updated task name and deadline');
      return;
    }

    const taskDoc = doc(firestore, 'tasks', updateTaskId);
    await updateDoc(taskDoc, {
      name: updateTaskName,
      deadline: updateTaskDeadline,
    });

    setTasks(
      tasks.map((task) =>
        task.id === updateTaskId
          ? { ...task, name: updateTaskName, deadline: updateTaskDeadline }
          : task
      )
    );

    setUpdateTaskId('');
    setUpdateTaskName('');
    setUpdateTaskDeadline('');
    alert('Task updated successfully');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>

      {/* List of Tasks */}
      <div className="w-full max-w-md mb-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center p-4 bg-white rounded shadow mb-4"
            >
              <div>
                <p className="font-semibold">{task.name}</p>
                <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>

      {/* Create Task */}
      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-2 focus:outline-none"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <button
          onClick={handleCreateTask}
          className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Create New Task
        </button>
      </div>

      {/* Update Task */}
      <div className="w-full max-w-md">
        <select
          value={updateTaskId}
          onChange={(e) => setUpdateTaskId(e.target.value)}
          className="w-full px-4 py-2 mb-2 border rounded focus:outline-none"
        >
          <option value="">Select a task to update</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Updated Task Name"
          value={updateTaskName}
          onChange={(e) => setUpdateTaskName(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <input
          type="date"
          value={updateTaskDeadline}
          onChange={(e) => setUpdateTaskDeadline(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <button
          onClick={handleUpdateTask}
          className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

export default Tasks;
