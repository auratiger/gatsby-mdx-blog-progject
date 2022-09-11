import React, { PropsWithChildren } from 'react'
import useSiteMetadata from '../hooks/useSiteMetadata'

export interface SeoProps extends PropsWithChildren {
  title?: string
  description?: string
  pathname?: string
}

const SEO = ({ title, description, pathname, children }: SeoProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()

  const data = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="image" content={data.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:url" content={data.url} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:creator" content={data.twitterUsername} />
      {children}
    </>
  )
}

export default SEO
