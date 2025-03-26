import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenklikFormComponent } from './denklik-form.component';

describe('DenklikFormComponent', () => {
  let component: DenklikFormComponent;
  let fixture: ComponentFixture<DenklikFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenklikFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenklikFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
