const MILLISECONDS = 1000,
    MINUTE_MILLISECONDS = 60 * MILLISECONDS,
    HOUR_MILLISECONDS = 60 * MINUTE_MILLISECONDS,
    DAY_MILLISECONDS = 24 * HOUR_MILLISECONDS,
    WEEK_MILLISECONDS = 7 * DAY_MILLISECONDS;

function diff(date1, date2, unit) {
    let offset = date1.getTimezoneOffset() * MINUTE_MILLISECONDS;
    return Math.floor((date1.getTime() - offset) / unit) - Math.floor((date2.getTime() - offset) / unit)
}

class DateTime extends Date {
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

    }
    static format(date, pattern) {
        return 'yyyy-MM-dd HH:mm:ss'
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
    addYear(years) {
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
    addMonth(months) {
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
    addWeek(weeks) {
        this.addMillisecond(weeks * WEEK_MILLISECONDS);
    }
    addDay(days) {
        this.addMillisecond(days * DAY_MILLISECONDS);
    }
    addHour(hours) {
        this.addMillisecond(hours * HOUR_MILLISECONDS);
    }
    addMinute(minutes) {
        this.addMillisecond(minutes * MINUTE_MILLISECONDS);
    }
    addSecond(seconds) {
        this.addMillisecond(seconds * MILLISECONDS);
    }
    addMillisecond(milliseconds) {
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