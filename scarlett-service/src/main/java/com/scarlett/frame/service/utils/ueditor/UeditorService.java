package com.scarlett.frame.service.utils.ueditor;

import com.scarlett.frame.service.utils.ueditor.baidu.define.State;

import javax.servlet.http.HttpServletRequest;


public interface UeditorService {

	/**
	 * 获取上传的文件
	 *
	 * @param filedName
	 *            参数名
	 * @param request
	 * @return
	 */
	public EditMultipartFile getMultipartFile(String filedName, HttpServletRequest request);

	/**
	 * 存储文件
	 *
	 * @param multipartFile
	 * @param maxSize
	 * @return
	 */
	public State saveFileByInputStream(EditMultipartFile multipartFile, long maxSize, HttpServletRequest request);

	/**
	 * 存储文件
	 *
	 * @param data
	 * @param fileName
	 * @return
	 */
	public State saveBinaryFile(byte[] data, String fileName);

	/**
	 * 获取文件列表
	 *
	 * @param allowFiles
	 *            允许显示的文件
	 * @param start
	 *            起始位置
	 * @param pageSize
	 *            每页显示条数
	 * @return
	 */
	public State listFile(String[] allowFiles, int start, int pageSize);

}