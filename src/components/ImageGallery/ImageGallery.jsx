import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { getImages } from 'helpers/PixabayAPI';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    isLoadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.saveQuery !== this.props.saveQuery) {
      try {
        this.setState({
          isLoading: true,
          page: 1,
        });
        const response = await getImages(this.props.saveQuery, 1);
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
    try {
      this.setState({ isLoading: true });
      const response = await getImages(this.props.saveQuery, this.state.page);
      this.setState(({ images, page }) => {
        return {
          images: [...images, ...response.data.hits],
          page: page + 1,
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

  render() {
    const { images, isLoading, isLoadMore, error } = this.state;
    return (
      <>
        {error && toast.error(`${error.message}`)}
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {images.length > 0 ? (
          <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  smallImg={webformatURL}
                  showModal={this.props.openModal}
                  largeImg={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </Gallery>
        ) : null}
        {isLoadMore && <Button onButtonClick={this.loadMore} />}
      </>
    );
  }
}
