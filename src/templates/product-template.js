import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Img from "gatsby-image"

const ProductTemplate = ({data: {contentfulProduct}, location}) => {
    return (
        <Layout>
            <div>
                <h2 style={{color: '#663399'}}>{contentfulProduct.name}</h2>
                <h4 style={{color: '#f904ac'}}>${contentfulProduct.price}</h4>
                <div>
                    <span style={{ color: '#663399' }}>
                        {contentfulProduct.createdAt}
                    </span>
                </div>
                <p>{contentfulProduct.description}</p>
                <button
                className="snipcart-add-item"
                data-item-id={contentfulProduct.id}
                data-item-price={contentfulProduct.price}
                data-item-image={contentfulProduct.image.file.url}
                data-item-name={contentfulProduct.name}
                data-item-url={location.pathname}
                style={{
                    background: '#f904ac',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem',
                    marginBottom: '1rem'
                }}
                >
                    Add to Cart
                </button>
                <Img
                 fluid={contentfulProduct.image.fluid}
                 alt={contentfulProduct.image.title}
                 style={{width: 400}}
                 />
            </div>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    contentfulProduct(slug: {eq: $slug}) {
        id
        name
        price
        description
        createdAt(formatString: "MMMM Do, YYYY")
        image {
            title
            fluid(maxWidth: 800) {
               ...GatsbyContentfulFluid 
            }
            file {
                url
            }
        }
    }
}
`

export default ProductTemplate;