const dummySchedule = {
  id: "schedule001",
  userId: "user001",
  title: "개인 시간표",
  startDate: "2025-04-08",
  endDate: "2025-04-14",
  entries: [
    {
      id: "entry001",
      userId: "user001",
      name: "버거킹 알바",
      nameById: "user001",
      date: "2025-04-08",
      dayOfWeek: "화",
      startTime: "10:00",
      endTime: "15:30",
      payInfo: {
        id: "pay001",
        userId: "user001",
        hourPrice: 12000,
        wHoliday: true,
        Holiday: false,
        overtime: false,
        night: false,
        duty: "4대보험"
      }
    },
    {
      id: "entry002",
      userId: "user001",
      name: "맘스터치 알바",
      nameById: "name002",
      date: "2025-04-09",
      dayOfWeek: "수",
      startTime: "14:00",
      endTime: "18:00",
      payInfo: {
        id: "pay002",
        userId: "user002",
        hourPrice: 11000,
        wHoliday: false,
        Holiday: false,
        overtime: true,
        night: false,
        duty: "3.3%"
      }
    },
    {
      id: "entry003",
      userId: "user001",
      name: "버거킹 알바",
      nameById: "name003",
      date: "2025-04-10",
      dayOfWeek: "목",
      startTime: "18:00",
      endTime: "23:30",
      payInfo: {
        id: "pay003",
        userId: "user001",
        hourPrice: 12000,
        wHoliday: false,
        Holiday: false,
        overtime: true,
        night: true,
        duty: "4대보험"
      }
    },
    {
      id: "entry003",
      userId: "user001",
      name: "버거킹 알바",
      nameById: "name003",
      date: "2025-04-11",
      dayOfWeek: "금",
      startTime: "18:00",
      endTime: "23:30",
      payInfo: {
        id: "pay003",
        userId: "user001",
        hourPrice: 12000,
        wHoliday: false,
        Holiday: false,
        overtime: true,
        night: true,
        duty: "4대보험"
      }
    }
  ]
};

export default dummySchedule;