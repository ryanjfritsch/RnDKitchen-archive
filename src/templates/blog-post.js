import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby'
import Img from 'gatsby-image';
import DocumentTitle from 'react-document-title'

import StarRating from '../components/starsRating.js'

import './recipePage.css'


function BlogPost(props) {

    const post = props.data.markdownRemark;
    const { title } = post.frontmatter;
    const { recipeIntroParagraph } = post.frontmatter;
    const { rating } = post.frontmatter;
    const { sourceLink } = post.frontmatter;
    const { sourceWebsite } = post.frontmatter;

    var sourceClass = "recipeSourceLink";
    if(sourceLink === ''){ sourceClass = "recipeSourceHidden" }

    document.title = title

    return (
        <DocumentTitle title={ title }>
            <Layout>
                <div className="recipePage">
                    
                    <div className="recipeHeader">
                        <div className="recipeTextInfo">
                            <h1>{title}</h1>
                            <StarRating rating={ rating }></StarRating>
                            <p className="recipeSummary">{recipeIntroParagraph}</p>
                            <div className={sourceClass}>Source: <a target="_blank" rel="noopener noreferrer" href={sourceLink}>{sourceWebsite}</a></div>
                        </div>
                        <div className="recipeImageWrapper">
                            <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                        </div>
                        
                    </div>
                    <div className="recipeInstructions" dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </Layout>
        </DocumentTitle>
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
                recipeIntroParagraph
                sourceLink
                sourceWebsite
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