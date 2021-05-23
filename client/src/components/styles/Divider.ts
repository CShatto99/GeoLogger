import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0.5rem 0 1rem 0;
`;

export default Divider;
