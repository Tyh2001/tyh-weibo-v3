/**
 * 获取随机数
 * @param { number } max 最大长度
 * @param { number } min 最下长度
 * @returns 随机数
 */
export const randomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min
}
