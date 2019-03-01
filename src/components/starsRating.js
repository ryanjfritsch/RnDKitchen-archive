import React, { Component } from 'react';
// import Img from 'gatsby-image';

import './starsRating.css';

import orangeStar from '../images/orangeStar.png';
import blankStar from '../images/blankStar.png';


export default class StarsRating extends Component {

    constructor(props) {
        super();
        this.state = { 
            stars: props.rating,
            blanks: 5 - props.rating
        };

      }

      UNSAFE_componentWillReceiveProps(props) {
        this.setState({ 
            stars: props.rating,
            blanks: 5 - props.rating
        });
      }

    render() {

        var stars = [];
        var blanks = [];

        for (var i = 0; i < this.state.stars; i++) { stars.push(<img className="starIcon" src={orangeStar} alt=""></img>); }
        for (var j = 0; j < this.state.blanks; j++) { stars.push(<img className="starIcon" src={blankStar} alt=""></img>); }
    
        return (
            <div>
                {stars}
                {blanks}
            </div>
        );
    }
}