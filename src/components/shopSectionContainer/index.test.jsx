import ShopSectionContainer from '.';
import { screen, render } from '@testing-library/react';

describe('ShopSectionContainer', () => {
  it('Renders a div by default', () => {
    render(<ShopSectionContainer>Testing</ShopSectionContainer>);
    expect(screen.getByText('Testing').nodeName).toBe('DIV');
  });

  it('Renders the element specified by the as prop', () => {
    render(<ShopSectionContainer as="main">Main</ShopSectionContainer>);
    expect(screen.getByText('Main').nodeName).toBe('MAIN');

    render(<ShopSectionContainer as="aside">Aside</ShopSectionContainer>);
    expect(screen.getByText('Aside').nodeName).toBe('ASIDE');
  });

  it('Contains the children prop as child elements', () => {
    render(
      <ShopSectionContainer as="main">
        <h1>Heading</h1>
        <p>Paragraph</p>
      </ShopSectionContainer>,
    );
    const children = screen.getByRole('main').childNodes;
    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe('Heading');
    expect(children[1].textContent).toBe('Paragraph');
  });

  it('Applies the class prop if provided', () => {
    render(
      <ShopSectionContainer className={'someClass'}>
        Container
      </ShopSectionContainer>,
    );
    expect(screen.getByText('Container').classList).toContain('someClass');
  });
});
