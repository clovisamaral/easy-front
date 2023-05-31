import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRelationshipComponent } from './form-relationship.component';

describe('FormRelationshipComponent', () => {
  let component: FormRelationshipComponent;
  let fixture: ComponentFixture<FormRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRelationshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
