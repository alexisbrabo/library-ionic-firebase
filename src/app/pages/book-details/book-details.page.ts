import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  book: Book = {
    name: '',
    author: '',
    read: false
  };

  bookId = null;

  constructor(private route: ActivatedRoute,
    private nav: NavController, private bookService: BookService,
    private loadingController: LoadingController, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    if (this.bookId) {
      this.loadBook();
    }
  }

  async loadBook() {
    const loading = await this.loadingController.create({
      message: 'Carregando Livro..'
    });
    await loading.present();

    this.bookService.getBook(this.bookId).subscribe(res => {
      loading.dismiss();
      this.book = res;
    });
  }

  async presentToast(txt: string) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 1500,
      color: 'success'
    });
    toast.present();
  }

  async saveBook() {

    const loading = await this.loadingController.create({
      message: 'Salvando Livro..'
    });
    await loading.present();

    if (this.bookId) {
      this.bookService.updateBook(this.book, this.bookId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
        this.presentToast('Atualizado com Sucesso');
      });
    } else {
      this.bookService.addBook(this.book).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
        this.presentToast('Adicionado com Sucesso');
      });
    }
  }

}
