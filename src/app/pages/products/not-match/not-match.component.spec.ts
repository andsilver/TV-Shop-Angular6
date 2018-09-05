import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMatchComponent } from './not-match.component';

describe('NotMatchComponent', () => {
  let component: NotMatchComponent;
  let fixture: ComponentFixture<NotMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
