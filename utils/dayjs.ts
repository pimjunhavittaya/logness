import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const customDayjs = dayjs.extend(utc);

export default customDayjs;
