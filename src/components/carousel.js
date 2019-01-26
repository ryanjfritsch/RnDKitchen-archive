import React, { Component } from 'react';

import './carousel.css';

export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = { scaleRatio: 1 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ scaleRatio: window.innerWidth/1360 });
      }
  

  render() {
    return (
        <div id="rotatingFoodWrapper" style={{ zoom: this.state.scaleRatio }}>

        <div id="tableWrapper">
            <div id="table">
                <div id="tableItemWrap1" className="tableItemWrapper">
                    <img id="tableItem1" className="tableItemImg" src="salmonSalad.png" alt="" />
                </div>
                <div id="tableItemWrap2" className="tableItemWrapper">
                    <img id="tableItem2" className="tableItemImg" src="italianBeef.png" alt="" />
                </div>
            </div>
        </div>

        <div id="card">
          <span className="cardTitle">Salmon Avocado Salad </span>
          <div className="cardRating"></div>
          <p className="foodInformation"></p>
        </div>

      </div>
    );
  }
}