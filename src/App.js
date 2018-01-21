import React from 'react'
import CurrentlyReading from './CurrentlyReading'
import WantsToRead from './WantsToRead'
import Read from './Read'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

//TODO: onChange no Search
//TODO: resgatar isRendering do onChange do Search para comecar ou parar

class BooksApp extends React.Component {

    componentDidMount(){
        this.setBooks();
    }

    state = {
        books: [],
        isLoading: false,
        message: {
            show: false,
            title: null,
            shelf: null
        }
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

    updateShelfSearch = (book, shelf) => {
        this.startLoader();
        BooksAPI.update(book, shelf).then(() => {
            this.setBooks();
            this.stopLoader();
            this.showMessage(book, shelf);
            setTimeout(() => {
                this.hideMessage();
            }, 2500);
        });
    };

    startLoader = () => {
        this.setState({isLoading: true});
    };

    stopLoader = () => {
        this.setState({isLoading: false});
    };

    showMessage = (book, shelf) => {
        this.setState({
            message:{
                show: true,
                title: book.title,
                shelf: shelf
            }
        });
    };

    hideMessage = () => {
        this.setState({
            message:{
                show: false
            }
        })
    };

    static loader(){
        return(
            <div>
                <div className="backdrop" />
                <div className="loader" />
            </div>
        )
    };

    static message(title, shelf) {
        return(
            <div className="message-box">
                O livro <strong>{title}</strong> foi para a estante <strong>{shelf}</strong>
            </div>
        )
    }

    static listBar(){
        return(
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
        )
    };

    render() {

        const { books, isLoading, message } = this.state;

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        {BooksApp.listBar()}
                        <div className="list-books-content">
                            <div>
                                <CurrentlyReading
                                    books={books.filter((book) => book.shelf.toLowerCase() === 'currentlyreading')}
                                    onChangeShelf={this.updateShelf}
                                />
                                <WantsToRead
                                    books={books.filter((book) => book.shelf.toLowerCase() === 'wanttoread')}
                                    onChangeShelf={this.updateShelf}
                                />
                                <Read
                                    books={books.filter((book) => book.shelf.toLowerCase() === 'read')}
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
                    <div>
                        {(isLoading &&
                            BooksApp.loader()
                        )}
                        {(message.show &&
                            // console.log(`Title / Shelf: ${message.title} / ${message.shelf}`)
                            BooksApp.message(message.title, message.shelf)
                        )}
                        <Search
                            books={this.state.books}
                            onChangeShelf={this.updateShelfSearch}
                        />
                    </div>
                )} />
            </div>
        )
    }
}

export default BooksApp
