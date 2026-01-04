import dayjs from 'dayjs';

/**
 * 日期格式化工具类
 */
export class DateFormatUtils {
  /**
   * 格式化 10 位时间戳（秒级）为指定格式的日期字符串
   *
   * @param timestamp 10 位时间戳（秒）
   * @param format 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
   * @returns 格式化后的日期字符串
   */
  static formatTimestamp(timestamp: number | string | undefined, format = 'YYYY-MM-DD HH:mm:ss'): string {
    if (!timestamp) return '-';

    // 如果是字符串，转换为数字
    const ts = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

    // 判断时间戳位数
    if (ts.toString().length === 10) {
      // 10 位时间戳是秒级，需要转换为毫秒
      return dayjs(ts * 1000).format(format);
    } else if (ts.toString().length === 13) {
      // 13 位时间戳是毫秒级
      return dayjs(ts).format(format);
    }

    return '-';
  }

  /**
   * 格式化日期为相对时间（如：刚刚、5分钟前、1小时前等）
   *
   * @param timestamp 10 位或 13 位时间戳
   * @returns 相对时间字符串
   */
  static formatRelative(timestamp: number | string | undefined): string {
    if (!timestamp) return '-';

    const ts = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    const milliseconds = ts.toString().length === 10 ? ts * 1000 : ts;

    return dayjs(milliseconds).fromNow();
  }

  /**
   * 获取当前时间戳（10位，秒级）
   *
   * @returns 10 位时间戳
   */
  static getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * 将日期字符串转换为时间戳
   *
   * @param dateString 日期字符串
   * @returns 10 位时间戳
   */
  static dateToTimestamp(dateString: string): number {
    return dayjs(dateString).unix();
  }
}
