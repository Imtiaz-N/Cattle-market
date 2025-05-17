import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleeditComponent } from './cattleedit.component';

describe('CattleeditComponent', () => {
  let component: CattleeditComponent;
  let fixture: ComponentFixture<CattleeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CattleeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
