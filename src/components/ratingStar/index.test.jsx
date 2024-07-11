import CheckedIcon from '/rating-checked.svg';
import UncheckedIcon from '/rating-unchecked.svg';
import RatingStar from '.';
import { screen, render } from '@testing-library/react';

describe('Rating star', () => {
  it('Uses the correct icon when isChecked prop is true', () => {
    render(<RatingStar isChecked={true} />);
    expect(screen.getByRole('img').src).toContain(CheckedIcon);
  });

  it('Uses the correct icon when isChecked prop is false', () => {
    render(<RatingStar isChecked={false} />);
    expect(screen.getByRole('img').src).toContain(UncheckedIcon);
  });
});
