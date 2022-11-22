import { HeaderComponent } from './../header/header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { v4 as uuidv4, v4 } from 'uuid';

fdescribe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  const mockData = [
    {
      id: v4(),
      orderName: 'test',
      status: 'pending'
    },
    {
      id: v4(),
      orderName: 'test',
      status: 'approved'
    },
    {
      id: v4(),
      orderName: 'test',
      status: 'rejected'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageComponent, HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    sessionStorage.setItem('orders', JSON.stringify(mockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an approve and reject button', () => {
    expect(component).toBeTruthy();
    const rejectButtons = document.querySelectorAll('.btn-outline-danger');
    expect(rejectButtons.length).toBeGreaterThan(0);
    const approveButtons = document.querySelectorAll('.btn-outline-success');
    expect(approveButtons.length).toBeGreaterThan(0);
  })
});
