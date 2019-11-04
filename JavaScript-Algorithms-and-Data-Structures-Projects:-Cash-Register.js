// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
// payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

var UNITS = [
  ['PENNY', 1],
  ['NICKEL',5],
  ['DIME', 10],
  ['QUARTER', 25],
  ['ONE', 100],
  ['FIVE', 500],
  ['TEN', 1000],
  ['TWENTY', 2000],
  ['ONE HUNDRED', 10000]
  ];

function checkCashRegister(total, cash, cid) {

let changeGiven = [];
let cidHundred = [];

for (let s = 0; s < cid.length; s++) {
  cidHundred.push([cid[s][0], Math.round(cid[s][1]*100)]);
}

let sumCID = sumArr(cidHundred);
cash = cash * 100;
total = total * 100;
let change = cash - total;
let cashRet = []

if (change === sumCID) {
  return {status: "CLOSED", change: cid}
}else{
  for (let j = UNITS.length -1; j >= 0; j --) {
    let num = 0;
    let val;

    while (change/UNITS[j][1] >= 1 && cidHundred[j][1] > 0) {
      num ++
      cidHundred[j][1] -= UNITS[j][1];
      change = change - UNITS[j][1]
      val = num * UNITS[j][1]
    }
    if (num > 0) {
      console.log(num, val)
      cashRet.push([UNITS[j][0], val])
      console.log(cashRet)
    }
  }
  let changeCash = [];

  for (let z = 0; z < cashRet.length; z++) {
    changeCash.push([cashRet[z][0], 
    ((cashRet[z][1]/100).toFixed(2)*1)]);
  }
  let sumCashRet = sumArr(cashRet);
  if(sumCashRet < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
}else {
  return {status: "OPEN", change: changeCash};
}
  }
}

function sumArr(arr) {
  return arr.reduce(function( elA, elB) {
    return elA + elB[1];
  }, 0)
}
 
// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
