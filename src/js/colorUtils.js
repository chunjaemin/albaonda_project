export const colorPalette = [
  '#FECACA', // bg-red-100
  '#FFEDD5', // bg-orange-100
  '#FEF3C7', // bg-amber-100
  '#FEF9C3', // bg-yellow-100
  '#ECFCCB', // bg-lime-100
  '#DCFCE7', // bg-green-100
  '#D1FAE5', // bg-emerald-100
  '#CCFBF1', // bg-teal-100
  '#CFFAFE', // bg-cyan-100
  '#E0F2FE', // bg-sky-100
  '#DBEAFE', // bg-blue-100
  '#E0E7FF', // bg-indigo-100
  '#EDE9FE', // bg-violet-100
  '#F3E8FF', // bg-purple-100
  '#FAE8FF', // bg-fuchsia-100
  '#FCE7F3', // bg-pink-100
  '#FFE4E6', // bg-rose-100
  '#E7E5E4', // bg-stone-100
  '#F3F4F6', // bg-gray-100
  '#FAFAFA'  // bg-zinc-100
];
/**
 * 사용자 이름을 기반으로 색상 고정 생성
 * @param {string} name - 사용자 이름
 * @returns {string} - HEX 색상 코드
 */
export function getUserColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
}