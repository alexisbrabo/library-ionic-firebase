import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Book {
  id?: string;
  name: string;
  author: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksCollection: AngularFirestoreCollection<Book>;
  private books: Observable<Book[]>;
  constructor(db: AngularFirestore) {
    this.booksCollection = db.collection<Book>('books');

    this.books = this.booksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getBooks() {
    return this.books;
  }

  getBook(id) {
    return this.booksCollection.doc<Book>(id).valueChanges();
  }

  updateBook(book: Book, id: string) {
    return this.booksCollection.doc(id).update(book);
  }

  addBook(book: Book) {
    return this.booksCollection.add(book);
  }

  removeBook(id) {
    return this.booksCollection.doc(id).delete();
  }
}
