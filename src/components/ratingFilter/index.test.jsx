import RatingFilter from '.';
import RatingStar from '../ratingStar';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.mock('../ratingStar');

describe('Rating Filter', () => {
  describe('Checks the correct number of stars, in line with the selectedRating prop', () => {
    it('Checks 2 out of 5 stars correctly', () => {
      render(<RatingFilter selectedRating={2} maxRating={5} />);
      // Not sure this is good, as it depends on props object being first in function component argument list
      expect(
        RatingStar.mock.calls.filter((call) => call[0].isChecked).length,
      ).toBe(2);
    });

    it('Checks 4 out of 10 stars correctly', () => {
      render(<RatingFilter selectedRating={7} maxRating={10} />);
      // Not sure this is good, as it depends on props object being first in function component argument list
      expect(
        RatingStar.mock.calls.filter((call) => call[0].isChecked).length,
      ).toBe(7);
    });
  });

  describe('Creates a number of stars in line with the maxRating prop', () => {
    it('Creates 5 stars with a maxRating prop of 5', () => {
      render(<RatingFilter maxRating={5} />);
      expect(
        screen.getAllByLabelText(/Filter products by rating:/).length,
      ).toBe(5);
    });

    it('Creates 2 stars with a maxRating prop of 2', () => {
      render(<RatingFilter maxRating={2} />);
      expect(
        screen.getAllByLabelText(/Filter products by rating:/).length,
      ).toBe(2);
    });
  });

  it('Calls the onChange prop function when a different rating is selected', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(
      <RatingFilter selectedRating={3} maxRating={5} onChange={onChangeMock} />,
    );

    const oneStarRatingButton = screen.getByLabelText(
      /Filter products by rating: 1/,
    );
    await user.click(oneStarRatingButton);
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    const fiveStarRatingButton = screen.getByLabelText(
      /Filter products by rating: 5/,
    );
    await user.click(fiveStarRatingButton);
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
