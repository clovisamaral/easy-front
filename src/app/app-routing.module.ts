import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClientComponent } from './Components/form-client/form-client.component';
import { ListClientComponent } from './Components/list-client/list-client.component';
import { FormProviderComponent } from './Components/form-provider/form-provider.component';
import { ListProviderComponent } from './Components/list-provider/list-provider.component';
import { FormRelationshipComponent } from './Components/form-relationship/form-relationship.component';
import { ListRelationshipComponent } from './Components/list-relationship/list-relationship.component';

const routes: Routes = [
  {
    path:'client', component: FormClientComponent
  },
  {
    path:'clients', component: ListClientComponent
  },
  {
    path:'provider', component: FormProviderComponent
  },
  {
    path:'providers', component: ListProviderComponent
  },
  {
    path:'relationship', component: FormRelationshipComponent
  },
  {
    path:'relationships', component: ListRelationshipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
