import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoumentItem } from './doument-item';

describe('DoumentItem', () => {
  let component: DoumentItem;
  let fixture: ComponentFixture<DoumentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoumentItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DoumentItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
