import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import '../components/meal-card.css'


const AllMealsPage = (props) => {

  const mealList = props.data.allMarkdownRemark;

    return (
      <Layout>
        <div className="mealListWrapper">
          <div className="mealListContainer">
            {mealList.edges.map(({ node }, i) => (
                <Link to={node.fields.slug} className="link">
                    <div className="mealCard">
                      <h1>{node.frontmatter.title}</h1>
                      <Img fixed={mealList.edges[i].node.frontmatter.image.childImageSharp.fixed} />
                      <span>{node.frontmatter.date}</span>
                      <p>{node.excerpt}</p>
                    </div>
                </Link>
            ))}
          </div>
        </div>
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
            image {
              childImageSharp {
                  resize(width: 50, height: 50) {
                      src
                  }
                  fixed(width: 100, height: 100) {
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
