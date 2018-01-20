import React from 'react'
import CurrentlyReading from './CurrentlyReading'
import WantsToRead from './WantsToRead'
import Read from './Read'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends React.Component {

    componentDidMount(){
        this.setBooks();
    }

    state = {
      books : []
    };

    setBooks = () => {
        BooksAPI.getAll().then((books) =>{
            this.setState({ books });
        });
    };

    updateShelf = (book, shelf) => {
        this.setState((state) => ({
            books: state.books.filter((b) => b.id !== book.id)
        }));

        BooksAPI.update(book, shelf).then((res) => {
            console.log(`O livro ${book.title} foi para a estante ${shelf}`);
            this.setBooks();
        });
    };

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
                                <CurrentlyReading
                                    books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'currentlyreading')}
                                    onChangeShelf={this.updateShelf}
                                />
                                <WantsToRead
                                    books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'wanttoread')}
                                    onChangeShelf={this.updateShelf}
                                />
                                <Read
                                    books={this.state.books.filter((book) => book.shelf.toLowerCase() === 'read')}
                                    onChangeShelf={this.updateShelf}
                                />
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
