const dummySchedule = {
  id: "schedule001",
  userId: "user001",
  title: "개인 시간표",
  startDate: "2025-04-08",
  endDate: "2025-05-20",
  entries: [
    {
      "id": "entry001",
      "userId": "user001",
      "name": "버거킹 알바",
      "nameById": "name001",
      "date": "2025-04-08",
      "dayOfWeek": "화",
      "startTime": "10:00",
      "endTime": "15:30",
      "payInfo": {
        "id": "pay001",
        "nameById": "name001",
        "hourPrice": 12000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험"
      }
    },
    {
      "id": "entry002",
      "userId": "user001",
      "name": "맘스터치 알바",
      "nameById": "name002",
      "date": "2025-04-09",
      "dayOfWeek": "수",
      "startTime": "14:00",
      "endTime": "18:00",
      "payInfo": {
        "id": "pay002",
        "hourPrice": 11000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": false,
        "duty": "3.3%",
        "nameById": "name002"
      }
    },
    {
      "id": "entry003",
      "userId": "user001",
      "name": "버거킹 알바",
      "nameById": "name003",
      "date": "2025-04-10",
      "dayOfWeek": "목",
      "startTime": "18:00",
      "endTime": "23:30",
      "payInfo": {
        "id": "pay003",
        "hourPrice": 12000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "4대보험",
        "nameById": "name003"
      }
    },
    {
      "id": "entry004",
      "userId": "user001",
      "name": "버거킹 알바",
      "nameById": "name004",
      "date": "2025-04-11",
      "dayOfWeek": "금",
      "startTime": "18:00",
      "endTime": "23:30",
      "payInfo": {
        "id": "pay004",
        "hourPrice": 12000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "4대보험",
        "nameById": "name004"
      }
    },
    {
      "id": "entry005",
      "userId": "user001",
      "name": "스타벅스 알바",
      "nameById": "name005",
      "date": "2025-04-12",
      "dayOfWeek": "토",
      "startTime": "09:00",
      "endTime": "14:00",
      "payInfo": {
        "id": "pay005",
        "hourPrice": 13000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name005"
      }
    },
    {
      "id": "entry006",
      "userId": "user001",
      "name": "GS25 알바",
      "nameById": "name006",
      "date": "2025-04-13",
      "dayOfWeek": "일",
      "startTime": "22:00",
      "endTime": "24:00",
      "payInfo": {
        "id": "pay006",
        "hourPrice": 12500,
        "wHoliday": false,
        "Holiday": true,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name006"
      }
    },
    {
      "id": "entry007",
      "userId": "user001",
      "name": "맘스터치 알바",
      "nameById": "name007",
      "date": "2025-04-15",
      "dayOfWeek": "화",
      "startTime": "12:00",
      "endTime": "16:00",
      "payInfo": {
        "id": "pay007",
        "hourPrice": 11000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name007"
      }
    },
    {
      "id": "entry008",
      "userId": "user001",
      "name": "스타벅스 알바",
      "nameById": "name008",
      "date": "2025-04-20",
      "dayOfWeek": "일",
      "startTime": "14:00",
      "endTime": "20:00",
      "payInfo": {
        "id": "pay008",
        "hourPrice": 13000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": true,
        "night": false,
        "duty": "4대보험",
        "nameById": "name008"
      }
    },
    {
      "id": "entry009",
      "userId": "user001",
      "name": "GS25 알바",
      "nameById": "name009",
      "date": "2025-05-01",
      "dayOfWeek": "목",
      "startTime": "21:00",
      "endTime": "23:00",
      "payInfo": {
        "id": "pay009",
        "hourPrice": 12500,
        "wHoliday": false,
        "Holiday": true,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name009"
      }
    },
    {
      "id": "entry010",
      "userId": "user001",
      "name": "버거킹 알바",
      "nameById": "name010",
      "date": "2025-05-03",
      "dayOfWeek": "토",
      "startTime": "08:00",
      "endTime": "14:00",
      "payInfo": {
        "id": "pay010",
        "hourPrice": 12000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name010"
      }
    },
    {
      "id": "entry011",
      "userId": "user001",
      "name": "맘스터치 알바",
      "nameById": "name011",
      "date": "2025-05-10",
      "dayOfWeek": "토",
      "startTime": "15:00",
      "endTime": "22:00",
      "payInfo": {
        "id": "pay011",
        "hourPrice": 11000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name011"
      }
    },
    {
      "id": "entry012",
      "userId": "user001",
      "name": "GS25 알바",
      "nameById": "name012",
      "date": "2025-05-20",
      "dayOfWeek": "화",
      "startTime": "07:00",
      "endTime": "13:00",
      "payInfo": {
        "id": "pay012",
        "hourPrice": 12500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name012"
      }
    },
    {
      "id": "entry013",
      "userId": "user001",
      "name": "공차 알바",
      "nameById": "name013",
      "date": "2025-04-14",
      "dayOfWeek": "월",
      "startTime": "07:00",
      "endTime": "11:00",
      "payInfo": {
        "id": "pay013",
        "hourPrice": 10500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name013"
      }
    },
    {
      "id": "entry014",
      "userId": "user001",
      "name": "CU 알바",
      "nameById": "name014",
      "date": "2025-04-18",
      "dayOfWeek": "금",
      "startTime": "23:00",
      "endTime": "24:00",
      "payInfo": {
        "id": "pay014",
        "hourPrice": 12500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name014"
      }
    },
    {
      "id": "entry015",
      "userId": "user001",
      "name": "피자헛 알바",
      "nameById": "name015",
      "date": "2025-04-23",
      "dayOfWeek": "수",
      "startTime": "12:00",
      "endTime": "19:00",
      "payInfo": {
        "id": "pay015",
        "hourPrice": 11800,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": false,
        "duty": "4대보험",
        "nameById": "name015"
      }
    },
    {
      "id": "entry016",
      "userId": "user001",
      "name": "무신사 스토어 알바",
      "nameById": "name016",
      "date": "2025-04-27",
      "dayOfWeek": "일",
      "startTime": "10:00",
      "endTime": "17:00",
      "payInfo": {
        "id": "pay016",
        "hourPrice": 11000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name016"
      }
    },
    {
      "id": "entry017",
      "userId": "user001",
      "name": "교보문고 알바",
      "nameById": "name017",
      "date": "2025-04-30",
      "dayOfWeek": "수",
      "startTime": "09:00",
      "endTime": "13:00",
      "payInfo": {
        "id": "pay017",
        "hourPrice": 10200,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name017"
      }
    },
    {
      "id": "entry018",
      "userId": "user001",
      "name": "이디야 알바",
      "nameById": "name018",
      "date": "2025-05-02",
      "dayOfWeek": "금",
      "startTime": "06:00",
      "endTime": "09:00",
      "payInfo": {
        "id": "pay018",
        "hourPrice": 11000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": true,
        "duty": "3.3%",
        "nameById": "name018"
      }
    },
    {
      "id": "entry019",
      "userId": "user001",
      "name": "코엑스 행사 알바",
      "nameById": "name019",
      "date": "2025-05-05",
      "dayOfWeek": "월",
      "startTime": "08:00",
      "endTime": "20:00",
      "payInfo": {
        "id": "pay019",
        "hourPrice": 14000,
        "wHoliday": true,
        "Holiday": true,
        "overtime": true,
        "night": false,
        "duty": "3.3%",
        "nameById": "name019"
      }
    },
    {
      "id": "entry020",
      "userId": "user001",
      "name": "롯데마트 알바",
      "nameById": "name020",
      "date": "2025-05-07",
      "dayOfWeek": "수",
      "startTime": "13:00",
      "endTime": "18:00",
      "payInfo": {
        "id": "pay020",
        "hourPrice": 11500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name020"
      }
    },
    {
      "id": "entry021",
      "userId": "user001",
      "name": "코스트코 알바",
      "nameById": "name021",
      "date": "2025-05-11",
      "dayOfWeek": "일",
      "startTime": "09:00",
      "endTime": "18:00",
      "payInfo": {
        "id": "pay021",
        "hourPrice": 13000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": true,
        "night": false,
        "duty": "4대보험",
        "nameById": "name021"
      }
    },
    {
      "id": "entry022",
      "userId": "user001",
      "name": "배달대행 알바",
      "nameById": "name022",
      "date": "2025-05-18",
      "dayOfWeek": "일",
      "startTime": "16:00",
      "endTime": "22:00",
      "payInfo": {
        "id": "pay022",
        "hourPrice": 15000,
        "wHoliday": true,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name022"
      }
    },
    {
      "id": "entry023",
      "userId": "user001",
      "name": "이마트 알바",
      "nameById": "name023",
      "date": "2025-04-10",
      "dayOfWeek": "목",
      "startTime": "08:00",
      "endTime": "12:00",
      "payInfo": {
        "id": "pay023",
        "hourPrice": 10000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name023"
      }
    },
    {
      "id": "entry024",
      "userId": "user001",
      "name": "던킨도너츠 알바",
      "nameById": "name024",
      "date": "2025-04-10",
      "dayOfWeek": "목",
      "startTime": "13:00",
      "endTime": "17:00",
      "payInfo": {
        "id": "pay024",
        "hourPrice": 10800,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name024"
      }
    },
    {
      "id": "entry025",
      "userId": "user001",
      "name": "무신사 스토어 알바",
      "nameById": "name025",
      "date": "2025-04-14",
      "dayOfWeek": "월",
      "startTime": "14:00",
      "endTime": "19:00",
      "payInfo": {
        "id": "pay025",
        "hourPrice": 11000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "4대보험",
        "nameById": "name025"
      }
    },
    {
      "id": "entry026",
      "userId": "user001",
      "name": "스타벅스 알바",
      "nameById": "name026",
      "date": "2025-04-14",
      "dayOfWeek": "월",
      "startTime": "20:00",
      "endTime": "23:30",
      "payInfo": {
        "id": "pay026",
        "hourPrice": 13000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "4대보험",
        "nameById": "name026"
      }
    },
    {
      "id": "entry027",
      "userId": "user001",
      "name": "GS25 알바",
      "nameById": "name027",
      "date": "2025-05-03",
      "dayOfWeek": "토",
      "startTime": "14:00",
      "endTime": "18:00",
      "payInfo": {
        "id": "pay027",
        "hourPrice": 12500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name027"
      }
    },
    {
      "id": "entry029",
      "userId": "user001",
      "name": "공차 알바",
      "nameById": "name029",
      "date": "2025-05-07",
      "dayOfWeek": "수",
      "startTime": "19:00",
      "endTime": "20:00",
      "payInfo": {
        "id": "pay029",
        "hourPrice": 10500,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": false,
        "duty": "3.3%",
        "nameById": "name029"
      }
    },
    {
      "id": "entry100",
      "userId": "user001",
      "name": "투썸 알바",
      "nameById": "name100",
      "date": "2025-05-07",
      "dayOfWeek": "수",
      "startTime": "04:00",
      "endTime": "06:30",
      "payInfo": {
        "id": "pay100",
        "hourPrice": 11000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": false,
        "night": false,
        "duty": "3.3%",
        "nameById": "name100"
      }
    },
    {
      "id": "entry101",
      "userId": "user001",
      "name": "이디야 알바",
      "nameById": "name101",
      "date": "2025-05-07",
      "dayOfWeek": "수",
      "startTime": "20:00",
      "endTime": "22:00",
      "payInfo": {
        "id": "pay101",
        "hourPrice": 12000,
        "wHoliday": false,
        "Holiday": false,
        "overtime": true,
        "night": true,
        "duty": "3.3%",
        "nameById": "name101"
      }
    }
  ]
};

export default dummySchedule;
