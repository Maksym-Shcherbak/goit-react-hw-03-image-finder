import { Component } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '39344710-74bbb124ce1c1439ca3e67f9f';
const options = {
  page: 1,
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
};
const searchParams = new URLSearchParams(options);

export class App extends Component {
  state = {
    images: [],
    query: '',
  };

  async componentDidMount() {
    const response = await axios.get(`?q=cat&key=${KEY}&${searchParams}`);
    console.log(response);
    this.setState({ images: response.data.hits });
  }

  render() {
    return (
      <div className="container">
        <Searchbar />
        {this.state.images.length > 0 ? (
          <ImageGallery images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
