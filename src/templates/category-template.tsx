import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const CategoryTemplate = props => {
  const {
    data: {
      allMdx: { nodes: posts },
    },
  } = props

  const {
    pageContext: { category },
  } = props

  return (
    <Layout>
      <Hero showPerson={false} />
      <Posts posts={posts} title={`category / ${category}`} />
    </Layout>
  )
}

export const query = graphql`
   query GetCategory($category: String) {
      allMdx(
         sort: { fields: frontmatter___date, order: ASC }
         filter: { frontmatter: { category: { eq: $category } } }
      ) {
         nodes {
            frontmatter {
               author
               category
               date(formatString: "MMMM , Do YYYY")
               readTime
               slug
               title
               image {
                  childImageSharp {
                     gatsbyImageData
                  }
               }
            }
            id
            excerpt
         }
      }
   }
`

export default CategoryTemplate
