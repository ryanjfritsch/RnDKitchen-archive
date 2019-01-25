import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import './header.css'


const Header = ({ siteTitle }) => (
  <div class="header">
    <div class="headerTextItems">
      <Link to="/" 
        style={{ textDecoration: 'none' }}
        activeStyle={{ cursor: 'default' }}>
        <span id="FYRlogo">FYR</span>
        <span id="fyrText">Food Year's Resolution</span>
      </Link>
      <div class="subHeaderText" id="rightHeaderText">
          <Link to="all-meals"
            className="headerNav"
            activeClassName="headerNav"
            activeStyle={{ color: '#E8E8EB', cursor: 'default' }}
            >All Meals</Link>
          <span class="headerNav">Calendar</span>
          <span class="headerNav navLast">About</span>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
