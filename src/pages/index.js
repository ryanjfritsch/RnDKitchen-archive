import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image';

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import './post.css';

const IndexPage = (props) => {

    const postList = props.data.allMarkdownRemark;

    console.log(props.data)

    return (
      <Layout>
        <h3>Carousel Coming Soon</h3>
        {/* {postList.edges.map(({ node }, i) => (
          <Link to={node.fields.slug} className="link">
            <div className="post-list">
              <h1>{node.frontmatter.title}</h1>
              <Img fixed={postList.edges[i].node.frontmatter.image.childImageSharp.fixed} />
              <span>{node.frontmatter.date}</span>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))} */}
      </Layout>
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
