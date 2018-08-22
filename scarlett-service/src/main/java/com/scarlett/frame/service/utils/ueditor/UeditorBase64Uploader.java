package com.scarlett.frame.service.utils.ueditor;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.frame.service.utils.ueditor.baidu.define.AppInfo;
import com.scarlett.frame.service.utils.ueditor.baidu.define.BaseState;
import com.scarlett.frame.service.utils.ueditor.baidu.define.FileType;
import com.scarlett.frame.service.utils.ueditor.baidu.define.State;
import org.apache.commons.codec.binary.Base64;

import java.util.Map;

public class UeditorBase64Uploader {

	public static State save(String content, Map<String, Object> conf, UeditorService ueditorService) {

		byte[] data = decode(content);

		long maxSize = ((Long) conf.get("maxSize")).longValue();

		if (!validSize(data, maxSize)) {
			return new BaseState(false, AppInfo.MAX_SIZE);
		}
		
		String suffix = FileType.getSuffix("JPG");
		State storageState = ueditorService.saveBinaryFile(data, conf.get("filename")+ suffix);
		
		if (storageState.isSuccess()) {
			JSONObject jsonObj = JSONObject.parseObject(storageState.toJSONString());
			storageState.putInfo("url", jsonObj.getString("url"));
			storageState.putInfo("type", suffix);
			storageState.putInfo("original", "");
		}

		return storageState;
	}

	private static byte[] decode(String content) {
		return Base64.decodeBase64(content);
	}

	private static boolean validSize(byte[] data, long length) {
		return data.length <= length;
	}

}
