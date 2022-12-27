import React from 'react'
import AuthController from '@/controllers/AuthController'

const Home = () => {
  const handleOAuthButtonClick = () => {
    AuthController.signinOAuthBegin()
  }

  const handleLogoutButtonClick = () => {
    AuthController.logout()
  }

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <form className='form-body'>
              <div className='form-control mt-6'>
                <div className='btn btn-primary' onClick={handleOAuthButtonClick}>OAuth</div>
              </div>
              <div className='form-control mt-6'>
                <div className='btn btn-primary' onClick={handleLogoutButtonClick}>Logout</div>
              </div>
            </form>
          </div>
        </div>
        <div className='divider divider-horizontal'>ИЛИ</div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <form className='form-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Username</span>
                </label>
                <input type='text' placeholder='username' className='input input-bordered' />
              </div>
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Играть</button>
              </div>
            </form>
          </div>
        </div>
        <div className='divider divider-horizontal'>ИЛИ</div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='tabs tabs-boxed'>
              <a className='tab tab-active'>Вход</a>
              <a className='tab'>Регистрация</a>
            </div>
            <form className='form-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Username</span>
                </label>
                <input type='text' placeholder='username' className='input input-bordered' />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input type='text' placeholder='password' className='input input-bordered' />
              </div>
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Войти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
