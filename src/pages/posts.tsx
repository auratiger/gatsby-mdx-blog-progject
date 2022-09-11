import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { graphql } from 'gatsby'
import Posts from '../components/Posts'
import SEO from '../components/Seo'

const PostsPage = ({ data }) => {
   const {
      allMdx: { nodes: posts },
   } = data

   return (
      <Layout>
         <Hero showPerson={false} />
         <Posts posts={posts} title="all posts" />
      </Layout>
   )
}

export const Head = () => <SEO title="Posts" /> 

export const query = graphql`
   {
      allMdx(sort: { fields: frontmatter___date, order: ASC }) {
         nodes {
            frontmatter {
               title
               author
               category
               date(formatString: "MMMM, Do YYYY")
               slug
               readTime
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

export default PostsPage
