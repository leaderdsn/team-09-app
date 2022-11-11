import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { themeChange } from 'theme-change';
import DarkLightMode from '@/components/ui/DarkLightMode';

export const TopHeader:React.FC = () => {
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
          <nav
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <NavLink to={'/'}>Главная</NavLink>
            </li>
            <li>
              <NavLink to={'/profile'}>Профиль</NavLink>
            </li>
            <li>
              <NavLink to={'/leaderboard'}>Лидеры</NavLink>
            </li>
            <li>
              <NavLink to={'/forum'}>Форум</NavLink>
            </li>
          </nav>
        </div>
        <Link to={'/'} className="btn-ghost btn text-xl normal-case">
          Agar.io
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <nav className="menu menu-horizontal p-0">
          <NavLink
            className={({ isActive }) => (isActive ? 'link-primary link pr-4' : 'pr-4')}
            to={'/'}
          >
            Главная
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link-primary link pr-4' : 'pr-4')}
            to={'/profile'}
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link-primary link pr-4' : 'pr-4')}
            to={'/leaderboard'}
          >
            Лидеры
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'link-primary link' : undefined)}
            to={'/forum'}
          >
            Форум
          </NavLink>
        </nav>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          <DarkLightMode />
        </div>
        <Link to={'/game'} className="btn">
          Играть
        </Link>
      </div>
    </div>
  );
};
