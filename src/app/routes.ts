import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'transactions' },
    {
      path: 'transactions',
      loadChildren: () =>
        import('./transaction/transaction.module').then((m) => m.TransactionModule),
    }
];