import React from 'react'
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

const Blog = ({data, pageContext}) => {
    const {currentPage, isFirstPage, isLastPage} = pageContext
    const nextPage = `/blog/${String(currentPage + 1)}`
    const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

    return (
        <Layout>
            <h2>Blog page</h2>
            <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
            <div>
                {data.allMarkdownRemark.edges.map(({node}) => (
                <div key={node.id}>
                    <div>
                        <span style={{ color: 'purple' }}>
                            {node.frontmatter.date}
                        </span>
                    </div>
                        <Link to={`/posts${node.fields.slug}`}>
                            <h3>{node.frontmatter.title}</h3>
                        </Link>
                        <p>{node.excerpt}</p>
                </div> 
                ))}

                <div>
                    {!isFirstPage && (
                        <Link to={prevPage} rel='prev'>
                            Prev Page
                        </Link>
                    )}
                    {!isLastPage && (
                        <Link to={nextPage} rel='next'>
                            Next Page
                        </Link>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($skip: Int!, $limit: Int!, ) {
        allMarkdownRemark(
            skip: $skip
            limit: $limit
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                    }
                    excerpt
                }
            }
        }
    }
  `

export default Blog
