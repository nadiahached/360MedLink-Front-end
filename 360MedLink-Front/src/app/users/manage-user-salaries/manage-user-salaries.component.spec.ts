import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserSalariesComponent } from './manage-user-salaries.component';

describe('ManageUserSalariesComponent', () => {
  let component: ManageUserSalariesComponent;
  let fixture: ComponentFixture<ManageUserSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
