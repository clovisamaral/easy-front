import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRelationshipComponent } from './list-relationship.component';

describe('ListRelationshipComponent', () => {
  let component: ListRelationshipComponent;
  let fixture: ComponentFixture<ListRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRelationshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
