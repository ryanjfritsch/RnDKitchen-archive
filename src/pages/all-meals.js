import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import { graphql } from 'gatsby'
import DocumentTitle from 'react-document-title'

import Layout from '../components/layout'

import StarsRating from '../components/starsRating.js'

import './meal-card.css'


const AllMealsPage = (props) => {

  const mealList = props.data.allMarkdownRemark;

    return (
      <DocumentTitle title="All Recipes">
        <Layout>
          <div className="mealListWrapper">
            <div className="allRecipesTitle">All Recipes</div>
            <div className="allRecipesTitleDetail">(most recent shown first)</div>
            <div className="mealListContainer">
              {mealList.edges.map(({ node }, i) => (
                  <Link to={node.fields.slug} className="link">
                      
                      <div className="mealCard">
                        <div>
                          <Img fixed={mealList.edges[i].node.frontmatter.image.childImageSharp.fixed}/>
                        </div>
                        <div className="mealCardLowerHalf">
                          <span className="mealCardTitle">{node.frontmatter.title}</span>
                          <span className="mealCardDate">{node.frontmatter.date}</span>
                          <StarsRating rating={ node.frontmatter.rating }></StarsRating>
                        </div>
                      </div>

                  </Link>
              ))}
            </div>
          </div>
          <div id="mealListFooter" style={{ height: '100px', width: '100%' }}></div>
        </Layout>
      </DocumentTitle>
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
            flair
            image {
              childImageSharp {
                  fixed(width: 300, height: 300) {
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
