import React from 'react'
import Img from "gatsby-image"
import { graphql, Link } from 'gatsby'
import Layout from "../components/layout"
import netlifyIdentity from 'netlify-identity-widget' 

class Products extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        this.getProducts()
        netlifyIdentity.on('login', user => this.getProducts(user))
        netlifyIdentity.on('logout', () => this.getProducts())
    }

    getProducts = user => {
        console.log('current user', user)
        const allProducts = this.props.data.allContentfulProduct.edges

        const products = netlifyIdentity.currentUser() !== null ? 
        allProducts : 
        allProducts.filter(({node: product}) => !product.private)
        this.setState({products})
    }
    
    render() {
        const {products} = this.state
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
                    {products.map(({node: product}) => (
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
                private
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
