import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessListViewPage } from './business-list-view.page';

describe('BusinessListViewPage', () => {
  let component: BusinessListViewPage;
  let fixture: ComponentFixture<BusinessListViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessListViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
