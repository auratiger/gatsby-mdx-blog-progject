import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import SEO from '../components/Seo'

const Success = () => {
  return (
    <Layout>
      <section className="success-page">
        <div className="page-center">
          <h2>your submission was recieved!</h2>
          <Link to="/" className="btn">
            Back Home
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Success" /> 

export default Success
