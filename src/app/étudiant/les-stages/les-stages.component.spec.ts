import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesStagesComponent } from './les-stages.component';

describe('LesStagesComponent', () => {
  let component: LesStagesComponent;
  let fixture: ComponentFixture<LesStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesStagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LesStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
