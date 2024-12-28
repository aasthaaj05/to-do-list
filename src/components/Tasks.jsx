import { useState, useEffect } from 'react';
import { firestore } from './../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
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

      // Sort tasks by deadline (closest first)
      const sortedTasks = taskList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      setTasks(sortedTasks);
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

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, { id: docRef.id, ...newTask }];
      return updatedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    });
    setTaskName('');
    setDeadline('');
    alert('Task created successfully');
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    const taskDoc = doc(firestore, 'tasks', taskId);
    await deleteDoc(taskDoc);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    });
    alert('Task deleted successfully');
  };

  // Update a task's deadline
  const handleUpdateTask = async () => {
    if (!updateTaskDeadline.trim()) {
      alert('Please provide an updated deadline');
      return;
    }

    const taskDoc = doc(firestore, 'tasks', updateTaskId);
    await updateDoc(taskDoc, {
      deadline: updateTaskDeadline,
    });

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updateTaskId ? { ...task, deadline: updateTaskDeadline } : task
      );
      return updatedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    });

    setUpdateTaskId('');
    setUpdateTaskDeadline('');
    alert('Task deadline updated successfully');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Task Management</h1>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
              >
                <div>
                  <p className="font-semibold text-gray-800">{task.name}</p>
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
            <p className="text-center text-gray-500">No tasks found</p>
          )}
        </div>

        {/* Create Task */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleCreateTask}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Create Task
          </button>
        </div>

        {/* Update Task */}
        <div className="space-y-2">
          <select
            value={updateTaskId}
            onChange={(e) => setUpdateTaskId(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select a task to update</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={updateTaskDeadline}
            onChange={(e) => setUpdateTaskDeadline(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleUpdateTask}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Deadline
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
