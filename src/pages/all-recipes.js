import React, { Component } from 'react';
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import DocumentTitle from 'react-document-title'

import Layout from '../components/layout'
import MealCard from '../components/meal-card'


import '../components/meal-card.css'


export default class AllMealsPage extends Component {

  constructor(props) {
    super();
    this.state = { 
        mealList: props.data.allMarkdownRemark.edges,
        updatedList: props.data.allMarkdownRemark.edges
    };

  }

  componentDidMount() {
    // this.setState({ updatedList: this.state.mealList })
  }


  filterList(event){

    this.setState({ updatedList: this.state.mealList.filter(function({ node }, i){
        return node.frontmatter.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      })
    })
    // console.log(this.state.updatedList)
    
  }





  render() {


    return (
      <DocumentTitle title="All Recipes">
        <Layout>
          <div className="mealListWrapper">
            {/* <div className="allRecipesTitle">All Recipes</div>
            <div className="allRecipesTitleDetail">(most recent shown first)</div> */}
            <input className="allRecipesSearchBar" type="text" placeholder="Search" onChange={this.filterList.bind(this)}/>
            <div className="mealListContainer">
              {this.state.updatedList.map(({ node }, i) => (
                  <Link to={node.fields.slug} className="link">
                      <MealCard 
                        rating={ node.frontmatter.rating }
                        imageName={ this.state.updatedList[i].node.frontmatter.headerName }
                        title={ node.frontmatter.title }
                        date={ node.frontmatter.date }
                      ></MealCard>
                  </Link>
              ))}
            </div>
          </div>
          <div id="mealListFooter" style={{ height: '100px', width: '100%' }}></div>
        </Layout>
      </DocumentTitle>
    );
  }

}

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
            shortName
            headerName
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
