import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'details/:id', loadChildren: './pages/book-details/book-details.module#BookDetailsPageModule' },
  { path: 'details', loadChildren: './pages/book-details/book-details.module#BookDetailsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
