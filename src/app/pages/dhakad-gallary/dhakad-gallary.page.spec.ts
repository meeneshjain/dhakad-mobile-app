import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DhakadGallaryPage } from './dhakad-gallary.page';

describe('DhakadGallaryPage', () => {
  let component: DhakadGallaryPage;
  let fixture: ComponentFixture<DhakadGallaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhakadGallaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DhakadGallaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
