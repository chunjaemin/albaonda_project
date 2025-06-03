import axios from 'axios';

// export const fetchPersonalMonthSchedule = async (userId, date) => {
//   const res = await fetch(`http://localhost:5000/api/personal-schedule/month/${userId}/${date}`, {
//     credentials: 'include',
//   });
//   if (!res.ok) throw new Error('스케줄 불러오기 실패');
//   return res.json(); // { success: true, entries: [...] }
// };


export const fetchPersonalMonthSchedule = async (userId, date) => {
  const res = await axios.get(`/api/personal-schedule/month/${userId}/${date}`, {
    withCredentials: true,
  });
  return res.data; // { success: true, entries: [...] }
};

export async function postPersonalScheduleEntries(userId, entries) {
  const res = await axios.post('/api/personal-schedule/add', {
    userId,
    entries
  }, { withCredentials: true });

  return res.data;
}

export async function postScheduleEntries(teamId, scheduleId, entries) {
  const res = await axios.post('/api/schedule/add', {
    teamId,
    scheduleId,
    entries
  }, { withCredentials: true });
  return res.data;
}

export async function fetchWeekSchedule(userId, date) {
  const res = await fetch(`/api/personal-schedule/week/${userId}/${date}`, {
    credentials: 'include',
  });

  const data = await res.json();
  console.log("📅 [fetchWeekSchedule] data:", data);
  if (!res.ok) throw new Error(data.error || "주간 일정 불러오기 실패");
  return data.entries ?? [];
}

export async function deletePersonalScheduleEntries(userId, entryIds) {
  const res = await axios.delete('/api/personal-schedule/delete', {
    data: {
      userId,
      entryIds
    },
    withCredentials: true
  });

  return res.data;
}