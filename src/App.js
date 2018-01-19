import React from 'react'
import CurrentlyReading from './CurrentlyReading'
import WantsToRead from './WantsToRead'
import Read from './Read'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {

    componentDidMount(){
        BooksAPI.getAll().then((books) =>{
            this.setState({ books })
        })
    }

    state = {
      books : []
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <CurrentlyReading books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'currentlyreading')}/>
                                <WantsToRead books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'wanttoread')}/>
                                <Read books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'read')}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search' />
                        </div>
                    </div>
                )} />
                <Route path='/search' render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/" />
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                )} />
            </div>
        )
    }
}

export default App
