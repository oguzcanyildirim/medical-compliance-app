import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mevzuat-ekle',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './mevzuat-ekle.component.html',
})
export class MevzuatEkleComponent {
  mevzuatAdi: string = '';
  sorular: { question: string; required: boolean }[] = [];
  kayitMesaji: string = '';

  constructor(private http: HttpClient) {}

  soruEkle() {
    this.sorular.push({ question: '', required: false });
  }

  soruSil(index: number) {
    this.sorular.splice(index, 1);
  }

  mevzuatiKaydet() {
    if (!this.mevzuatAdi || this.sorular.length === 0) {
      alert('Mevzuat adı ve en az bir soru girilmelidir.');
      return;
    }

    const payload = {
      mevzuatAdi: this.mevzuatAdi,
      rules: this.sorular,
    };

    this.http.post('/api/mevzuat-ekle', payload).subscribe(() => {
      this.kayitMesaji = 'Mevzuat başarıyla kaydedildi.';
      this.mevzuatAdi = '';
      this.sorular = [];
    });
  }
}
