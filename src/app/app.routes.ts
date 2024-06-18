import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'calender',
    loadChildren: () =>
      import('./calendar/calender.module').then((m) => m.CalenderModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
