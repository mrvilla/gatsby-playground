import React from 'react'
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

const Blog = () => {
    const data = useStaticQuery(graphql`
    {
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        date
                    }
                    excerpt
                }
            }
        }
    }
  `)

    return (
        <Layout>
            <h2>Blog page</h2>
            <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
            {data.allMarkdownRemark.edges.map(({node}) => (
               <div key={node.id}>
                   <div>
                       <span style={{ color: 'purple' }}>
                           {node.frontmatter.date}
                       </span>
                    </div>
                    <h3>{node.frontmatter.title}</h3>
                    <p>{node.excerpt}</p>
               </div> 
            ))}
        </Layout>
    )
}

export default Blog
