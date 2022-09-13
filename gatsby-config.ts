import type { GatsbyConfig } from 'gatsby'

const title = process.env.TITLE || 'mdx-blog-project'
const description =
  process.env.DESCRIPTION || 'Example project for the Gatsby Head API'
const image = process.env.IMAGE || '/mainImg.png'
const siteUrl = process.env.URL || 'http://localhost:9000'
const sitemapName = 'sitemap.xml'

const config: GatsbyConfig = {
  siteMetadata: {
    title: title,
    description: description,
    image: image,
    siteUrl: siteUrl,
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
      resolve: `@auratiger/gatsby-plugin-advanced-sitemap-reworked`,
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
        output: `/${sitemapName}`,
        mapping: {
          posts: {
            sitemap: `posts`,
            serializer: (edges: any) => {
              return edges.map(({ node }: any) => {
                const images = !!node?.pageContext?.pageImages
                  ? node.pageContext.pageImages.map(image => {
                      return {
                        path: image.publicURL,
                        caption: 'test',
                      }
                    })
                  : []

                return {
                  node: {
                    id: node.id,
                    slug: node.slug,
                    url: node.url,
                    updated_at: node?.pageContext?.date,
                    page_images: images,
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
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/${sitemapName}`,
        policy: [{ userAgent: '*', allow: '/' }],
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
