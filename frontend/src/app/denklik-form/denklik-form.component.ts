import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Rule {
  question: string;
  required: boolean;
}

interface Mevzuat {
  name: string;
  rules: Rule[];
}

@Component({
  selector: 'app-denklik-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './denklik-form.component.html'
})

export class DenklikFormComponent implements OnInit {
  denklikForm!: FormGroup;
  questions: Rule[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Mevzuat>('assets/mevzuatlar/2024_3.json').subscribe((mevzuat) => {
      const answerGroup: any = {};
      mevzuat.rules.forEach(rule => {
        answerGroup[rule.question] = [false];
      });

      this.denklikForm = this.fb.group({
        firmaAdi: ['', Validators.required],
        selectedMevzuat: ['2024_3'],
        answers: this.fb.group(answerGroup),
      });

      this.questions = mevzuat.rules;
    });
  }

  submit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',  // UTF-8 encoding
    });
  
    this.http.post('/api/denklik-hesapla', this.denklikForm.value, { 
      headers: headers,
      responseType: 'blob' 
    }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
