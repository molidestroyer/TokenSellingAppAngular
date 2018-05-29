import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestICOComponent } from './invest-ico.component';

describe('InvestICOComponent', () => {
  let component: InvestICOComponent;
  let fixture: ComponentFixture<InvestICOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestICOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestICOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
