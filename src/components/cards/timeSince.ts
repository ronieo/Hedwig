/**
* 주어진 날짜와 현재 시간과의 차이를 토대로 지난 시간을 한국어로 표현해 반환합니다.
* @function timeSince
* @param {Date} date - 비교할 날짜입니다.
* @returns {string} - 지난 시간을 한국어로 표현한 문자열입니다. ex) "1일 전"

* @date 2023.04.23
* @author 임성열
*/
export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  let interval = seconds / 31536000

  switch (true) {
      case interval > 1:
          return `${Math.floor(interval)}년 전`
      case (interval = seconds / 2592000) > 1:
          return `${Math.floor(interval)}달 전`
      case (interval = seconds / 86400) > 1:
          return `${Math.floor(interval)}일 전`
      case (interval = seconds / 3600) > 1:
          return `${Math.floor(interval)}시간 전`
      case (interval = seconds / 60) > 1:
          return `${Math.floor(interval)}분 전`
      default:
          return `방금 전`
  }
}
