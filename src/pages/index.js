import React from 'react'
import { graphql } from 'gatsby'
import DocumentTitle from 'react-document-title'


import Layout from '../components/layout'
import Carousel from '../components/carousel';

import './aboutBlock.css';

import rndLogo from '../images/circleLogoMD.png'

const IndexPage = (props) => {

  const recentMealsList = props.data.allMarkdownRemark.edges;

  //console.log(recentMealsList)

    return (
      <DocumentTitle title="R&D Kitchen">
        <Layout title="R&D Kitchen">
          <Carousel mealData={recentMealsList}></Carousel>
          <div className="aboutContainer" id="about">
            <div className="aboutBlock">
              <span className="aboutTitle">About R&D Kitchen</span>
              <div className="logoAndText">
                <div className="rndLogoContainer">
                  <img className="rndLogo" src={rndLogo} alt=""></img>
                </div>
                <div className="aboutParagraph">
                  Welcome to R&D (Research and Development) Kitchen! My name is Ryan Fritsch, and I am both the developer of this website and chef of the food you see. After being asked a few times by family members what things I enjoyed cooking in 2018, and only being able to respond with "Well I made a lot of chicken, rice, and veggies... sometimes I made pasta with different sauces...", I realized that I needed to improve my cooking skills. With that in mind, I declared my 2019 New Year's Resolution would be to cook (or bake) one new meal that I had never made before every week of the year. How hard could that be? I figured I was going to be making food at home most nights anyways, so why not branch out and try making new things. Plus, at the end of the year, I would have 52 new meals I knew how to cook in my repertoire. 
                  <br></br><br></br>But what's the point of completing this challenge if I didn't have a way to document my creations and share them with friends/family? I decided to put my web development software knowledge to use, and created this site (using ReactJS/GatsbyJS and Heroku, for any software people reading this). Each meal page will have a photograph, rating, description, ingredients list, and cooking instructions. Like a normal recipe website, every recipe will have its own page and internet URL which can be bookmarked, or shared with friends and family. When the year is over, I will be able to go back and reference any of the 52 meals I made, and the instructions for making the meal again will be right there. I think it will be a great project when it's all said and done! It should be a fun year of Researching new recipes, and Developing my cooking skills, as well as this website.
                  <br></br><br></br>Thank you for visiting R&D Kitchen, and I hope you enjoy the food!
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </DocumentTitle>
    )

}

export default IndexPage


export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
            shortName
            rating
            prepTime
            ingredientCount
            difficulty
            heatLevel
            image {
              childImageSharp {
                  fixed(width: 330, height: 330) {
                    ...GatsbyImageSharpFixed
                  }
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
              }
            }
          }
        }
      }
    }
  }
`
