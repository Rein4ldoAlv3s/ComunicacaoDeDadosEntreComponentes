import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaLetraComponent } from './musica-letra.component';

describe('MusicaLetraComponent', () => {
  let component: MusicaLetraComponent;
  let fixture: ComponentFixture<MusicaLetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicaLetraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
