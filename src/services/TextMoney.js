

function TextMoney(money=0) {

  return NumberWithSpace(money) + 'đ';
}


function NumberWithSpace(x) {
  if (x !== "") {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  else return ""
}

function numberWithSpacetoNumber(x) {
  if (x != "") {
    return x.split(" ").join("")
  }
  else return ""
}

export { TextMoney, NumberWithSpace,numberWithSpacetoNumber }