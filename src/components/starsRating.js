import React, { Component } from 'react';
// import Img from 'gatsby-image';

import './starsRating.css';

import orangeStar from '../images/orangeStar.png';
import blankStar from '../images/blankStar.png';


export default class Carousel extends Component {

    constructor(props) {
        super();
        this.state = { 
            stars: props.rating,
            blanks: 5 - props.rating
        };

      }

    render() {

        var stars = [];
        var blanks = [];

        for (var i = 0; i < this.state.stars; i++) { stars.push(<img className="starIcon" src={orangeStar}></img>); }
        for (var i = 0; i < this.state.blanks; i++) { stars.push(<img className="starIcon" src={blankStar}></img>); }
    
        return (
            <div>
                {stars}
                {blanks}
            </div>
        );
    }
}