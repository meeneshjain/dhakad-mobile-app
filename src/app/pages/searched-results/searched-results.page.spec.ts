import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchedResultsPage } from './searched-results.page';

describe('SearchedResultsPage', () => {
  let component: SearchedResultsPage;
  let fixture: ComponentFixture<SearchedResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchedResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
