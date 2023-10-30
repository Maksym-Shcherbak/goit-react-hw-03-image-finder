import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { getImages } from 'helpers/PixabayAPI';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
    isLoadMore: false,
    showModal: false,
    error: null,
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({
        images: [],
        isLoadMore: false,
        page: 1,
      });
      this.fetchImages(query, page);
    } else if (prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await getImages(query, page);
      if (response.data.total === 0) {
        return toast.error('Nothing found for your request');
      }
      if (page === 1) {
        toast.info(`Hooray. We found ${response.data.totalHits} images`);
        const totalPages = response.data.totalHits / response.data.hits.length;
        if (totalPages > 1) {
          this.setState({
            isLoadMore: true,
          });
        }
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...response.data.hits],
        };
      });
      const loadedImages = this.state.images.length + response.data.hits.length;
      if (loadedImages >= response.data.totalHits) {
        this.setState({ isLoadMore: false });
        toast.info('You viewed all pictures');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
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
    const { showModal, modalImage, images, isLoading, isLoadMore, error } =
      this.state;
    return (
      <div className="container">
        <Searchbar onGetImages={this.saveQuery} />
        <ImageGallery images={images} openModal={this.toggleModal} />
        {error && toast.error(`${error.message}`)}
        {isLoading && <Loader />}
        {!isLoading && isLoadMore && <Button onButtonClick={this.loadMore} />}
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={modalImage} alt="large" />
          </Modal>
        )}
        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
