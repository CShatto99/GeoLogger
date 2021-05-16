import { FC } from 'react';
import styled from 'styled-components';
// import Button from '../styles/Buttons';
import { Profile } from '../../store/types';

const TitleSection = styled.div`
  margin-bottom: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 0.3rem;
  opacity: 0.5;
  cursor: default;

  & > h2 {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

type ProfileInfoProps = {
  profile: Profile;
};

const ProfileInfo: FC<ProfileInfoProps> = () => {
  // const onSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  // };

  return (
    <>
      <TitleSection>
        <h1>Profile Information</h1>
        {/* {settingsChanged && <Button text="Apply" onClick={onSubmit} />} */}
        <h2>Profile page coming soon...</h2>
      </TitleSection>
    </>
  );
};

export default ProfileInfo;
