import { useState, useEffect } from 'react';
import { auth, firestore } from './../firebase';

function Dashboard() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Get the role from Firestore
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserRole(doc.data().role);
            }
          });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        {userRole === '' ? (
          <p className="text-gray-600">Loading...</p>
        ) : userRole === 'admin' ? (
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Welcome, Admin!</h1>
            <p className="text-gray-700 mt-2">You have full access to the system.</p>
          </div>
        ) : userRole === 'user' ? (
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Welcome, User!</h1>
            <p className="text-gray-700 mt-2">You have limited access to the system.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
