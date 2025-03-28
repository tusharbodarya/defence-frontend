import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      <ul className="flex space-x-2 text-sm lg:text-lg xl:text-xl">
        {paths.map((path, index) => (
          <li key={index}>
            {index < paths.length - 1 ? (
              <Link to={path.link} className="text-blue-600 hover:underline">
                {path.name}
              </Link>
            ) : (
              <span>{path.name}</span>
            )}
          </li>
        ))}
      </ul>
     </nav>
  );
};

export default Breadcrumbs;
