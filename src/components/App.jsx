import { Component } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    showModal: false,
    largeImgURL: null,
  };

  saveQuery = query => {
    this.setState({ query });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ largeImgURL: e.target.dataset.source });
  };
  // async componentDidMount() {
  //   const response = await axios.get(`?q=cat&key=${KEY}&${searchParams}`);
  //   console.log(response);
  //   this.setState({ images: response.data.hits });
  // }

  // async componentDidUpdate(prevProps, prevState) {
  //   const response = await axios.get(
  //     `?q=${this.state.query}&key=${KEY}&${searchParams}`
  //   );
  //   console.log(response);
  //   this.setState({ images: response.data.hits });
  // }

  render() {
    return (
      <div className="container">
        <Searchbar onGetImages={this.saveQuery} />

        <ImageGallery
          saveQuery={this.state.query}
          toggleModal={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            largeImage={this.largeImgURL}
            onCloseModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
