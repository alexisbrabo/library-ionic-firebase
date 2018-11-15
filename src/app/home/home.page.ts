import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  books: Book[];
  booksLoaded: Book[];
  filterBook: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAll();
    this.filterBook = 'T';
  }

  getAll() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
      this.booksLoaded = response;
    });
  }

  async remove(book) {
    this.bookService.removeBook(book.id);
    this.getAll();
  }

  filterBookChangeStatus() {
    this.getAll();
    if (this.filterBook === 'T') {
      this.books = this.booksLoaded.filter(function (item) {
        return item.name;
      });
    } else if (this.filterBook === 'NL') {
      this.books = this.booksLoaded.filter(function (item) {
        return !item.read;
      });
    } else {
      this.books = this.booksLoaded.filter(function (item) {
        return item.read;
      });
    }
  }

  filterBooks(ev: any) {
    this.getAll();

    const val = ev.target.value;
    this.books = this.booksLoaded.filter(function (item) {
      return !val && val.trim() === '' ? item.name : item.name.toLowerCase().includes(val.toLowerCase());
    });
  }
}
