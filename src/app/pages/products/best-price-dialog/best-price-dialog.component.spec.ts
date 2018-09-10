import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPriceDialogComponent } from './best-price-dialog.component';

describe('BestPriceDialogComponent', () => {
  let component: BestPriceDialogComponent;
  let fixture: ComponentFixture<BestPriceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPriceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
