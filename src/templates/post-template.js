import { graphql } from 'gatsby'
import React from 'react'
import Layout from "../components/layout"

const PostTemplate = ({data: post}) => {
    return (
        <Layout>
            <div>
                <h2>{post.markdownRemark.frontmatter.title}</h2>
                <h4>
                    {post.markdownRemark.timeToRead}
                    {post.markdownRemark.timeToRead > 1 ? ' minutes' : ' minute'}
                </h4>
                
                <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html}} />
            </div>
        </Layout>
    )
}

export const query = graphql`
query($slug: String){
    markdownRemark(fields: {slug: {eq: $slug}}) {
        html
        timeToRead
        frontmatter {
            title
        }
    }
}
`
export default PostTemplate;