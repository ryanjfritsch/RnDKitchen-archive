import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import Img from 'gatsby-image';

import StarRating from '../components/starsRating.js'

import './recipePage.css'


function BlogPost(props) {

    const post = props.data.markdownRemark;
    const { title } = post.frontmatter;
    const { stepbysteprecipe } = post.frontmatter;
    const { rating } = post.frontmatter;

    return (
        <Layout>
            <div className="recipePage">
                
                <div className="recipeHeader">
                    <div className="recipeTextInfo">
                        <h1>{title}</h1>
                        <StarRating rating={ rating }></StarRating>
                        <p className="recipeSummary">{stepbysteprecipe}</p>
                    </div>
                    <div className="recipeImageWrapper">
                        <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                    </div>
                    
                </div>
                <div className="recipeInstructions" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
    )

}

export default BlogPost

export const query = graphql`
    query PostQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                rating
                stepbysteprecipe
                image {
                    childImageSharp {
                        resize(width: 50, height: 50) {
                            src
                        }
                        fluid(maxWidth: 700) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }`