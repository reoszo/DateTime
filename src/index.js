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
        this.addMilliseconds(weeks * 604800000);
    }
    addDays(days) {
        this.addMilliseconds(days * 86400000);
    }
    addHours(hours) {
        this.addMilliseconds(hours * 3600000);
    }
    addMinutes(minutes) {
        this.addMilliseconds(minutes * 60000);
    }
    addSeconds(seconds) {
        this.addMilliseconds(seconds * 1000);
    }
    addMilliseconds(milliseconds) {
        this.setTime(this.getTime() + milliseconds);
    }
    // 所有的diff都返回的是整数差额
    diffYears(date) {
        return this.getFullYear() - date.getFullYear();
    }
    diffMonths(date) {
        return this.diffYears(date) * 12 + this.getMonth() - date.getMonth();
    }
    diffWeeks(date) {
        return Math.floor(this.diffMilliseconds(date) / 604800000);
    }
    diffDays(date) {
        return Math.floor(this.diffMilliseconds(date) / 86400000);
    }
    diffHours(date) {
        return Math.floor(this.diffMilliseconds(date) / 3600000);
    }
    diffMinutes(date) {
        return Math.floor(this.diffMilliseconds(date) / 60000);
    }
    diffSeconds(date) {
        return Math.floor(this.diffMilliseconds(date) / 1000);
    }
    diffMilliseconds(date) {
        return this.getTime() - date.getTime();
    }
}