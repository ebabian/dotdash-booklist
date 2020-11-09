import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  state = {
    data: [],
    searchTerm: '',
    errorExists: false,
    errorMessage: ''
  }

  accessApiData = (term) => {
    axios.get(`https://goodreads-server-express--dotdash.repl.co/search/${term}`).then(
      (response) => {
        console.log(response);
        this.setState({
          data: response.data.list
        })
      }
    ).catch(error => {
      console.log(error);
      this.setState({
        errorExists: true,
        errorMessage: `${this.state.searchTerm} Does not exist`
      })
    })
  }

  userSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value,
    })
    console.log(this.state.searchTerm);
  }

  searchExists = (event) => {
    event.preventDefault();
    this.accessApiData(this.state.searchTerm);
    console.log('Search Button clicked');
  }

  render = () => {
    return (
      <div className="App">
        <h1>Book List</h1>
        <form>
          <input
          onChange={this.userSearchTerm}
          value={this.state.searchTerm}
          type="text"
          placeholder="Search for a book"/>
          <input onClick={this.searchExists} type="submit" value="Search"/>
        </form>
        <div className="book-container">
        {this.state.errorExists ? this.state.errorMessage : ('')}
        { this.state.data ?
           <ul>
          {this.state.data.map(
            (books, index) => {
              return   <li key={index}>
                <img alt={books.title} src={books.imageUrl}/>
                 <h3>{books.title}</h3>
                <h5>By: {books.authorName}</h5>
              </li>
            }
          )}
          </ul>
          : ('') }
        </div>
      </div>
    );
  }
}
export default App;
