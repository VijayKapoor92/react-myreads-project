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
        isRendering: false
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
        BooksAPI.update(book, shelf).then(() => {
            console.log(`O livro ${book.title} foi para a estante ${shelf}`);
            this.setBooks();
        });
    };

    reload = {
        start(){
            document.querySelector(".app").style.overflow = "hidden";
            document.querySelector(".reload").style.display = "block";
        },
        stop(){
            document.querySelector(".app").style.overflow = "scroll";
            document.querySelector(".reload").style.display = "none";
        }
    };

    static loader(){
        return(
            <div>
                <div className="backdrop" />
                <div className="loader" />
            </div>
        )
    };

    static listBar(){
        return(
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
        )
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        {BooksApp.listBar()}
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
                    <div>
                        {(this.state.isRendering &&
                            BooksApp.loader()
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
