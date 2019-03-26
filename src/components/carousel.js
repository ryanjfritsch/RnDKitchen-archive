import React, { Component } from 'react';
import { Link } from 'gatsby'

import './carousel.css';
import StarRating from './starsRating.js'

export default class Carousel extends Component {

    constructor(props) {
        super();
        this.state = { 
            scaleRatio: 1,
            windowWidthState: 1,
            allMealData: props.mealData,
            currentMealIndex: 0,
            nextMealIndex: 1,
            mealSlot0: props.mealData[0],
            mealSlot1: props.mealData[1],
            slotHiddenInd: 1,
            carouselCardMeal: props.mealData[0],
            currentLink: props.mealData[0].node.fields.slug
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

      }
      
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.setState({ currentLink: this.state.mealSlot0.node.fields.slug })


        this.interval = setInterval(() => {

            // set current index to next index, and next index to next+1 or start of array
            this.setState({ 
                currentMealIndex: this.state.nextMealIndex,
                nextMealIndex: this.state.nextMealIndex + 1
            })

            // if next is beyond array limit, reset to start
            if(this.state.nextMealIndex === this.state.allMealData.length){
                this.setState({ nextMealIndex: 0 })
            }

            // set hidden slot number to correct index
            if(this.state.slotHiddenInd === 0){
                this.setState({ slotHiddenInd: 1 })
                this.updateCarouselTable(1)
            } else if(this.state.slotHiddenInd === 1){
                this.setState({ slotHiddenInd: 0 })
                this.updateCarouselTable(0)
            }

            this.updateCarouselCard()

        }, 5000);
    }

    updateCarouselCard() {
        this.interval = setTimeout(() => {

            this.setState({ 
                carouselCardMeal: this.state.allMealData[this.state.currentMealIndex],
                currentLink: this.state.allMealData[this.state.currentMealIndex].node.fields.slug
            })
        
        }, 500);
    }


    updateCarouselTable(slotToChangeNum) {
        this.interval = setTimeout(() => {

            if(slotToChangeNum === 0){
                this.setState({ mealSlot0: this.state.allMealData[this.state.nextMealIndex] })
            } else if(slotToChangeNum === 1){
                this.setState({ mealSlot1: this.state.allMealData[this.state.nextMealIndex] })
            }

        }, 1000);
    }
      

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearInterval(this.interval);
    }
      

    updateWindowDimensions() {
        this.setState({ windowWidthState: window.innerWidth })
        if(window.innerWidth > 700){
            this.setState({ scaleRatio: window.innerWidth/1360 });
        } else { 
            this.setState({ scaleRatio: window.innerWidth/750 });
        }
    }

  

render() {
    const meal0Image = require('../images/carousel/'+this.state.mealSlot0.node.frontmatter.shortName+'.png');
    const meal1Image = require('../images/carousel/'+this.state.mealSlot1.node.frontmatter.shortName+'.png');

    var carouselWrapperStyle = { }

    if(this.state.windowWidthState > 700){
        carouselWrapperStyle = {
            "height": 718 * this.state.scaleRatio + "px"
        }
    } else {
        carouselWrapperStyle = {
            "height": 1100 * this.state.scaleRatio + "px"
        } 
    }

    var foodWrapperStyle = { 
        "transform": "scale(" + this.state.scaleRatio + ")",
        "transformOrigin": 'top left'
    }
    
    return (
        <div style={ carouselWrapperStyle }>

            <div id="rotatingFoodWrapper" style={ foodWrapperStyle }>

                <div id="tableWrapper">
                    <div id="table">
                        <div id="tableItemWrap1" className="tableItemWrapper">
                            <img id="tableItem1" className="tableItemImg" src={meal0Image} alt="" />
                        </div>
                        <div id="tableItemWrap2" className="tableItemWrapper">
                            <img id="tableItem2" className="tableItemImg" src={meal1Image} alt="" />
                        </div>
                    </div>
                </div>

                <Link to={this.state.currentLink}>
                    <div id="card">
                        <div className="cardContainer" id="cardContainer1">
                            <span className="carouselCardTitle">{this.state.carouselCardMeal.node.frontmatter.title}</span>
                            <span className="carouselCardDate">{this.state.carouselCardMeal.node.frontmatter.date}</span>
                            <StarRating rating={ this.state.carouselCardMeal.node.frontmatter.rating }></StarRating>
                            <div className="foodInformation">
                                <div className="foodInfoItem">
                                    <img src={require("../images/clock.png")} alt=""></img>
                                    <span>{this.state.carouselCardMeal.node.frontmatter.prepTime}</span>
                                </div>
                                <div className="foodInfoItem">
                                    <img src={require("../images/spatulaX.png")} alt=""></img>
                                    <span>{this.state.carouselCardMeal.node.frontmatter.difficulty}</span>
                                </div>
                                <div className="foodInfoItem">
                                    <img src={require("../images/checkMark.png")} alt=""></img>
                                    <span>{this.state.carouselCardMeal.node.frontmatter.ingredientCount}</span>
                                </div>
                                <div className="foodInfoItem">
                                    <img src={require("../images/flame.png")} alt=""></img>
                                    <span>{this.state.carouselCardMeal.node.frontmatter.heatLevel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>

        </div>
    );
  }
}
