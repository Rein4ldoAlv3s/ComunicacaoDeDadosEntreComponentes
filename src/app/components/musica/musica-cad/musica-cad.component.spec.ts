import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaCadComponent } from './musica-cad.component';

describe('MusicaCadComponent', () => {
  let component: MusicaCadComponent;
  let fixture: ComponentFixture<MusicaCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicaCadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
