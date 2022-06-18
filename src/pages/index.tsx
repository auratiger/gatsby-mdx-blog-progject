import React from 'react'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const IndexPage = () => {
   return (
      <Layout>
         <Hero showPerson={true} />
      </Layout>
   )
}

export default IndexPage
