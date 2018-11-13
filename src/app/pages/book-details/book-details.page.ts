import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  book: Book = {
    name: 'test',
    author: 'test'
  };

  bookId = null;

  constructor(private route: ActivatedRoute,
     private nav: NavController, private bookService: BookService,
     private loadingController: LoadingController) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    if (this.bookId) {
      this.loadBook();
    }
  }

  async loadBook() {
    const loading = await this.loadingController.create({
      message: 'Loading Book..'
    });
    await loading.present();

    this.bookService.getBook(this.bookId).subscribe(res => {
      loading.dismiss();
      this.book = res;
    });
  }

  async saveBook() {

    const loading = await this.loadingController.create({
      message: 'Saving Book..'
    });
    await loading.present();

    if (this.bookId) {
      this.bookService.updateBook(this.book, this.bookId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.bookService.addBook(this.book).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }

}
