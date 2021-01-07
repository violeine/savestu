import { format, addDays, formatISO } from 'date-fns';



// Format 12/24/20 -> Thu, 24/12



function formatDateDisplay(date) {

  // return về string
  return format(new Date(date), 'eee, d/M');
}

function formatDateDB(date) {

  // trả về kiểu dữ liệu new Date()
  return format(date, 'MM/dd/yy');

}

function formartCalendarPicker(date) {
  return formatISO(new Date(date),{ representation: 'date' })
}

function formatMonthDisplay() {

}

function formatYearDisplay() {

}

// Next, Prev

// Trả về string format MM/DD/yy
function nextDate(date, amount) {
  return formatDateDB(
    addDays(new Date(date), amount)
  );
}


function prevDate() {

}

function nextMonth() {

}

function prevMonth() {

}

function nextYear() {

}

function prevYear() {

}



export {
  formatDateDisplay,
  formatMonthDisplay,
  formatYearDisplay,
  formatDateDB,
  nextDate,
  prevDate,
  nextMonth,
  prevMonth,
  nextYear,
  prevYear,
  formartCalendarPicker
}