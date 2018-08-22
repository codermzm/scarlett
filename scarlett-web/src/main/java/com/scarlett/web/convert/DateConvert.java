package com.scarlett.web.convert;

import com.scarlett.common.date.DateFormat;
import com.scarlett.common.date.DateUtils;
import com.scarlett.web.exception.ParamValidationException;
import org.springframework.core.convert.converter.Converter;

import java.util.Date;

/**
 * Created by admin on 2017/7/23.
 */
public class DateConvert implements Converter<String, Date> {

    // private static final Logger logger = LoggerFactory.getLogger( DateConvert.class );

    @Override
    public Date convert( String stringDate ) {
        DateFormat dateFormat = DateUtils.getDateFormat( stringDate );
        if ( dateFormat == null ) {
            throw new ParamValidationException( "date", "data format error" );
        }
        Date date = DateUtils.parseDate( stringDate, dateFormat );

        return date;
    }

}