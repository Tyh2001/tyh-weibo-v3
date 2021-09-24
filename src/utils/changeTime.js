/**
 * 将时间戳转换为真正的时间格式
 * @param { string } times 时间戳
 * @returns xxxx年 xx月 xx日 xx时
 */
export const toDates = times => {
  const date = new Date(parseInt(times))
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const dateTime = `${Y} 年 ${M}月 ${D}日 ${H}时`
  return dateTime
}
