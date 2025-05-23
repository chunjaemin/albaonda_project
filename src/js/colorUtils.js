const colorPalette = [
  '#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D',
  '#43AA8B', '#577590', '#277DA1', '#9D4EDD', '#F72585',
  '#B5179E', '#7209B7', '#560BAD', '#3A0CA3', '#4361EE',
  '#4CC9F0', '#2EC4B6', '#E63946', '#FFD166', '#06D6A0',
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
