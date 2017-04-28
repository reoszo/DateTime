const MILLISECONDS = 1000,
    MINUTE_MILLISECONDS = 60 * MILLISECONDS,
    HOUR_MILLISECONDS = 60 * MINUTE_MILLISECONDS,
    DAY_MILLISECONDS = 24 * HOUR_MILLISECONDS,
    WEEK_MILLISECONDS = 7 * DAY_MILLISECONDS;

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
    addYears(years) {
        let year = this.getFullYear(),
            month = this.getMonth(),
            day = this.getDate(),
            toYear = year + years,
            toMonth = month,
            maxDay = DateTime.getMonthDays(toYear, toMonth),
            toDay = day > maxDay ? maxDay : day,
            diffMilliseconds = Date.UTC(toYear, toMonth, toDay) - Date.UTC(year, month, day);
        this.addMilliseconds(diffMilliseconds);
    }
    addMonths(months) {
        let year = this.getFullYear(),
            month = this.getMonth(),
            day = this.getDate();
        months += month;
        let toYear = year + Math.floor(months / 12),
            toMonth = (months > 0 ? months % 12 : months % 12 + 12),
            maxDay = DateTime.getMonthDays(toYear, toMonth),
            toDay = day > maxDay ? maxDay : day,
            diffMilliseconds = Date.UTC(toYear, toMonth, toDay) - Date.UTC(year, month, day);
        this.addMilliseconds(diffMilliseconds);
    }
    addWeeks(weeks) {
        this.addMilliseconds(weeks * WEEK_MILLISECONDS);
    }
    addDays(days) {
        this.addMilliseconds(days * DAY_MILLISECONDS);
    }
    addHours(hours) {
        this.addMilliseconds(hours * HOUR_MILLISECONDS);
    }
    addMinutes(minutes) {
        this.addMilliseconds(minutes * MINUTE_MILLISECONDS);
    }
    addSeconds(seconds) {
        this.addMilliseconds(seconds * MILLISECONDS);
    }
    addMilliseconds(milliseconds) {
        this.setTime(this.getTime() + milliseconds);
    }
    diffYears(date) {
        return this.getFullYear() - date.getFullYear();
    }
    diffMonths(date) {
        return this.diffYears(date) * 12 + this.getMonth() - date.getMonth();
    }
    diffWeeks(date) {
        return diff(this, date, WEEK_MILLISECONDS);
    }
    diffDays(date) {
        return diff(this, date, DAY_MILLISECONDS);
    }
    diffHours(date) {
        return diff(this, date, HOUR_MILLISECONDS);
    }
    diffMinutes(date) {
        return diff(this, date, MINUTE_MILLISECONDS);
    }
    diffSeconds(date) {
        return diff(this, date, MILLISECONDS);
    }
    diffMilliseconds(date) {
        return diff(this, date, 1);
    }
}

function diff(date1, date2, unit) {
    let offset = date1.getTimezoneOffset() * MINUTE_MILLISECONDS;
    return Math.floor((date1.getTime() - offset) / unit) - Math.floor((date2.getTime() - offset) / unit)
}

DateTime.MILLISECONDS = MILLISECONDS;
DateTime.MINUTE_MILLISECONDS = MINUTE_MILLISECONDS;
DateTime.HOUR_MILLISECONDS = HOUR_MILLISECONDS;
DateTime.DAY_MILLISECONDS = DAY_MILLISECONDS;
DateTime.WEEK_MILLISECONDS = WEEK_MILLISECONDS;