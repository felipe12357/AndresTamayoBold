import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TransactionSignalsComponent } from "./transaction/transaction-signals.component";


const routes: Routes = [
      { path: '', component: TransactionSignalsComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TransactionSignalsRoutingModule {}