/*
Navicat MySQL Data Transfer

Source Server         : 个人库
Source Server Version : 50717
Source Host           : 114.115.218.177:3306
Source Database       : education

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-16 15:26:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL DEFAULT '' COMMENT '新闻标题',
  `title_img_url` varchar(256) NOT NULL DEFAULT '' COMMENT '新闻头图',
  `content_url` varchar(256) NOT NULL DEFAULT '' COMMENT '新闻内容路径',
  `source_url` varchar(256) NOT NULL DEFAULT '' COMMENT '来源路径',
  `type` tinyint(3) NOT NULL DEFAULT '1' COMMENT '新闻类型 1 要闻 2 复试新闻 3 考研资讯 4 机构资讯 5 公共课资料 6 真题资料 7 考研大纲资料 8 调剂新闻',
  `status` tinyint(3) NOT NULL DEFAULT '0' COMMENT '状态 0 待审核 1 在线 2 关闭',
  `is_top` tinyint(3) NOT NULL DEFAULT '0' COMMENT '是否置顶 0 非置顶 1 置顶',
  `news_time` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '新闻时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `create_time` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8 COMMENT='新闻表';

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('2', '2018保研率低又容易考的10所985院校', 'http://114.115.218.177:81/files/5670754c0c4e4010815970bfdac90b20.jpg', 'http://114.115.218.177:81/files/2770a51941974664ad7f4743d0d1af07.htm', '', '4', '1', '0', '2017-07-30 00:00:00', '2017-08-14 00:48:27', '2000-01-01 00:00:00');
INSERT INTO `news` VALUES ('3', '2018考研短期高效复习秘诀', 'http://114.115.218.177:81/files/9b653a758c3c4de5b4e9cd53ba76148a.jpg', 'http://114.115.218.177:81/files/9af522ba82fd415698cfa2e0c347acd9.htm', '', '4', '1', '0', '2017-07-30 00:00:00', '2017-08-26 23:52:21', '2017-07-24 00:55:31');
