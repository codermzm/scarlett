package com.scarlett.bean.bo;

/**
 * Created by admin on 2017/6/28.
 */
public class ProductBo {

    private Long id;

    private String title;

    private String describe;

    private String imgMini;

    private String imgBig;

    private Integer level;

    private Byte status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getImgMini() {
        return imgMini;
    }

    public void setImgMini(String imgMini) {
        this.imgMini = imgMini;
    }

    public String getImgBig() {
        return imgBig;
    }

    public void setImgBig(String imgBig) {
        this.imgBig = imgBig;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
