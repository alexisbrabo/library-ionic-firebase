import { Component, OnInit, NgZone } from '@angular/core';
import { Book, BookService } from '../services/book.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  books: Book[];
  booksLoaded: Book[];
  filterBook: string;

  constructor(private bookService: BookService,
    private nav: NavController, private ngZone: NgZone,
    public actionSheetController: ActionSheetController,
    private router: Router) { }

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

  async remove(id: any) {
    this.bookService.removeBook(id);
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

  async presentActionSheet(id: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.ngZone.run(() => this.router.navigate(['details', id]));
          }
        }, {
        text: 'Deletar',
        role: 'destructive',
        handler: () => {
         this.remove(id);
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  filterBooks(ev: any) {
    this.getAll();

    const val = ev.target.value;
    this.books = this.booksLoaded.filter(function (item) {
      return !val && val.trim() === '' ? item.name : item.name.toLowerCase().includes(val.toLowerCase());
    });
  }
}
