import React from 'react'
import Layout from '../components/Layout'
import { navigate } from 'gatsby'

const NewsLetter = () => {
   return (
      <Layout>
         <section className="newsletter-page">
            <div className="page-center">
               <h2>Get all the latest stories to your inbox</h2>
               <h4>I write to my friends every few weeks</h4>
               <form
                  className="contact-form"
                  name="testing-contact"
                  onSubmit={e => {
                     e.preventDefault()
                     navigate('/success')
                  }}
               >
                  <input
                     type="text"
                     name="name"
                     placeholder="your name"
                     className="form-control"
                  />
                  <input
                     type="email"
                     name="email"
                     placeholder="your email"
                     className="form-control"
                  />
                  <button type="submit" className="btn form-control submit-btn">
                     subcribe
                  </button>
               </form>
            </div>
         </section>
      </Layout>
   )
}

export default NewsLetter
