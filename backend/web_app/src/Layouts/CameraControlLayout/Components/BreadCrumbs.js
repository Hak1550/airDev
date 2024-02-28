import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import truncate from '../../../Utils/trancate';
import { Badge } from './styles';

export default function BreadCrumbs({ links = [], projectName = null }) {
  const { selectedProject } = useSelector(state => state.sidebar);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li
          className="breadcrumb-item"
          title={selectedProject?.name}
          key={'-1'}
        >
          <span style={{ textDecoration: 'none', color: '#667085' }}>
            {' '}
            {projectName || truncate(selectedProject?.name, 20)}{' '}
          </span>
        </li>
        {links.map((link, index) =>
          index < links.length - 1 ? (
            <li className="breadcrumb-item" key={index}>
              <Link
                to={link.href}
                style={{ textDecoration: 'none', color: '#667085' }}
              >
                {' '}
                {link.title}
              </Link>
            </li>
          ) : (
            <li
              className="breadcrumb-item active"
              aria-current="page"
              key={index}
            >
              <Badge>{link.title}</Badge>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
