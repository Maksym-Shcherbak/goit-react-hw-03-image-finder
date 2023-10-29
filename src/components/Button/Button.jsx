import PropTypes from 'prop-types';
import { ButtonMore } from './ButtonMore.styled';

export const Button = ({ onButtonClick }) => {
  return (
    <ButtonMore className="Button" type="button" onClick={onButtonClick}>
      Load more
    </ButtonMore>
  );
};

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
