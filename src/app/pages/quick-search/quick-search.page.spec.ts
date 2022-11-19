import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickSearchPage } from './quick-search.page';

describe('QuickSearchPage', () => {
  let component: QuickSearchPage;
  let fixture: ComponentFixture<QuickSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
