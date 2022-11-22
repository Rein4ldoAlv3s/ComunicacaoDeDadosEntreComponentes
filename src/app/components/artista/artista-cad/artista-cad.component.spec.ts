import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaCadComponent } from './artista-cad.component';

describe('ArtistaCadComponent', () => {
  let component: ArtistaCadComponent;
  let fixture: ComponentFixture<ArtistaCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistaCadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistaCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
