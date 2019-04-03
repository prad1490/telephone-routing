import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOperatorComponent } from './find-operator.component';
import { OperatorService } from '../shared/operator.service';

describe('FindOperatorComponent', () => {
  let component: FindOperatorComponent;
  let fixture: ComponentFixture<FindOperatorComponent>;
  let operatorService: OperatorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindOperatorComponent],
      providers: [OperatorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindOperatorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    operatorService = new OperatorService();
    component = new FindOperatorComponent(operatorService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should return null if  phone number is empty', () => {
    const result = component.findCheapOperator({ value: " " });
    expect(result).toBeNull();
  });
  it('should return null if  phone number is alphabetic', () => {
    const result = component.findCheapOperator({ value: "tertreterter" });
    expect(result).toBeNull();
  });
  it('should return null if  phone number is special characters', () => {
    const result = component.findCheapOperator({ value: "#%#$%#%#%##%" });
    expect(result).toBeNull();
  });
  it('should return number only if  phone number is having + and - characters', () => {
    const result = component.numberifyPhoneNumber({ value: "46-73-212345" });
    expect(result).toBe("4673212345");
  });
  it('should return operators', () => {
    spyOn(operatorService, 'getOperators').and.callFake(() => {
      return [{
        "name": "Vodafone",
        "plans": [{
          "prefix": "46",
          "amount": "0.17"
        }]
      },
      {
        "name": "Lebara",
        "plans": [{
          "prefix": "46",
          "amount": "0.2"
        }]
      }]
    });
    component.ngOnInit();
    expect(component.operatorList.length).toBe(2);
  });
  it('should return operator and cheapest price for the provided phone number', () => {
    const result = component.findCheapOperator({ value: "+46-73-212345" });
    expect(result).toBe({});
  });
  it('should return operator and price for the given phone number', () => {
    let spy = spyOn(operatorService, 'getOperators').and.callFake(() => {
      return [{
        "name": "Vodafone",
        "plans": [{
          "prefix": "46",
          "amount": "0.17"
        }]
      },
      {
        "name": "Lebara",
        "plans": [{
          "prefix": "46",
          "amount": "0.2"
        }]
      }]
    });
    component.operatorList = spy();
    expect(component.findCheapOperator({ value: "+46-73-212345" })).toBe({
      "Vodafone": "0.17"
    });
  });
  it('should return empty object  if  prefix of phone number does not match with operators', () => {
    let spy = spyOn(operatorService, 'getOperators').and.callFake(() => {
      return [{
        "name": "Vodafone",
        "plans": [{
          "prefix": "46",
          "amount": "0.17"
        }]
      },
      {
        "name": "Lebara",
        "plans": [{
          "prefix": "46",
          "amount": "0.2"
        }]
      }]
    });
    component.operatorList = spy();
    expect(component.findCheapOperator({ value: "76844543543" })).toBe({

    });
  });
});
