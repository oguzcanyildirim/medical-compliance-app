import { Routes } from '@angular/router';
import { MevzuatEkleComponent } from './pages/mevzuat-ekle/mevzuat-ekle.component';
import { DenklikFormComponent } from './denklik-form/denklik-form.component';

export const routes: Routes = [
  { path: '', component: DenklikFormComponent },
  { path: 'mevzuat-ekle', component: MevzuatEkleComponent },
];
