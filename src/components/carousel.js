import React, { Component } from 'react';
// import Img from 'gatsby-image';

import './carousel.css';

export default class Carousel extends Component {

    constructor(props) {
        super();
        this.state = { 
            scaleRatio: 1,
            meal1: props.mealData[0].node,
            meal2: props.mealData[1].node,
            meal3: props.mealData[2].node,
            currentMealShowing: props.mealData[0].node,
            changeTableSpot: 1,
            mealPic1: props.mealData[0].node,
            mealPic2: props.mealData[1].node
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.setState({ currentMealShowing: this.state.meal1 })

        this.setState({ mealPic1: this.state.meal1 })
        this.setState({ mealPic2: this.state.meal2 })

        this.interval = setInterval(() => {

            if(this.state.currentMealShowing === this.state.meal1){ // meal 1 is showing, meal 2 is next
                this.updateCarouselCard(2)
                this.updateCarouselTable(3)
            }
            else if(this.state.currentMealShowing === this.state.meal2){
                this.updateCarouselCard(3)
                this.updateCarouselTable(1)
            }
            else if(this.state.currentMealShowing === this.state.meal3){
                this.updateCarouselCard(1)
                this.updateCarouselTable(2)
            }

        }, 5000);
      }

      updateCarouselCard(currentMeal) {
        this.interval = setTimeout(() => {
            if(currentMeal === 1){
                this.setState({ currentMealShowing: this.state.meal1 })
            }
            else if(currentMeal === 2){
                this.setState({ currentMealShowing: this.state.meal2 })
            }
            else if(currentMeal === 3){
                this.setState({ currentMealShowing: this.state.meal3 })
            }
        }, 500);
      }

      updateCarouselTable(mealNum) {
        this.interval = setTimeout(() => {
            if(this.state.changeTableSpot === 1){
                if(mealNum === 1){ this.setState({ mealPic1: this.state.meal1 }) }
                else if(mealNum === 2){ this.setState({ mealPic1: this.state.meal2 })}
                else if(mealNum === 3){ this.setState({ mealPic1: this.state.meal3 })}
                this.setState({ changeTableSpot: 2 })
            } 
            else if(this.state.changeTableSpot === 2){
                if(mealNum === 1){ this.setState({ mealPic2: this.state.meal1 }) }
                else if(mealNum === 2){ this.setState({ mealPic2: this.state.meal2 })}
                else if(mealNum === 3){ this.setState({ mealPic2: this.state.meal3 })}
                this.setState({ changeTableSpot: 1 })
            }
        }, 1000);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearInterval(this.interval);
      }
      
      updateWindowDimensions() {
        this.setState({ scaleRatio: window.innerWidth/1360 });
      }

  

render() {
    const meal1Image = require('../images/'+this.state.mealPic1.frontmatter.shortName+'.png');
    const meal2Image = require('../images/'+this.state.mealPic2.frontmatter.shortName+'.png');

    return (
        <div id="rotatingFoodWrapper" style={{ zoom: this.state.scaleRatio }}>

        <div id="tableWrapper">
            <div id="table">
                <div id="tableItemWrap1" className="tableItemWrapper">
                    <img id="tableItem1" className="tableItemImg" src={meal1Image} alt="" />
                    {/* <Img id="tableItem1" className="tableItemImg" fixed={this.state.mealPic1.frontmatter.image.childImageSharp.fixed} /> */}
                </div>
                <div id="tableItemWrap2" className="tableItemWrapper">
                    <img id="tableItem2" className="tableItemImg" src={meal2Image} alt="" />
                    {/* <Img id="tableItem1" className="tableItemImg" fixed={this.state.mealPic2.frontmatter.image.childImageSharp.fixed} /> */}
                </div>
            </div>
        </div>

        <div id="card">
          {/* <span className="cardTitle">{this.state.currentMealShowing.frontmatter.title}</span> */}
          <span className="cardTitle">{this.state.currentMealShowing.frontmatter.title}</span>
          <p className="foodInformation"></p>
        </div>

      </div>
    );
  }
}
