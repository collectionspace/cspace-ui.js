import React from 'react';
import { Link } from 'react-router';

const logoUrl = require('../images/logo.png');

export default props => (
  <header>
      <Link to="/"><img src={logoUrl} style={{ height: '44px' }} /></Link>
  </header>
);
