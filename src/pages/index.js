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
          <div className="aboutContainer">
            <div className="aboutBlock">
              <span className="aboutTitle">About R&D Kitchen</span>
              <div className="logoAndText">
                <div className="rndLogoContainer">
                  <img className="rndLogo" src={rndLogo} alt=""></img>
                </div>
                <div className="aboutParagraph">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 3) {
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
