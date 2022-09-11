const path = require('path')

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
   const { createPage } = actions

   const result = await graphql(`
     {
       allMdx {
         nodes {
           frontmatter {
             slug
             date
             image {
               publicURL
             }
           }
         }
       }

       categories: allMdx {
         distinct(field: frontmatter___category)
       }
     }
   `)

   result.data.allMdx.nodes.forEach(
     ({ frontmatter: { slug, date, image } }) => {
       createPage({
         path: `/posts/${slug}`,
         component: path.resolve(`src/templates/post-template.tsx`),
         context: {
           slug,
           date,
           image: image.publicURL,
         },
       })
     }
   )

   result.data.categories.distinct.forEach((category) => {
      createPage({
         path: `/categories/${category}`,
         component: path.resolve(`src/templates/category-template.tsx`),
         context: {
            category,
         },
      })
   })


}
