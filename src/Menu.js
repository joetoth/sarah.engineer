import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => (
    <div className="flex grand-hotel">
        <Link className="margin-10-l menu-link" to="/about">About</Link>
        <Link className="margin-10-l menu-link" to="/game">Game</Link>
    </div>
);
export default Menu;
