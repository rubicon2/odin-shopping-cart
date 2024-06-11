import { ContainerStyled } from '../container';
import NavBar from '../navBar';
import LogoDark from '/mega-shop-logo-dark.svg';
import styled from 'styled-components';

const Background = styled.header`
  box-shadow: 0px 5px 20px 5px var(--color--shadow);
`;

const Content = styled(ContainerStyled)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  padding: 1.5rem 0;
`;

export default function Header() {
  return (
    <Background>
      <Content>
        <Logo src={LogoDark} alt="" />
        <NavBar />
      </Content>
    </Background>
  );
}
