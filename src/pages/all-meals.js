import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import StarsRating from '../components/starsRating.js'

import './meal-card.css'


const AllMealsPage = (props) => {

  const mealList = props.data.allMarkdownRemark;

    return (
      <Layout>
        <div className="mealListWrapper">
          <div className="mealListContainer">
            {mealList.edges.map(({ node }, i) => (
                <Link to={node.fields.slug} className="link">
                    
                    <div className="mealCard">
                      <Img fixed={mealList.edges[i].node.frontmatter.image.childImageSharp.fixed} style={{ marginBottom: '28px' }}/>
                      <span className="mealCardTitle">{node.frontmatter.title}</span>
                      <span className="mealCardDate">{node.frontmatter.date}</span>
                      <StarsRating rating={ node.frontmatter.rating }></StarsRating>
                    </div>

                </Link>
            ))}
          </div>
        </div>
        <div id="mealListFooter" style={{ height: '100px', width: '100%' }}></div>
      </Layout>
    )

}

export default AllMealsPage

export const mealQuery = graphql`
  query MealQuery {
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
            rating
            image {
              childImageSharp {
                  fixed(width: 270, height: 270) {
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
