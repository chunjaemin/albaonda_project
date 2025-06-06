export const colorPalette = [
  '#FCA5A5', // bg-red-300
  '#FDBA74', // bg-orange-300
  '#FCD34D', // bg-amber-300
  '#FACC15', // bg-yellow-300
  '#BEF264', // bg-lime-300
  '#86EFAC', // bg-green-300
  '#6EE7B7', // bg-emerald-300
  '#5EEAD4', // bg-teal-300
  '#67E8F9', // bg-cyan-300
  '#7DD3FC', // bg-sky-300
  '#93C5FD', // bg-blue-300
  '#A5B4FC', // bg-indigo-300
  '#C4B5FD', // bg-violet-300
  '#D8B4FE', // bg-purple-300
  '#F0ABFC', // bg-fuchsia-300
  '#F9A8D4', // bg-pink-300
  '#FDA4AF', // bg-rose-300
  '#D6D3D1', // bg-stone-300
  '#D1D5DB', // bg-gray-300
  '#E5E7EB'  // bg-zinc-300
];
/**
 * 사용자 이름을 기반으로 색상 고정 생성
 * @param {string} name - 사용자 이름
 * @returns {string} - HEX 색상 코드
 */
export function getUserColor(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    const weight = i + 1;
    sum += name.charCodeAt(i) * weight;
  }
  const index = sum % colorPalette.length;
  return colorPalette[index];
}