import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MevzuatEkleComponent } from './mevzuat-ekle.component';

describe('MevzuatEkleComponent', () => {
  let component: MevzuatEkleComponent;
  let fixture: ComponentFixture<MevzuatEkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MevzuatEkleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MevzuatEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
