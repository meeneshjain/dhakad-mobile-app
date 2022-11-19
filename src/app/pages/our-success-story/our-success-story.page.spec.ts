import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OurSuccessStoryPage } from './our-success-story.page';

describe('OurSuccessStoryPage', () => {
  let component: OurSuccessStoryPage;
  let fixture: ComponentFixture<OurSuccessStoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurSuccessStoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OurSuccessStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
