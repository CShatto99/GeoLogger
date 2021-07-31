import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import Brand from '../common/Brand';

const FooterContainer = styled.footer`
  color: ${({ theme }) => theme.colors.dark};
  padding: 5rem 1.5rem 3rem 1.5rem;
  margin: 0 auto;
  max-width: 100rem;

  & a {
    text-decoration: none;
    transition: ease-out 100ms;
  }

  & a:hover {
    transition: ease-in 100ms;
    color: #fff;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 4rem 1rem 2rem 1rem;
    font-size: 14px;
  }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.dark};
`;

const TopContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;

  & > * {
    display: flex;
    justify-content: center;
    flex: 1;
    width: 0;
  }

  & > div:first-child {
    margin: 0 0 auto 0;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;

    & > * {
      width: auto;
      margin-bottom: 2rem;
    }

    & > div:first-child {
      margin: 0 0 2rem 0;
    }
  }
`;

const SiteLinks = styled.div`
  flex-direction: column;
  align-items: center;

  & > p {
    color: #fff;
  }

  & > a {
    margin-top: 1rem;
  }
`;

const GitHubLink = styled.a`
  color: #fff;
  transition: ease-out 100ms;

  & > svg:hover {
    transition: ease-in 100ms;
    color: #4743d1;
  }
`;

const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    display: flex;
    justify-content: center;
    flex: 1;
    width: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: center;

    & > * {
      margin-bottom: 2rem;
      width: auto;
    }
  }
`;

const MadeWith = styled.p`
  & > a {
    margin-left: 0.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SupportLinks = styled.div`
  & > a:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Footer: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);

  const pageNeedsFooter = () => location.pathname === '/';

  const guestLinks = (
    <>
      <FooterLink to="/login">Login</FooterLink>
      <FooterLink to="/register">Register</FooterLink>
    </>
  );

  const authLinks = (
    <>
      <FooterLink to="/map">Map</FooterLink>
      <FooterLink to="/settings/profile">Settings</FooterLink>
      <FooterLink to="/" onClick={() => dispatch(logout())}>
        Logout
      </FooterLink>
    </>
  );

  return !pageNeedsFooter() ? null : (
    <FooterContainer>
      <TopContent>
        <Brand />
        <SiteLinks>
          <p>Site Links</p>
          <FooterLink to="/">Home</FooterLink>
          {isAuth ? authLinks : guestLinks}
        </SiteLinks>
        {/* <form onSubmit={onSubmit}>
          <h3>Contact</h3>
          <div>
            <label>Email</label>
            <GeneralInput type="email" maxLength={100} onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div>
            <label>Message</label>
            <GeneralInput type="text" maxLength={280} onChange={(e) => setMessage(e.target.value)} value={message} />
          </div>
          <Alert type="error" msg={ERR_CONTACT} />
          <Alert type="success" msg={SUCC_CONTACT} />
          <Button disabled={!email || !message}>Send</Button>
        </form> */}
        <GitHubLink href="https://github.com/CShatto99/GeoLogger" target="_blank" rel="noreferrer noopener">
          <FaGithub size={'28px'} />
        </GitHubLink>
      </TopContent>
      <BottomContent>
        <p>&copy; GeoLogger</p>
        <MadeWith>
          Made with
          <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer noopener">
            Mapbox
          </a>
        </MadeWith>
        <SupportLinks>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/terms-conditions">Terms</FooterLink>
        </SupportLinks>
      </BottomContent>
    </FooterContainer>
  );
};

export default Footer;
