package com.scarlett.bean.constant;

/**
 * Created by admin on 2017/7/21.
 */
public enum NewsStatusEnum {

    BEFORE_EXAMINE( Byte.valueOf( "0" ), "待审核" ),

    ONLINE( Byte.valueOf( "1" ), "在线" ),

    OFFLINE( Byte.valueOf( "2" ), "下线" );

    private Byte key;
    private String desc;

    NewsStatusEnum( Byte key, String desc ) {
        this.key = key;
        this.desc = desc;
    }

    public Byte getKey() {
        return key;
    }

    public String getDesc() {
        return desc;
    }

    public NewsStatusEnum valueOf(Byte key ) {
        for ( NewsStatusEnum statusEnum : NewsStatusEnum.values( )) {
            if ( statusEnum.getKey( ).equals( key )) {
                return statusEnum;
            }
        }

        return null;
    }

}
