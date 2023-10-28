import { Component } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '39344710-74bbb124ce1c1439ca3e67f9f';
const options = {
  page: 1,
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
};
const searchParams = new URLSearchParams(options);

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,

    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.saveQuery !== this.props.saveQuery) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `?q=${this.props.saveQuery}&key=${KEY}&${searchParams}`
        );
        console.log(response);
        this.setState({ images: response.data.hits });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.error && (
          <p>Whoops, something went wrong: {this.state.error.message}</p>
        )}
        {this.state.isLoading && (
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
        {this.state.images.length > 1 && (
          <ul className="ImageGallery">
            {this.state.images.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    smallImg={webformatURL}
                    showModal={this.props.toggleModal}
                    largeImg={largeImageURL}
                    tags={tags}
                  />
                );
              }
            )}
          </ul>
        )}
      </>
    );
  }
}
