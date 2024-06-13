import CheckedIcon from '/rating-checked.svg';
import UncheckedIcon from '/rating-unchecked.svg';
import styled from 'styled-components';

const RatingImg = styled.img`
  width: 1.5rem;
`;

export default function RatingStar({ className, isChecked = false }) {
  return <RatingImg src={isChecked ? CheckedIcon : UncheckedIcon} />;
}
