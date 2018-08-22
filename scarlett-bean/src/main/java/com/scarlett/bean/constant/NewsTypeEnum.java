package com.scarlett.bean.constant;

/**
 * Created by admin on 2017/7/21.
 */
public enum NewsTypeEnum {

    IMPORT_NEWS( Byte.valueOf( "1" ), "要闻" ),
    FU_SHI_NEWS( Byte.valueOf( "2" ), "复试新闻" ),
    KAO_YAN_ZI_XUN_NEWS( Byte.valueOf( "3" ), "XXX资讯" ),
    JI_GOU_ZI_XUN_NEWS( Byte.valueOf( "4" ), "机构资讯" ),
    GONG_GONG_KE_ZI_LIAO( Byte.valueOf( "5" ), "公共课资料" ),
    ZHEN_TI_ZI_LIAO( Byte.valueOf( "6" ), "真题资料" ),
    DA_GANG_ZI_LIAO( Byte.valueOf( "7" ), "大纲资料" ),
    TIAO_JI_NEWS( Byte.valueOf( "8" ), "调剂新闻" ),

    YING_YU_ZI_LIAO( Byte.valueOf( "9" ), "英语资料" ),
    SHU_XUE_ZI_LIAO( Byte.valueOf( "10" ), "数学资料" ),
    ZHENG_ZHI_ZI_LIAO( Byte.valueOf( "11" ), "政治资料" ),

    TIAO_JI_LINE_NEWS( Byte.valueOf( "12" ), "调剂分数线" );

    private Byte key;
    private String desc;

    NewsTypeEnum( Byte key, String desc ) {
        this.key = key;
        this.desc = desc;
    }

    public Byte getKey() {
        return key;
    }

    public String getDesc() {
        return desc;
    }

    public static NewsTypeEnum valueOf(Byte key ) {
        for ( NewsTypeEnum newsTypeEnum : NewsTypeEnum.values( )) {
            if ( newsTypeEnum.getKey( ).equals( key )) {
                return newsTypeEnum;
            }
        }

        return null;
    }
}
