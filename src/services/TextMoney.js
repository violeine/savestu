

function TextMoney(money=0) {

  return NumberWithSpace(money) + 'đ';
}


function NumberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { TextMoney, NumberWithSpace }