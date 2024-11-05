import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './component/marca/marca.component';
import { TipoComponent } from './component/tipo/tipo.component';
import { CocheComponent } from './component/coche/coche.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página principal',
  },
  {
    path: 'marca',
    component: MarcaComponent,
    title: 'Soy Marca',
  },
  {
    path: 'tipo',
    component: TipoComponent,
    title: 'Soy Tipo',
  },
  {
    path: 'coche',
    component: CocheComponent,
    title: 'Soy coche',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
