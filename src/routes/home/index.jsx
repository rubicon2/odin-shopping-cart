import DenimPhoto from '/jeans.jpg';
import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import styled from 'styled-components';

const Background = styled.main`
  position: relative;
  height: 100vh;
`;

const HeroImg = styled.img`
  height: 100%;
  width: 100vw;
  object-position: top;
  object-fit: cover;

  filter: brightness(0.7);
`;

const HeroOverlay = styled.div`
  width: 100%;
  color: white;
  position: absolute;

  top: 35%;
  left: 0;
`;

const Hero = styled(PageHeading)`
  font-weight: 700;
  line-height: 2.5rem;
  margin-bottom: 1rem;
`;

const CallToAction = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4em;
  max-width: 20em;
`;

export default function Home() {
  return (
    <Background>
      <HeroImg
        src={DenimPhoto}
        alt="A bunch of people wearing as much denim as possible."
      />
      <HeroOverlay>
        <Container>
          <Hero>Now that&apos;s a lot of denim!</Hero>
          <CallToAction>
            If you want to wear as much denim as these people, check out our
            shop now! We even have denim socks!
          </CallToAction>
        </Container>
      </HeroOverlay>
    </Background>
  );
}
