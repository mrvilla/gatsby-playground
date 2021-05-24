import React from 'react'
import Img from "gatsby-image"
import { graphql, Link } from 'gatsby'
import Layout from "../components/layout"

const Products = ({data: {allContentfulProduct}}) => {
    return (
        <Layout>
            <h2>Cyberpunk Posters</h2>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-around', 
                flexWrap: 'wrap', 
                columnGap: '60px',
                rowGap: '40px',
                }}>
                {allContentfulProduct.edges.map(({node: product}) => (
                    <div key={product.id} style={{
                        display: 'flex', 
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>
                        <Link 
                        to={`/products/${product.slug}`} 
                        style={{color: '#663399', textDecoration: 'none'}}>
                            <h3>{product.name} • {''}<span style={{color: '#f904ac'}}>€{product.price}</span></h3>
                            
                        </Link>
                        <Img 
                        fluid={product.image.fluid}
                        alt={product.image.name}
                        style={{width: 200}}
                        />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export const query = graphql`
{
    allContentfulProduct {
        edges {
            node {
                id
                name
                slug
                price
                image {
                    fluid(maxWidth: 400) {
                        ...GatsbyContentfulFluid_tracedSVG 
                     }
                }
            }
        }
    }
}    
`

export default Products;
