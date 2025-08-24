require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `예인 & 서정 결혼식`,
    description: `예인과 서정의 결혼식에 초대합니다.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-7383220-8",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `예인 & 서정 결혼식`,
        short_name: `예인 & 서정`,
        start_url: `/`,
        background_color: `#fefacb`,
        theme_color: `#fefacb`,
        display: `minimal-ui`,
        icon: `src/images/love-is-a-way-of-being.jpeg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
