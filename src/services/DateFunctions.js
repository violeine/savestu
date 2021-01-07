import { format, addDays, addMonths,addYears,formatISO } from 'date-fns';


function formatDateDisplay({date, type}) {
  // return về string
  const fm= {date: 'eee, d/M',
             month: 'MMM yyyy',
             year: 'yyyy'}
  return format(new Date(date), fm[type]);
}

function formatDateDB({date,type}) {
  // trả về kiểu dữ liệu new Date()
  if (type=="date") return {date: format(date, 'MM/dd/yy')}
  if (type=="month") return {month: format(date, 'MM'),
                             year: format(date, 'yy')}
  if (type=="year") return {year:format(date, 'yy')}
}

function formartCalendarPicker(date) {
  return formatISO(new Date(date),{ representation: 'date' })
}

// Next, Prev

// Trả về string format MM/DD/yy
function nextDate({date, type}, amount) {
  if (type==="date") return {date:addDays(new Date(date), amount), type}
  if (type==="month") return {date:addMonths(new Date(date), amount), type}
  if (type==="year") return {date:addYears(new Date(date), amount), type}
}




export {
  formatDateDisplay,
  formatDateDB,
  nextDate,
  formartCalendarPicker
}
