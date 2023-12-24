// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  const dropdownTitleStyle = {
    color: 'white', // Change this to the color you want
  };

  return (
    <header>
      <Navbar style={{
        background:"linear-gradient(270deg, rgba(0,212,255,1) 0%, rgba(58,58,237,1) 100%)"
      }} variant='dark' expand='lg'  collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Vedha Hospitals</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                 {userInfo.role ? (
                  <NavDropdown title={<span style={dropdownTitleStyle}>{userInfo.name}</span>} id='username' >
   
                    <LinkContainer to='/admit'>
                    <NavDropdown.Item>Admit Patient</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/patients'>
                    <NavDropdown.Item>My Entries</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                 ):(
                  <NavDropdown title={<span style={dropdownTitleStyle}>{userInfo.name}</span>} id='username' >
                    <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admit'>
                    <NavDropdown.Item>Admit Patient</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/patients'>
                    <NavDropdown.Item>My Entries</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                 )}
                </>
              ) : (
                <>
                  <LinkContainer to='/login' style={{
                    color:'white'
                  }}>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'  style={{
                    color:'white'
                  }}>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;