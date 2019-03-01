import React, { Component } from 'react';
// import Img from 'gatsby-image';

import './carousel.css';
import StarRating from './starsRating.js'

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
        // this.interval = setTimeout(() => {
            if(currentMeal === 1){
                this.setState({ currentMealShowing: this.state.meal1 })
            }
            else if(currentMeal === 2){
                this.setState({ currentMealShowing: this.state.meal2 })
            }
            else if(currentMeal === 3){
                this.setState({ currentMealShowing: this.state.meal3 })
            }
        // }, 50);
      }

      updateCarouselTable(mealNum) {
        this.interval = setTimeout(() => {
            if(this.state.changeTableSpot === 1){
                     if(mealNum === 1){ this.setState({ mealPic1: this.state.meal1 }) }
                else if(mealNum === 2){ this.setState({ mealPic1: this.state.meal2 }) }
                else if(mealNum === 3){ this.setState({ mealPic1: this.state.meal3 }) }
                this.setState({ changeTableSpot: 2 })
            } 
            else if(this.state.changeTableSpot === 2){
                     if(mealNum === 1){ this.setState({ mealPic2: this.state.meal1 }) }
                else if(mealNum === 2){ this.setState({ mealPic2: this.state.meal2 }) }
                else if(mealNum === 3){ this.setState({ mealPic2: this.state.meal3 }) }
                this.setState({ changeTableSpot: 1 })
            }
        }, 1000);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearInterval(this.interval);
      }
      
    updateWindowDimensions() {
        if(window.innerWidth > 700){
            this.setState({ scaleRatio: window.innerWidth/1360 });
        } else { 
            this.setState({ scaleRatio: window.innerWidth/750 });
        }
    }

  

render() {
    const meal1Image = require('../images/carousel/'+this.state.mealPic1.frontmatter.shortName+'.png');
    const meal2Image = require('../images/carousel/'+this.state.mealPic2.frontmatter.shortName+'.png');

    return (
        <div id="rotatingFoodWrapper" style={{ zoom: this.state.scaleRatio }}>
            {/* <span id="recentMealsText">Recent Meals</span> */}

            <div id="tableWrapper">
                <div id="table">
                    <div id="tableItemWrap1" className="tableItemWrapper">
                        <img id="tableItem1" className="tableItemImg" src={meal1Image} alt="" />
                    </div>
                    <div id="tableItemWrap2" className="tableItemWrapper">
                        <img id="tableItem2" className="tableItemImg" src={meal2Image} alt="" />
                    </div>
                </div>
            </div>

            <div id="card">
                <div className="cardContainer" id="cardContainer1">
                    <span className="carouselCardTitle">{this.state.meal1.frontmatter.title}</span>
                    <span className="carouselCardDate">{this.state.meal1.frontmatter.date}</span>
                    <StarRating rating={ this.state.meal1.frontmatter.rating }></StarRating>
                    <div className="foodInformation">
                        <div className="foodInfoItem">
                            <img src={require("../images/clock.png")} alt=""></img>
                            <span>{this.state.meal1.frontmatter.prepTime}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/spatulaX.png")} alt=""></img>
                            <span>{this.state.meal1.frontmatter.difficulty}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/checkMark.png")} alt=""></img>
                            <span>{this.state.meal1.frontmatter.ingredientCount}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/flame.png")} alt=""></img>
                            <span>{this.state.meal1.frontmatter.heatLevel}</span>
                        </div>
                    </div>
                </div>
                <div className="cardContainer" id="cardContainer2">
                    <span className="carouselCardTitle">{this.state.meal2.frontmatter.title}</span>
                    <span className="carouselCardDate">{this.state.meal2.frontmatter.date}</span>
                    <StarRating rating={ this.state.meal2.frontmatter.rating }></StarRating>
                    <div className="foodInformation">
                        <div className="foodInfoItem">
                            <img src={require("../images/clock.png")} alt=""></img>
                            <span>{this.state.meal2.frontmatter.prepTime}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/spatulaX.png")} alt=""></img>
                            <span>{this.state.meal2.frontmatter.difficulty}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/checkMark.png")} alt=""></img>
                            <span>{this.state.meal2.frontmatter.ingredientCount}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/flame.png")} alt=""></img>
                            <span>{this.state.meal2.frontmatter.heatLevel}</span>
                        </div>
                    </div>
                </div>
                <div className="cardContainer" id="cardContainer3">
                    <span className="carouselCardTitle">{this.state.meal3.frontmatter.title}</span>
                    <span className="carouselCardDate">{this.state.meal3.frontmatter.date}</span>
                    <StarRating rating={ this.state.meal3.frontmatter.rating }></StarRating>
                    <div className="foodInformation">
                        <div className="foodInfoItem">
                            <img src={require("../images/clock.png")} alt=""></img>
                            <span>{this.state.meal3.frontmatter.prepTime}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/spatulaX.png")} alt=""></img>
                            <span>{this.state.meal3.frontmatter.difficulty}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/checkMark.png")} alt=""></img>
                            <span>{this.state.meal3.frontmatter.ingredientCount}</span>
                        </div>
                        <div className="foodInfoItem">
                            <img src={require("../images/flame.png")} alt=""></img>
                            <span>{this.state.meal3.frontmatter.heatLevel}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="carouselProgress">
                <div id="cProg1" className="cProgBar"></div>
                <div id="cProg2" className="cProgBar"></div>
                <div id="cProg3" className="cProgBar"></div>
            </div>

        </div>
    );
  }
}
