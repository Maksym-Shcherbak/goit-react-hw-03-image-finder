import { Component } from 'react';

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
    const { largeImage, tags } = this.props;

    return (
      <div className="Overlay" onClick={this.onBackdropClick}>
        <div className="Modal">
          <img src={largeImage} alt={tags} />
        </div>
      </div>
    );
  }
}
