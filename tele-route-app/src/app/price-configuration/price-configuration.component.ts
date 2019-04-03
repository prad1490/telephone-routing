import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../find-operator/operator.service';
@Component({
  selector: 'app-price-configuration',
  templateUrl: './price-configuration.component.html',
  styleUrls: ['./price-configuration.component.scss']
})
export class PriceConfigurationComponent implements OnInit {

  minPriceOptions = [];
  showResult = {
    amount: "",
    operator: {},
    isSuccess : false,
    isError: false,
    errorMessage: ""
  };
  /* OperatorList = [
    {
      "Operator1":
      {
        "1": 0.9,
        "268": 5.1,
        "46": 0.17,
        "4620":0.1,
        "468":0.15,
        "4631":0.15,
        "4673":0.9,
        "46732":1.1
      }        
    },
    {
      "Operator2":
      {
        "1": 0.92,
        "44": 0.5,
        "46": 0.2,
        "467":1.0,
        "48":1.2
      }
    },
  ]; */

  constructor(private operatorService:OperatorService) { }

  ngOnInit() {

  }

  findCheapOperator({value: phoneNumber}) {
    console.log(phoneNumber.length, "VAAAAAAAAL");
    if(phoneNumber.trim().length ===0){
      this.showResult.isError = true;
      this.showResult.errorMessage = "Please enter the phone number"
      return null;
    }
/*    else if(!(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(phoneNumber))){
      this.showResult.isError = true;
      this.showResult.errorMessage = "Please enter the valid phone number"
      return null;
    } */
    else{
      this.showResult.isError = false;
      this.showResult.errorMessage = "";
      this.showResult.isSuccess = true;
    // console.log(typeof phoneNumber.value);
    const operatorList = this.operatorService.getOperators();
    // console.log(operatorList);
    const reformattedPhoneNumber = this.numberifyPhoneNumber(phoneNumber);
    // console.log({reformattedPhoneNumber});

    operatorList.forEach(op => {
      const opName = op.name;
      const listTable = op.plans;
      const prefixArr = listTable.map(plan => plan.prefix);
      // console.log({prefixArr});
      const maxPrefix = this.getMaxPrefix(prefixArr, reformattedPhoneNumber);
      // console.log({maxPrefix});
      this.minPriceOptions.push({[opName]:listTable.filter(plan => plan.prefix === maxPrefix)[0].amount});  
    })
    // console.log({minPriceOptions: this.minPriceOptions});
    let minPriceObj = this.getCheapestOperator(this.minPriceOptions);
    let keyVal = Object.keys(minPriceObj);
    if(keyVal.length ===1){
      this.showResult.operator = keyVal[0];
      this.showResult.amount = minPriceObj[keyVal[0]];

    }
    console.log(minPriceObj, "minPriceObjfdsfsf");

    console.log({minPriceObj});
   // this.showResult = true;
  }
  }

 getCheapestOperator (minPriceOptions)  {
    let minPriceObj = {}, minPrice = 10000000;
    minPriceOptions.forEach(option => {    
      const optionPrice = Number(Object.values(option)[0]);
      const optionOperator = Object.keys(option)[0];
      if (optionPrice < minPrice) {
        minPrice = optionPrice;
        minPriceObj = {};
        minPriceObj[optionOperator] = optionPrice;
      }   
    })
    return minPriceObj
}

  getMaxPrefix (prefixArr, phoneNumber) {
    let matchedPrefix, matchMaxLen = -1, regex;
    prefixArr.forEach(prefix => {   
    let regexStr = `${prefix}`;
    regex= new RegExp(regexStr)
    const matchLen = phoneNumber.match(regex) 
                      ? phoneNumber.match(regex)[0].length 
                      : 0;
    if (matchLen > matchMaxLen) {
      matchMaxLen = matchLen;
      matchedPrefix = prefix
    }    
  })
  return matchedPrefix
}
  numberifyPhoneNumber (phoneNumber) {
    return phoneNumber.replace(/[^0-9 ]/g, "")
  }

  

}
