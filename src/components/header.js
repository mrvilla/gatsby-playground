import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const isActive = ({isCurrent}) => {
  return { className: isCurrent ? 'active' : 'navlink'}
}

const NavLink = props => <Link getProps={isActive} {...props} />

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <span style={{display: 'flex', alignItems: 'center'}}>
         <StaticImage
            src="../images/gatsby-icon.png"
            width={39}
            quality={95}
            style={{margin: 0}}
            alt="A Gatsby Logo"
          />
        <h1 style={{ margin: 0 }}>
          <NavLink to="/">
            {siteTitle}
          </NavLink>
        </h1>
      </span>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/products">Store</NavLink>
      <div 
      className="snipcart-summary snipcart-checkout"
      style={{color: 'white', cursor: 'pointer'}}
      >
        <div>My Cart</div>
        <div>
          <span className="snipcart-total-items"></span>
          {' '} Items in Cart
        </div>
        <div>
          Total price{' '}
          <span className="snipcart-total-price"></span>
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
