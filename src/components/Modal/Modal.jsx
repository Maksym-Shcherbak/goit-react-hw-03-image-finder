import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.oncCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.oncCloseByEsc);
  }

  oncCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
