import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DarkLightMode from '@/components/UI/DarkLightMode'
import { themeChange } from 'theme-change'

export const TopHeader: React.FC = () => {
  
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <nav tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><NavLink to={'/'}>Главная</NavLink></li>
            <li><NavLink to={'/profile'}>Профиль</NavLink></li>
            <li><NavLink to={'/leaderboard'}>Лидеры</NavLink></li>
            <li><NavLink to={'/forum'}>Форум</NavLink></li>
          </nav>
        </div>
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">Agar.io</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <nav className="menu menu-horizontal p-0">
          <NavLink className={({ isActive }) => (isActive ? "link link-primary pr-4" : "pr-4")} to={'/'}>Главная</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link link-primary pr-4" : "pr-4")} to={'/profile'}>Профиль</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link link-primary pr-4" : "pr-4")} to={'/leaderboard'}>Лидеры</NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link link-primary" : undefined)} to={'/forum'}>Форум</NavLink>
        </nav>
      </div>
      <div className="navbar-end">
        <div className="mr-2">
          <DarkLightMode />
        </div>
        <Link to={'/game'} className="btn">Играть</Link>
      </div>
    </div>
  )
}