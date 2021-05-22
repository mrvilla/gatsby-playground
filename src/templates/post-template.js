import { graphql } from 'gatsby'
import React from 'react'
import Layout from "../components/layout"

const PostTemplate = ({data: post}) => {
    return (
        <Layout>
            <div>
                <h2>{post.markdownRemark.frontmatter.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.html}} />
            </div>
        </Layout>
    )
}

export const query = graphql`
query($slug: String){
    markdownRemark(fields: {
          slug: {eq: $slug}
    }) {
          html
      frontmatter {
              title
      }
    }
}
`
export default PostTemplate;