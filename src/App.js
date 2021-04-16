import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import apiKey from './config'
import './App.css'

import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import PhotoContainer from './components/PhotoContainer'
import Loading from './components/Loading'

class App extends Component {
  state = {
    photo: [],
    cats: [],
    dogs: [],
    girls: [],
    loading: true
  }

  componentDidMount() {
    this.performSearch()
    this.performSearch('dog')
    this.performSearch('girl')
  }
  performSearch = (tag = 'cat') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if (tag === 'cat')
          this.setState({ cats: responseData.photos.photo })
        else if (tag === 'dog')
          this.setState({ dogs: responseData.photos.photo })
        else if (tag === 'girl')
          this.setState({ girls: responseData.photos.photo })
        else
          this.setState({ photo: responseData.photos.photo })
        this.setState({ loading: false })
      })
      .catch(error => {
        console.log('Error parsing and fetching data', error)
      })
  }
  render() {
    return (
      <BrowserRouter>
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <Switch>
          <Route path="/cats" render={() => (this.state.loading) ? <Loading /> : <PhotoContainer photo={this.state.cats} />} />
          <Route path="/dogs" render={() => (this.state.loading) ? <Loading /> : <PhotoContainer photo={this.state.dogs} />} />
          <Route path="/girls" render={() => (this.state.loading) ? <Loading /> : <PhotoContainer photo={this.state.girls} />} />
          <Route path="/search/:name" render={() => (this.state.loading) ? <Loading /> : <PhotoContainer photo={this.state.photo} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

