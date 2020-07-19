import MaxDays from "./MaxDays";
import moment from 'moment'
import PeriodName from './periodsName';
import PeriodsName from "./periodsName";
import weekDays from "./weekDays";

const getDaysArray = (
  {
    days = [],
    period = '',
    type = '',
    daysWeek = [],
    time = [{
      H: new Date().getHours(),
      M: new Date().getMinutes(),
    }],
    start = 0,
    end = 0
  }
) => {
  //проверка на пустыне поля
  if (!period || !type) {
    return [...days];
  }
  //result array
  const result = []
  //разница в овремени до старта
  let difToStart = start === 0 ? 0 : Math.abs(moment(start).diff(Date.now(), 'days')) + 1
  //реальное максимальное ограничение на основе start end
  let realMax = ((end === 0) ? (MaxDays) : (MaxDays + difToStart));
  //период повторения
  let currentPeriod = (() => {
    switch (period) {
      case PeriodsName.EVERYDAY:
        return 1;
      case PeriodsName.TWODAY:
        return 2;
      case PeriodsName.THREEDAY:
        return 3;
      case PeriodsName.NONE:
        return 1;
      default:
        return 1
    }
  })()
  //counter
  let i = difToStart

  // console.log('PARAMS', 'difToStart=', difToStart, 'realMax=', realMax, 'currentPeriod=', currentPeriod)
  //если дни недели
  if (period === PeriodName.CHECKBOX) {
    for (; i < realMax; i++) {
      let thisDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + i,
        0,
        0,
        0
      );
      if (thisDay.valueOf() > end && end !== 0) {
        break
      }
      let thisWeekDay = thisDay.getDay()
      if (daysWeek.includes(thisWeekDay)) {
        result.push(thisDay);
      }
    }
    return [...result]
  }

  for (; i < realMax; i += currentPeriod) {
    let thisDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + i,
      0,
      0,
      0
    );
    if (thisDay.valueOf() > end && end !== 0) {
      break
    }
    result.push(thisDay);
  }
  return [...result]
}

export default getDaysArray
