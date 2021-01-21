import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./bookmyshow/bookmyshow.module").then(m => m.BookMyShowModule)
  }, {
    path: "user",
    loadChildren: () => import("../app/user/user.module").then(m => m.UserModule),
  },
  {
    path: "admin",
    loadChildren: () => import("../app/admin/admin.module").then(m => m.AdminModule),
  },
  {
    path: "*",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
