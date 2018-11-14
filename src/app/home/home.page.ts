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
  booksRef: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
      this.booksLoaded = response;
    });
  }

  remove(book) {
    this.bookService.removeBook(book.id);
  }

  filterBooks(ev: any) {
    this.getAll();

    const val = ev.target.value;
    this.books = this.booksLoaded.filter(function (item) {
      return !val && val.trim() === '' ? item.name : item.name.toLowerCase().includes(val.toLowerCase());
    });
  }
}
