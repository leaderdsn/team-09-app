import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { themeChange } from 'theme-change';
import DarkLightMode from '@/components/ui/DarkLightMode';
import { routes } from '@/router/routes';

export const TopHeader: React.FC = () => {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {routes.map((route, key) => (
              <li className="flex list-none" key={key}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => (isActive ? 'link-primary link pr-4' : 'pr-4')}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link to={'/'} className="btn-ghost btn text-xl normal-case">
          Agar.io
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" flex p-0">
          {routes.map((route, key) => (
            <li className="flex list-none" key={key}>
              <NavLink
                to={route.path}
                className={route.path === '/game' ? ' btn-warning  btn pr-4' : 'btn-ghost btn pr-4'}
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          <DarkLightMode />
        </div>
      </div>
    </div>
    //
  );
};
