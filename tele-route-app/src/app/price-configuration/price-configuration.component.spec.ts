import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceConfigurationComponent } from './price-configuration.component';


describe('PriceConfigurationComponent', () => {
  let component: PriceConfigurationComponent;
  let fixture: ComponentFixture<PriceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceConfigurationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
