import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `mdx-blog-project`,
    description: `Example project for the Gatsby Head API`,
    image: `/mainImg.png`,
    siteUrl: `http://localhost:9000`,
    twitterUsername: `auratiger`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
         {
            posts: allSitePage(filter: {path: {regex: "//posts.*/"}}) {
               edges {
                  node {
                     id
                     slug: path
                     url: path
                     pageContext
                  }
               }
            }
            categories: allSitePage(filter: {path: {regex: "//categories.*/"}}) {
               edges {
                  node {
                     id
                     slug: path
                     url: path
                  }
               }
            }
         }`,
        mapping: {
          posts: {
            sitemap: `posts`,
            serializer: (edges: any) => {
              return edges.map(({ node }: any) => {
                return {
                  node: {
                    id: node.id,
                    slug: node.slug,
                    url: node.url,
                    updated_at: node?.pageContext?.date,
                    cover_image: node?.pageContext?.image,
                  },
                }
              })
            },
          },
          categories: {
            sitemap: `categories`,
            serializer: (edges: any) => {
              return edges.map(({ node }: any) => {
                return {
                  node: {
                    id: node.id,
                    slug: node.slug,
                    url: node.url,
                  },
                }
              })
            },
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-images' }],
      },
    },
  ],
}

export default config
