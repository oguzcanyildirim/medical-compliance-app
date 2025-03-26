import { Component } from '@angular/core';
import { DenklikFormComponent } from './denklik-form/denklik-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DenklikFormComponent],
  template: `<app-denklik-form />`
})
export class AppComponent {}
