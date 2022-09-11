import { graphql, useStaticQuery } from 'gatsby'

export type SiteMetadataProps = {
  title: string
  description: string
  twitterUsername: string
  image: string
  siteUrl: string
}

const useSiteMetadata = (): SiteMetadataProps => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
