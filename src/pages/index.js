import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Carousel from '../components/carousel';

const IndexPage = (props) => {

  const recentMealsList = props.data.allMarkdownRemark.edges;

  console.log(recentMealsList)

    return (
      <Layout title="R&D Kitchen">
        <Carousel mealData={recentMealsList}></Carousel>
        <div style={{ width: '100%', height: '500px' }}>
          <h4>About RnD Kitchen</h4>
        </div>
      </Layout>
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
