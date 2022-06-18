import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
   const {
      allMdx: { nodes: posts },
   } = data

   return (
      <Layout>
         <Hero showPerson={true} />
         <Posts posts={posts} title="recently published" />
      </Layout>
   )
}

export const query = graphql`
   {
      allMdx(limit: 3, sort: { fields: frontmatter___date, order: ASC }) {
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

export default IndexPage
