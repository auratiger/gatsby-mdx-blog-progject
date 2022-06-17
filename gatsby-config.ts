import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
   siteMetadata: {
      title: `mdx-blog-project`,
      siteUrl: `https://www.yourdomain.tld`,
   },
   // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
   // If you use VSCode you can also use the GraphQL plugin
   // Learn more at: https://gatsby.dev/graphql-typegen
   graphqlTypegen: true,
   plugins: [
      'gatsby-plugin-styled-components',
      'gatsby-plugin-image',
      'gatsby-plugin-mdx',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
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
      // {
      //   resolve: `gatsby-source-filesystem`,
      //   options: {
      //     name: `posts`,
      //     path: `${__dirname}/src/posts`,
      //   },
      // },
      // {
      //   resolve: `gatsby-plugin-mdx`,
      //   options: {
      //     gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-images' }],
      //   },
      // },
   ],
}

export default config
