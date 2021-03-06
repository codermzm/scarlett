package com.scarlett.bean.dao;

import java.io.Serializable;
import java.util.Date;

public class ProductDescribeDao implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_describe.id
     *
     * @mbg.generated
     */
    private Long id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_describe.title
     *
     * @mbg.generated
     */
    private String title;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_describe.file_url
     *
     * @mbg.generated
     */
    private String fileUrl;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_describe.update_time
     *
     * @mbg.generated
     */
    private Date updateTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column product_describe.create_time
     *
     * @mbg.generated
     */
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_describe.id
     *
     * @return the value of product_describe.id
     *
     * @mbg.generated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_describe.id
     *
     * @param id the value for product_describe.id
     *
     * @mbg.generated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_describe.title
     *
     * @return the value of product_describe.title
     *
     * @mbg.generated
     */
    public String getTitle() {
        return title;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_describe.title
     *
     * @param title the value for product_describe.title
     *
     * @mbg.generated
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_describe.file_url
     *
     * @return the value of product_describe.file_url
     *
     * @mbg.generated
     */
    public String getFileUrl() {
        return fileUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_describe.file_url
     *
     * @param fileUrl the value for product_describe.file_url
     *
     * @mbg.generated
     */
    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl == null ? null : fileUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_describe.update_time
     *
     * @return the value of product_describe.update_time
     *
     * @mbg.generated
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_describe.update_time
     *
     * @param updateTime the value for product_describe.update_time
     *
     * @mbg.generated
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column product_describe.create_time
     *
     * @return the value of product_describe.create_time
     *
     * @mbg.generated
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column product_describe.create_time
     *
     * @param createTime the value for product_describe.create_time
     *
     * @mbg.generated
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}