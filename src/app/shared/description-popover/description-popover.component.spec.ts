import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPopoverComponent } from './description-popover.component';

describe('DescriptionPopoverComponent', () => {
  let component: DescriptionPopoverComponent;
  let fixture: ComponentFixture<DescriptionPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
