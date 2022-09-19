import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate } from 'react-router-dom';
import Signout from '../Auth/Signout/Signout';
import './Header.css'
export default function Header(props) {
    return(
     <div className='header-container'>
      <nav className='nav'>
        <div>
          <h3>Online Shop</h3>
       <Link to={'/'}>  <p >Home</p></Link> 
       <Link to={'/favorite'}><p href="#features">favorite</p></Link>
     <Link to={'/cart'}><p >Cart</p></Link>
        </div>
        <Signout/>
      </nav>

     </div>
    )
}

{/* <Navbar bg="dark" variant="dark">
<Container>
 <img src='https://banner2.cleanpng.com/20180519/jjs/kisspng-e-commerce-logo-electronic-business-5b00d2d0918d84.2335269315267806245962.jpg'style={{width:'35px'}} alt='logo' />
  <Nav className="me-auto">
 <Link to={'/'}>  <Nav.Link href="#home">Home</Nav.Link></Link> 
  <Link to={'/favorite'}><Nav.Link href="#features">favorite</Nav.Link></Link>
    {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
//   </Nav>
//   <Link to={'/cart'}><Nav.Link className='text-secondary' href="#features">Cart</Nav.Link></Link>
// </Container>
// <Signout/>
// </Navbar> */}