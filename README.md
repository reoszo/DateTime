# DateTime

DateTime 静态方法也类似 Date，只是返回的是 DateTime对象
    now
    UTC
    parse
    getDays(year [, month])
    getDaysInMonth(year, month)
    getDaysInYear(year)

DateTime.prototype = {
    clone
    toDate
    format
        y: 年份 1(0001) 2017(2017)
        yy: 年份的后两位（着实没有用处），不够两位补零 01(0001) 17(2017)
        yyyy: 年份的四位表示 0001(0001) 2017(2017)
        M: 月份 1 ... 12
        MM: 月份 01 ... 12
        MMM: Jan ... Dec
        MMMM: January ... December
        d: 1 ... 31
        dd: 01 ... 31
        <!--D: 1 ... 365-->
        <!--DDD: 001 ... 365-->
        e: 星期 0 ... 6
        ee: Su ... Sa
        eee: Sun ... Sat
        eeee: Sunday ... Saturday
        h: 12小时制 1 ... 12
        hh: 12小时制 01 ... 12
        H: 24小时制 0 ... 23
        HH: 24小时制 00 ... 23
        k: 24小时制 1 ... 24
        kk: 24小时制 01 ... 24
        K: 12小时制 0 ... 11
        KK: 12小时制 00 ... 11
        m: 分钟 0 ... 59
        mm: 分钟 00 ... 59
        s: 秒 0 ... 59
        ss: 秒 00 ... 59
        x: 毫秒时间戳 1494035952079
        X: 秒时间戳 1494035952
        S: 一位毫秒表示 0 ... 9 （5）
        SS: 两位毫秒表示 00 ... 99 （56）
        SSS: 三位毫秒表示 00 ... 999 （567）
        a: am pm
        A: AM PM
    
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