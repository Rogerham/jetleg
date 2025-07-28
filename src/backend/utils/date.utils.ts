
// Datum gerelateerde utility functies
export class DateUtils {
  static getCurrentDate(): Date {
    return new Date();
  }

  static getDateRange(option: string): { start: Date; end: Date } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (option) {
      case 'today':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return { start: today, end: tomorrow };

      case 'tomorrow':
        const tomorrowStart = new Date(today);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);
        const tomorrowEnd = new Date(tomorrowStart);
        tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
        return { start: tomorrowStart, end: tomorrowEnd };

      case 'weekend':
        const nextSaturday = new Date(today);
        const daysUntilSaturday = (6 - today.getDay()) % 7;
        nextSaturday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
        const nextMonday = new Date(nextSaturday);
        nextMonday.setDate(nextSaturday.getDate() + 2);
        return { start: nextSaturday, end: nextMonday };

      case 'next-week':
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        const weekAfter = new Date(nextWeek);
        weekAfter.setDate(nextWeek.getDate() + 7);
        return { start: nextWeek, end: weekAfter };

      case 'next-month':
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
        const monthAfter = new Date(nextMonth);
        monthAfter.setMonth(nextMonth.getMonth() + 1);
        return { start: nextMonth, end: monthAfter };

      default:
        return { start: today, end: new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000) };
    }
  }

  static parseDateString(dateStr: string): Date | null {
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }

  static formatDateForDatabase(date: Date): string {
    return date.toISOString();
  }
}
