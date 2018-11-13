import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response;
    });
  }

  remove(book) {
    this.bookService.removeBook(book.id);
  }
}
