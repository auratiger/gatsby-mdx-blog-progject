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
          }
        }
      }

      categories: allMdx {
         distinct(field: frontmatter___category)
      }
    }
  `)

   result.data.allMdx.nodes.forEach(({ frontmatter: { slug } }) => {
      createPage({
         path: `/posts/${slug}`,
         component: path.resolve(`src/templates/post-template.tsx`),
         context: {
            slug,
         },
      })
   })

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
