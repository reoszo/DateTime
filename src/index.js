const MILLISECONDS = 1000,
    MINUTE_MILLISECONDS = 60 * MILLISECONDS,
    HOUR_MILLISECONDS = 60 * MINUTE_MILLISECONDS,
    DAY_MILLISECONDS = 24 * HOUR_MILLISECONDS,
    WEEK_MILLISECONDS = 7 * DAY_MILLISECONDS,
    WEEK_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function diff(date1, date2, unit) {
    let offset = date1.getTimezoneOffset() * MINUTE_MILLISECONDS;
    return Math.floor((date1.getTime() - offset) / unit) - Math.floor((date2.getTime() - offset) / unit)
}

class DateTime extends Date {
    // begin 快捷日期，好像没啥用
    static today() {
        return new DateTime();
    }
    static beforeYesterday() {
        return new DateTime().addDay(-2);
    }
    static beforeYestoday() {
        return new DateTime().addDay(-2);
    }
    static yesterday() {
        return new DateTime().addDay(-1);
    }
    static yestoday() {
        return new DateTime().addDay(-1);
    }
    static tomorrow() {
        return new DateTime().addDay(1)
    }
    static afterTomorrow() {
        return new DateTime().addDay(2)
    }
    // end 快捷日期，好像没啥用
    static isLeapYear(year) {
        return (years % 4 == 0 && years % 100 != 0) || years % 400 == 0;
    }
    static getMonthDays(year, month) {
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        return month === 1 && DateTime.isLeapYear(year) ? days + 1 : days;
    }
    static getYearDays(year) {
        return DateTime.isLeapYear(year) ? 366 : 365;
    }
    static getMonthCalendar(year, month, option) {
        // xxx
    }
    static format(date, pattern) {
        if (!(date instanceof Date)) {
            date = new Date();
        }
        return pattern.replace(/'(.)|([a-z])\2*/ig, function (match, escapeChar, formatChar, index, pattern) {
            if (escapeChar) {
                return escapeChar
            }
            switch (match) {
                case 'y': return date.getFullYear();
                case 'yy': return date.getFullYear().toString().slice(-2).toString().padStart(2, '0');
                case 'yyyy': return date.getFullYear().toString().padStart(4, '0');
                case 'M': return date.getMonth() + 1;
                case 'MM': return (date.getMonth() + 1).toString().padStart(2, '0');
                case 'MMM': return MONTH_NAMES[date.getMonth()].slice(0, 3);
                case 'MMMM': return MONTH_NAMES[date.getMonth()];
                case 'd': return date.getDate();
                case 'dd': return date.getDate().toString().padStart(2, '0');
                // case 'D': return 365;
                // case 'DDD': return 365;
                case 'e': return date.getDay();
                case 'ee': return WEEK_NAMES[date.getDay()].slice(0, 2);
                case 'eee': return WEEK_NAMES[date.getDay()].slice(0, 3);
                case 'eeee': return WEEK_NAMES[date.getDay()];
                case 'h': return date.getHours() % 12 || 12;
                case 'hh': return (date.getHours() % 12 || 12).toString().padStart(2, '0');
                case 'H': return date.getHours();
                case 'HH': return date.getHours().toString().padStart(2, '0');
                case 'k': return date.getHours() || 24;
                case 'kk': return (date.getHours() || 24).toString().padStart(2, '0');
                case 'K': return date.getHours() % 12;
                case 'KK': return (date.getHours() % 12).toString().padStart(2, '0');
                case 'm': return date.getMinutes();
                case 'mm': return date.getMinutes().toString().padStart(2, '0');
                case 's': return date.getSeconds();
                case 'ss': return date.getSeconds().toString().padStart(2, '0');
                case 'x': return date.getTime();
                case 'X': return date.getTime().toString().slice(0, -3);
                case 'S': return date.getMilliseconds().toString().padStart(3, '0').slice(0, 1);
                case 'SS': return date.getMilliseconds().toString().padStart(3, '0').slice(0, 2);
                case 'SSS': return date.getMilliseconds().toString().padStart(3, '0');
                case 'a': return date.getHours() < 12 ? 'am' : 'pm';
                case 'A': return date.getHours() < 12 ? 'AM' : 'PM';
                // case 'DDD': return '年的第几天';
                // case 'w': return '年的第几周';
                // case 'W': return '月的第几周';
                // case 'z': return '时区';
                // case 'Z': return '时区';
                default: return match;
            }
        });
    }

    constructor(...args) {
        super(...args)
    }
    format(pattern) {
        return DateTime.format(this, pattern)
    }
    clone() {
        return new DateTime(this.getTime());
    }
    toDate() {
        return new Date(this.getTime());
    }
    getMonthDays() {
        return DateTime.getMonthDays(this.getFullYear(), this.getMonth());
    }
    getYearDays() {
        return DateTime.getYearDays(this.getFullYear());
    }
    addYear(years = 1) {
        let year = this.getFullYear(),
            month = this.getMonth(),
            day = this.getDate(),
            toYear = year + years,
            toMonth = month,
            maxDay = DateTime.getMonthDays(toYear, toMonth),
            toDay = day > maxDay ? maxDay : day,
            diffMilliseconds = Date.UTC(toYear, toMonth, toDay) - Date.UTC(year, month, day);
        this.addMillisecond(diffMilliseconds);
    }
    addMonth(months = 1) {
        let year = this.getFullYear(),
            month = this.getMonth(),
            day = this.getDate();
        months += month;
        let toYear = year + Math.floor(months / 12),
            toMonth = (months > 0 ? months % 12 : months % 12 + 12),
            maxDay = DateTime.getMonthDays(toYear, toMonth),
            toDay = day > maxDay ? maxDay : day,
            diffMilliseconds = Date.UTC(toYear, toMonth, toDay) - Date.UTC(year, month, day);
        this.addMillisecond(diffMilliseconds);
    }
    addWeek(weeks = 1) {
        this.addMillisecond(weeks * WEEK_MILLISECONDS);
    }
    addDay(days = 1) {
        this.addMillisecond(days * DAY_MILLISECONDS);
    }
    addHour(hours = 1) {
        this.addMillisecond(hours * HOUR_MILLISECONDS);
    }
    addMinute(minutes = 1) {
        this.addMillisecond(minutes * MINUTE_MILLISECONDS);
    }
    addSecond(seconds = 1) {
        this.addMillisecond(seconds * MILLISECONDS);
    }
    addMillisecond(milliseconds = 1) {
        this.setTime(this.getTime() + milliseconds);
    }
    diffYear(date) {
        return this.getFullYear() - date.getFullYear();
    }
    diffMonth(date) {
        return this.diffYear(date) * 12 + this.getMonth() - date.getMonth();
    }
    diffWeek(date) {
        return diff(this, date, WEEK_MILLISECONDS);
    }
    diffDay(date) {
        return diff(this, date, DAY_MILLISECONDS);
    }
    diffHour(date) {
        return diff(this, date, HOUR_MILLISECONDS);
    }
    diffMinute(date) {
        return diff(this, date, MINUTE_MILLISECONDS);
    }
    diffSecond(date) {
        return diff(this, date, MILLISECONDS);
    }
    diffMillisecond(date) {
        return diff(this, date, 1);
    }
}

DateTime.MILLISECONDS = MILLISECONDS;
DateTime.MINUTE_MILLISECONDS = MINUTE_MILLISECONDS;
DateTime.HOUR_MILLISECONDS = HOUR_MILLISECONDS;
DateTime.DAY_MILLISECONDS = DAY_MILLISECONDS;
DateTime.WEEK_MILLISECONDS = WEEK_MILLISECONDS;

export default DateTime;