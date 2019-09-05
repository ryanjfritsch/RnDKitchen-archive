import React, { Component } from 'react'
// import Img from 'gatsby-image';

import StarsRating from '../components/starsRating.js'

import './starsRating.css'

import './meal-card.css'

export default class MealCard extends Component {
  constructor(props) {
    super()
    this.state = {
      rating: props.rating,
      imageName: props.imageName,
      date: props.date,
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      rating: props.rating,
      imageName: props.imageName,
      date: props.date,
    })
  }

  render() {
    const mealImage = require('../images/headers/' +
      this.props.imageName +
      '.jpg')

    return (
      <div className="mealCard">
        <div>
          <img
            className="cardImage"
            src={mealImage}
            alt=""
            style={{ width: '300', height: '300' }}
          />
        </div>
        <div className="mealCardLowerHalf">
          <span className="mealCardTitle">{this.props.title}</span>
          <span className="mealCardDate">{this.props.date}</span>
          <StarsRating rating={this.state.rating} />
        </div>
      </div>
    )
  }
}
