package com.scarlett.frame.service.utils;

import com.scarlett.common.path.PathUtils;
import com.scarlett.frame.service.orm.FileServerClient;
import com.scarlett.frame.service.utils.ueditor.EditMultipartFile;
import com.scarlett.frame.service.utils.ueditor.StandardMultipartFile;
import com.scarlett.frame.service.utils.ueditor.UeditorService;
import com.scarlett.frame.service.utils.ueditor.baidu.define.AppInfo;
import com.scarlett.frame.service.utils.ueditor.baidu.define.BaseState;
import com.scarlett.frame.service.utils.ueditor.baidu.define.MultiState;
import com.scarlett.frame.service.utils.ueditor.baidu.define.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@Component
public class UeditorServiceLocalImpl implements UeditorService {

	private static final String UPLOAD_PATH = "upload";

	private static final Logger logger = LoggerFactory.getLogger( UeditorServiceLocalImpl.class );

	@Autowired
	private FileServerClient fileServerClient;

	@Override
	public EditMultipartFile getMultipartFile(String filedName, HttpServletRequest request) {
		EditMultipartFile resultFile = null;
		try {
			MultipartHttpServletRequest multipartHttpservletRequest = (MultipartHttpServletRequest) request;
			MultipartFile multipartFile = multipartHttpservletRequest.getFile(filedName);
			if (!multipartFile.isEmpty()) {
				resultFile = new StandardMultipartFile(
						filedName,
						multipartFile.getInputStream(),
						multipartFile.getOriginalFilename(),
						multipartFile.getSize( ));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return resultFile;
	}

	@Override
	public State saveFileByInputStream(EditMultipartFile multipartFile, long maxSize, HttpServletRequest request ) {
		State state = null;
		if ( multipartFile.getSize( ) > maxSize ) {
			return new BaseState( false, AppInfo.MAX_SIZE );
		}
		String fileType = PathUtils.getExtName( multipartFile.getOriginalFilename( ));
		try {
			InputStream inputStream = multipartFile.getInputStream( );
			String url = fileServerClient.uploadFile( multipartFile.getOriginalFilename( ), inputStream );

			state = new BaseState(true);
			state.putInfo("original", multipartFile.getOriginalFilename( ));
			state.putInfo("type", fileType );
			state.putInfo("url", url );

			return state;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new BaseState(false, AppInfo.IO_ERROR);
	}

	@Override
	public State saveBinaryFile(byte[] data, String fileName) {
		State state = null;

		return new BaseState(false, AppInfo.IO_ERROR);
	}

	@Override
	public State listFile(String[] allowFiles, int start, int pageSize) {
		// 把计入数据库中的文件信息读取出来，返回即可

		State state = new MultiState(true);
		state.putInfo("start", start);
		state.putInfo("total", 0);
		return state;
	}

}
