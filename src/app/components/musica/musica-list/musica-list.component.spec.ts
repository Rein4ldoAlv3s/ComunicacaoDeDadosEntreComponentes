import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaListComponent } from './musica-list.component';

describe('MusicaListComponent', () => {
  let component: MusicaListComponent;
  let fixture: ComponentFixture<MusicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
