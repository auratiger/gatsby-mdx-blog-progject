import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'

const Categories = () => {
   const {
      allMdx: { distinct },
   } = useStaticQuery(query)

   return (
      <ul className="categories">
         {distinct.map((category, index: number) => {
            return (
               <li key={index}>
                  <Link to={`/categories/${category}`} className="category">
                     {category}
                  </Link>
               </li>
            )
         })}
      </ul>
   )
}

const query = graphql`
   {
      allMdx {
         distinct(field: frontmatter___category)
      }
   }
`

export default Categories
