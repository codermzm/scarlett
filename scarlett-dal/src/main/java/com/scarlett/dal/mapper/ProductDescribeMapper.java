package com.scarlett.dal.mapper;

import java.util.List;

import com.scarlett.bean.dao.ProductDescribeDao;
import com.scarlett.bean.dao.ProductDescribeDaoCriteria;
import org.apache.ibatis.annotations.Param;

public interface ProductDescribeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    long countByExample(ProductDescribeDaoCriteria example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int deleteByExample(ProductDescribeDaoCriteria example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int insert(ProductDescribeDao record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int insertSelective(ProductDescribeDao record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    List<ProductDescribeDao> selectByExample(ProductDescribeDaoCriteria example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    ProductDescribeDao selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") ProductDescribeDao record, @Param("example") ProductDescribeDaoCriteria example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") ProductDescribeDao record, @Param("example") ProductDescribeDaoCriteria example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(ProductDescribeDao record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table product_describe
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(ProductDescribeDao record);
}