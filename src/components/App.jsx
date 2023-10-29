import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    showModal: false,
    modalImage: null,
  };

  saveQuery = query => {
    this.setState({ query });
  };

  toggleModal = e => {
    if (!this.state.showModal) {
      this.setState({ modalImage: e.target.dataset.source });
    }
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { query, showModal, modalImage } = this.state;
    return (
      <div className="container">
        <Searchbar onGetImages={this.saveQuery} />

        <ImageGallery saveQuery={query} openModal={this.toggleModal} />
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={modalImage} alt="modal image" />
          </Modal>
        )}
        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
