import ShopSectionContainer from '.';
import { screen, render } from '@testing-library/react';

describe('ShopSectionContainer', () => {
  it('Renders a div by default', () => {
    render(<ShopSectionContainer />);
    expect(screen.getByTestId('shop-section-container').nodeName).toBe('DIV');
  });

  describe('Renders the element specified by the as prop', () => {
    it('Renders as main correctly', () => {
      render(<ShopSectionContainer as="main" />);
      expect(screen.getByTestId('shop-section-container').nodeName).toBe(
        'MAIN',
      );
    });

    it('Renders as aside correctly', () => {
      render(<ShopSectionContainer as="aside" />);
      expect(screen.getByTestId('shop-section-container').nodeName).toBe(
        'ASIDE',
      );
    });
  });

  it('Contains the children prop as child elements', () => {
    render(
      <ShopSectionContainer as="main">
        <h1>Heading</h1>
        <p>Paragraph</p>
      </ShopSectionContainer>,
    );
    const children = screen.getByTestId('shop-section-container').childNodes;
    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe('Heading');
    expect(children[1].textContent).toBe('Paragraph');
  });

  it('Applies the class prop if provided', () => {
    render(<ShopSectionContainer className={'someClass'} />);
    expect(screen.getByTestId('shop-section-container').classList).toContain(
      'someClass',
    );
  });
});
