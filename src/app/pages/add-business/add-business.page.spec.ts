import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBusinessPage } from './add-business.page';

describe('AddBusinessPage', () => {
  let component: AddBusinessPage;
  let fixture: ComponentFixture<AddBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
