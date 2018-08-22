/*
Navicat MySQL Data Transfer

Source Server         : 个人库
Source Server Version : 50717
Source Host           : 114.115.218.177:3306
Source Database       : education

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-16 15:26:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `visit_history`
-- ----------------------------
DROP TABLE IF EXISTS `visit_history`;
CREATE TABLE `visit_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `view_name` varchar(512) NOT NULL DEFAULT '' COMMENT '请求页面',
  `user_id` bigint(64) NOT NULL DEFAULT '0' COMMENT '请求用户id',
  `remote_ip` varchar(64) NOT NULL DEFAULT '' COMMENT '远程ip',
  `popu_channel` varchar(64) NOT NULL DEFAULT '' COMMENT ' 推广渠道',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `create_time` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visit_history
-- ----------------------------
INSERT INTO `visit_history` VALUES ('22', '/index', '0', '123.125.67.221', '0', '2017-10-16 00:46:39', '2017-10-16 00:46:39');
INSERT INTO `visit_history` VALUES ('23', '/', '0', '50.118.255.37', '0', '2017-10-16 00:55:50', '2017-10-16 00:55:50');
