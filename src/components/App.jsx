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
    const { query } = this.state;
    if (prevState.query !== query) {
      try {
        this.setState({
          images: [],
          isLoading: true,
          isLoadMore: false,
          page: 1,
        });
        const response = await getImages(query, 1);
        if (response.data.total === 0) {
          return toast.error('Nothing found for your request');
        }
        toast.info(`Hooray. We found ${response.data.totalHits} images`);
        const totalPages = response.data.totalHits / response.data.hits.length;
        if (totalPages > 1) {
          this.setState(({ page }) => {
            return { isLoadMore: true, page: page + 1 };
          });
        }
        this.setState({ images: response.data.hits });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = async () => {
    const { query, images, page } = this.state;
    try {
      this.setState({
        isLoading: true,
      });
      const response = await getImages(query, page);
      this.setState(({ images, page }) => {
        return {
          images: [...images, ...response.data.hits],
          page: page + 1,
        };
      });
      const loadedImages = images.length + response.data.hits.length;
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
