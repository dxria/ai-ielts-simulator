import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import calendar from 'dayjs/plugin/calendar';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.locale('uk');

export function setLocale(locale: string = 'uk') {
    dayjs.locale(locale);
    dayjs.updateLocale(locale, {
        relativeTime: {
            y: 'рік',
            d: 'день',
            h: 'годину',
            M: 'місяць',
            m: 'хвилину',
            dd: '%d днів',
            hh: '%d годин',
            yy: '%d років',
            past: '%s тому',
            mm: '%d хвилин',
            MM: '%d місяців',
            future: 'через %s',
            s: 'кілька секунд',
        },
        calendar: {
            lastDay: '[Вчора о] HH:mm', // Yesterday at 18:30
            nextWeek: 'dddd [о] HH:mm', // Monday at 18:30
            nextDay: '[Завтра о] HH:mm', // Tomorrow at 18:30
            sameDay: '[Сьогодні о] HH:mm', // Today at 18:30
            sameElse: 'DD.MM.YYYY [о] HH:mm', // Default fallback
            lastWeek: '[Минулого] dddd [о] HH:mm', // Last Monday at 18:30
        },
    });
}

export default dayjs;
