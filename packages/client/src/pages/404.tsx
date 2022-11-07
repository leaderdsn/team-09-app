import React from "react";
import {Link} from "react-router-dom";

const Error404 = () => {
  return (
    <div className="container mx-auto">
      <h1>Ошибка</h1>
      <Link to={'/'}>
        <button className="text-sky-500 hover:text-sky-600">На главную</button>
      </Link>
    </div>
  )
}

export default Error404;