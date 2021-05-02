import { FC, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/auth';
import { setAlert } from '../../store/alert';
import GeneralLink, { DefaultLinkHTML } from '../styles/Links';
import GeneralInput from '../styles/GeneralInput';
import Alert from '../styles/Alert';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  display: grid;
  place-items: center;
`;

const FooterContent = styled.div`
  max-width: 72rem;
  text-align: center;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;

  & h3 {
    margin-bottom: 0.5rem;
  }

  & small {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > form > div:not(:last-child) {
    margin-bottom: 1rem;
  }

  & a {
    font-size: 1rem !important;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
    font-size: 12px;
    grid-gap: 1rem;
  }
`;

const FooterLink = styled(GeneralLink)`
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  width: 60px;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SiteLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: ease-out 100ms;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary};
    transition: ease-in 100ms;
  }
`;

const GitHubLink = styled.a`
  transition: ease-out 100ms;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    transition: ease-in 100ms;
    color: #4743d1;
  }
`;

const Footer: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { msg, status } = useAppSelector((state) => state.alert);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post('/api/contact', { email, message }, config);
      dispatch(setAlert(data.msg, 200));

      setEmail('');
      setMessage('');
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, err.response.status));
    }
  };

  const guestLinks = (
    <>
      <FooterLink to="/login">Login</FooterLink>
      <FooterLink to="/register">Register</FooterLink>
    </>
  );

  const authLinks = (
    <>
      <FooterLink to="/map">Map</FooterLink>
      <FooterLink to="/settings">Settings</FooterLink>
      <FooterLink to="/" onClick={() => dispatch(logout())}>
        Logout
      </FooterLink>
    </>
  );

  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames.
          </p>
        </div>
        <SiteLinks>
          <h3>Site Links</h3>
          <FooterLink to="/">Home</FooterLink>
          {isAuth ? authLinks : guestLinks}
        </SiteLinks>
        <form onSubmit={onSubmit}>
          <h3>Contact</h3>
          <div>
            <label>Email</label>
            <GeneralInput
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Message</label>
            <GeneralInput
              type="textarea"
              name="message"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div>
            <SendButton>Send</SendButton>{' '}
            {msg === 'Please enter both fields' && status === 400 && <Alert type="error" msg={msg} />}
            {msg === 'Email sent' && status === 200 && <Alert type="success" msg={msg} />}
          </div>
        </form>
        <small>&copy; GeoLogger {new Date().getFullYear()}</small>
        <small>
          <span>
            Made with
            <DefaultLinkHTML href="https://www.mapbox.com/" target="_blank" rel="noreferrer noopener">
              {' '}
              Mapbox
            </DefaultLinkHTML>
          </span>
        </small>
        <div>
          <GitHubLink href="https://github.com/CShatto99/GeoLogger" target="_blank" rel="noreferrer noopener">
            <FaGithub size={'28px'} />
          </GitHubLink>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
