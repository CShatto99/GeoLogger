import { FC } from 'react';
// import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import defaultPFP from '../../../img/defaultPFP.png';

const PFPContainer = styled.div`
  // & > svg {
  //   font-size: 12rem;
  // }
  margin-bottom: 1rem;

  & > img {
    border-radius: 50%;
    box-shadow: none;
    width: 200px;
  }
`;

type PFPProps = {
  pfp: string;
};

const ProfilePicture: FC<PFPProps> = ({ pfp }: PFPProps) => {
  return <PFPContainer>{pfp ? pfp : <img src={defaultPFP} alt="default profile picture" />}</PFPContainer>;
};
export default ProfilePicture;
