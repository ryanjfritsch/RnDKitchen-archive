import React, { Component } from 'react';

import './carousel.css';

export default class Carousel extends Component {

    // const postList = props.data.allMarkdownRemark;

    state = {
      windowHeight: undefined,
      windowWidth: undefined,
      scaleRatio: undefined
    }
  
    handleResize = () => this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      scaleRatio: this.state.windowWidth/1360
    });
  
    componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    // handleResize();
  

  render() {
    return (
        <div id="rotatingFoodWrapper" style={{ zoom: window.innerWidth/1360 }}>

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