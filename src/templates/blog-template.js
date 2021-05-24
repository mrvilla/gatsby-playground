import React from 'react'
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

const Blog = ({data, pageContext}) => {
    const {currentPage, isFirstPage, isLastPage, totalPages} = pageContext
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

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    maxWidth: 300,
                    margin: '0 auto'
                }}>
                    {!isFirstPage && (
                        <Link to={prevPage} rel='prev'>
                            Prev Page
                        </Link>
                    )}
                    {Array.from({length: totalPages}, (_, index) => (
                        <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
                            {index + 1}
                        </Link>
                    ))}
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
            limit: $limit,
            sort: {
                order: DESC,
                fields: [frontmatter___date]
            }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(fromNow: true)
                    }
                    excerpt
                }
            }
        }
    }
  `

export default Blog
