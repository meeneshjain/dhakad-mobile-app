import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarriageMenuPage } from './marriage-menu.page';

describe('MarriageMenuPage', () => {
  let component: MarriageMenuPage;
  let fixture: ComponentFixture<MarriageMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarriageMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
