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
    const startDay = getStartDay(year, month); // 시작 요일
    const totalDays = getEndDay(year, month) //해당 달의 마지막 날짜

    const lastTotalDays = getEndDay(year, month - 1) //이전 달의 마지막 날짜
    // 이전달 날짜 끝부분들
    for (let i = 0; i < startDay; i++) {
        dates.push({day: lastTotalDays - startDay + i + 1, isCurrentMonth: false});
    }

    // 현재 달에 해당하는 날짜 채우기
    for (let day = 1; day <= totalDays; day++) {
        dates.push({day, isCurrentMonth: true});
    }

    // 다음달에 해당하는 날짜 첫부분들 
    const totalCells = 42; // 5주 * 7일
    const emptyCells = totalCells - dates.length;
    for (let day = 1; day <= emptyCells; day++) {
        dates.push({day, isCurrentMonth: false});
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
    const dateData = { 
        day: today.getDate(), 
        month: today.getMonth() + 1, 
        year: today.getFullYear()
    };
    return dateData;
}