package com.scarlett.common.date;

import org.apache.commons.lang3.StringUtils;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by admin on 2017/3/4.
 */
public class DateUtils {

    /**
     * 将指定字符串转换成日期
     *
     * @param date
     *            String 日期字符串
     * @param dateFormat
     *            DateFormat 日期格式
     * @return Date
     */
    public static Date parseDate(String date, DateFormat dateFormat ) {
        SimpleDateFormat sd = new SimpleDateFormat(dateFormat.getFormat( ));
        return sd.parse(date, new java.text.ParsePosition( 0 ));
    }


    public static String formatDate(Date date, DateFormat dateFormat ) {
        SimpleDateFormat sd = new SimpleDateFormat(dateFormat.getFormat( ));
        return sd.format(date);
    }

    public static DateFormat getDateFormat( String dateStr ) {
        if ( StringUtils.isEmpty( dateStr )) {
            return null;
        }
        DateFormat dateFormat =
                isDateTime( dateStr ) ? DateFormat.DATETIME_FORMAT :
                isDate( dateStr ) ? DateFormat.DATE_FORMAT :
                isTime( dateStr ) ? DateFormat.TIME_FORMAT : null;

        return dateFormat;
    }


    protected static Pattern _date = Pattern.compile("^(\\d{4})(-|\\/)(\\d{1,2})(-|\\/)(\\d{1,2})$");
    private static boolean isDate( String date ) {
        Matcher matcher = _date.matcher( date );

        return matcher.matches( );
    }

    protected static Pattern _datetime = Pattern.compile("^(\\d{4})(-|\\/)(\\d{1,2})(-|\\/)(\\d{1,2}) (\\d{1,2}):(\\d{1,2}):(\\d{1,2})$");
    private static boolean isDateTime( String date ) {
        Matcher matcher = _datetime.matcher( date );

        return matcher.matches( );
    }

    protected static Pattern _time = Pattern.compile("^((20|21|22|23|24|[0-1]\\d)\\:[0-5][0-9])(\\:[0-5][0-9])?$");
    private static boolean isTime( String date ) {
        Matcher matcher = _time.matcher( date );
        return matcher.matches( );
    }

}
