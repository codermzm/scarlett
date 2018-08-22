package com.scarlett.frame.service.utils.ueditor;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.frame.service.utils.ueditor.baidu.define.AppInfo;
import com.scarlett.frame.service.utils.ueditor.baidu.define.BaseState;
import com.scarlett.frame.service.utils.ueditor.baidu.define.FileType;
import com.scarlett.frame.service.utils.ueditor.baidu.define.State;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class UeditorBinaryUploader {
	
	public static final State save(HttpServletRequest request, Map<String, Object> conf, UeditorService ueditorService) {
		boolean isAjaxUpload = request.getHeader("X_Requested_With") != null;
		if (!ServletFileUpload.isMultipartContent(request)) {
			return new BaseState(false, AppInfo.NOT_MULTIPART_CONTENT);
		}

		ServletFileUpload upload = new ServletFileUpload(new DiskFileItemFactory());

		if (isAjaxUpload) {
			upload.setHeaderEncoding("UTF-8");
		}

		try {
			String filedName = (String) conf.get("fieldName");
			
			EditMultipartFile multipartFile = ueditorService.getMultipartFile(filedName, request);
			if (multipartFile == null) {
				return new BaseState(false, AppInfo.NOTFOUND_UPLOAD_DATA);
			}
			
			String originFileName = multipartFile.getOriginalFilename();
			String suffix = FileType.getSuffixByFilename(originFileName);
			
			originFileName = originFileName.substring(0, originFileName.length() - suffix.length());
			
			long maxSize = ((Long) conf.get("maxSize")).longValue();

			if (!validType(suffix, (String[]) conf.get("allowFiles"))) {
				return new BaseState(false, AppInfo.NOT_ALLOW_FILE_TYPE);
			}
			
			InputStream is = multipartFile.getInputStream();
			State storageState = ueditorService.saveFileByInputStream(multipartFile, maxSize, request );
			is.close( );
			
			if (storageState.isSuccess()) {
				JSONObject jsonObj = JSONObject.parseObject( storageState.toJSONString());
				storageState.putInfo("url", jsonObj.getString("url"));
				storageState.putInfo("type", suffix);
				storageState.putInfo("original", originFileName + suffix);
			}

			return storageState;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new BaseState(false, AppInfo.IO_ERROR);
	}

	private static boolean validType(String type, String[] allowTypes) {
		List<String> list = Arrays.asList(allowTypes);
		return list.contains(type);
	}

}
