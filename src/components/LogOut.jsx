import { signOut } from 'firebase/auth';
import { auth } from './../firebase';

function Logout() {
  const handleLogout = async () => {
    await signOut(auth);
    alert('Logged out successfully!');
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}

export default Logout;
