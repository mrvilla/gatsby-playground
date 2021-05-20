import React from 'react'
import Layout from "../../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"

const ThirdPage = () => {
    const data = useStaticQuery(graphql`
    {
        allFile {
            edges {
                node {
                    relativePath
                    size
                    extension
                }
            }
        }
    }
  `)

    return (
        <Layout>
            <h2>Hey page 3</h2>
            <h3>Image file data</h3>
            <table>
                <thead>
                    <tr>
                    <th>relativePath</th>
                    <th>size</th>
                    <th>extension</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allFile.edges.map(({node}, index) => (
                    <tr key={index}>
                        <td>{node.relativePath}</td>
                        <td>{node.size}</td>
                        <td>{node.extension}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/page-2">Go back to page 2</Link>
        </Layout>
    )
}

export default ThirdPage
