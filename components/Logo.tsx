import styled from 'styled-components';

export default function Logo({ ...rest }) {
  return (
    <LogoText>Logness</LogoText>
  );
}

const LogoText = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;
