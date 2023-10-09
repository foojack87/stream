'use client';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';


const Nav = () => {
  const navigate = useNavigate()
  const { currentUser, signOut } = useContext(AuthContext)

console.log(currentUser)
  return (
    <aside
      className={`md:static p-4 fixed md:w-auto w-full transition-all bg-gray-200 h-full top-0 'left-0'`}
    >
      <div className="mb-4 mr-4">
      </div>
      <nav className="flex flex-col gap-4">
      
        <button
          onClick={signOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;