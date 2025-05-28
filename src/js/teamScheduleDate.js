export function getStartDay(year, month) {
    return new Date(year, month - 1, 1).getDay(); // 0=일, ..., 6=토
}

export function getEndDay(year, month) {
    return new Date(year, month, 0).getDate(); // 0 = 말일
}

export function getCurrentYear() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth()는 0~11이므로 +1
    return year;
}

export function getCurrentMonth() {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth()는 0~11이므로 +1
    return month;
}

export function generateCalendarDates(year, month) {
  const dates = [];
  const startDay = getStartDay(year, month);
  const totalDays = getEndDay(year, month);
  const lastTotalDays = getEndDay(year, month - 1);

  // 이전 달
  for (let i = 0; i < startDay; i++) {
    const prevDay = lastTotalDays - startDay + i + 1;
    const prevDate = new Date(year, month - 2, prevDay);
    dates.push({
      day: prevDay,
      isCurrentMonth: false,
      year: prevDate.getFullYear(),
      month: prevDate.getMonth() + 1
    });
  }

  // 현재 달
  for (let day = 1; day <= totalDays; day++) {
    dates.push({ day, isCurrentMonth: true, year, month });
  }

  // 다음 달
  const totalCells = 42;
  const emptyCells = totalCells - dates.length;
  for (let day = 1; day <= emptyCells; day++) {
    const nextDate = new Date(year, month, day);
    dates.push({
      day,
      isCurrentMonth: false,
      year: nextDate.getFullYear(),
      month: nextDate.getMonth() + 1
    });
  }

  return dates;
}


export function getWeekDates (year, month, day) {
    const startDate = new Date(year, month - 1, day); // 시작 날짜
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i); // 날짜 계산
        
        const dateData = { 
            day: date.getDate(), 
            month: date.getMonth() + 1, 
            year: date.getFullYear()
        };
        weekDates.push(dateData);
    }

    return weekDates;
}

export function getCurrentStartOfWeek() {
    const today = new Date();
    const day = today.getDay(); // 0(일) ~ 6(토)
    today.setDate(today.getDate() - day); // 이번 주의 시작일(일요일)로 설정
    // const dateData = { 
    //     day: today.getDate(), 
    //     month: today.getMonth() + 1, 
    //     year: today.getFullYear()
    // };
    return today;
}

export function getBlockDateFromWeekKey(weekKey, blockIndex) {
    const [year, month, day] = weekKey.split('-').map(Number);
    const baseDate = new Date(year, month - 1, day);
    baseDate.setDate(baseDate.getDate() + blockIndex);
    return baseDate;
}
