import { FC } from 'react';
// import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import defaultPFP from '../../../assets/img/defaultPFP.png';

const PFPContainer = styled.div`
  margin-bottom: 1rem;

  & > img {
    border-radius: 50%;
    box-shadow: none;
    width: 200px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 1rem 0 0;

    & > img {
      border-radius: 50%;
      box-shadow: none;
      width: 100px;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 1rem;
  }
`;

type PFPProps = {
  pfp: string;
};

const ProfilePicture: FC<PFPProps> = ({ pfp }: PFPProps) => {
  return <PFPContainer>{pfp ? pfp : <img src={defaultPFP} alt="default profile picture" />}</PFPContainer>;
};
export default ProfilePicture;
