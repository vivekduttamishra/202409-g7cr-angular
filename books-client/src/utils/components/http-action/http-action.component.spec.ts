import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpActionComponent } from './http-action.component';

describe('HttpActionComponent', () => {
  let component: HttpActionComponent;
  let fixture: ComponentFixture<HttpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
