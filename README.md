# DateTime

DateTime 静态方法也类似 Date，只是返回的是 DateTime对象
    now
    UTC
    parse
    getDays(year [, month])
    getDaysInMonth(year, month)
    getDaysInYear(year)


功能参考 XDate

DateTime.prototype = {
    toDate
    format
    
    addYears // 自动处理溢出
    addMonths // 自动处理溢出，例如：7月31加一个月为8月30
    addWeeks
    addDays
    addHours
    addMinutes
    addSeconds
    addMilliseconds

    diffYears
    diffMonths
    diffWeeks
    diffDays
    diffHours
    diffMinutes
    diffSeconds
    diffMilliseconds

    getMonthDays
    getYearDays

    ...
    getWeekCalendar //  返回 DateTime 对象的周视图数组
    getMonthCalendar // 返回 DateTime 对象的月视图二维数组
}