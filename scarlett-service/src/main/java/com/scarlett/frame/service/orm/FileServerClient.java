package com.scarlett.frame.service.orm;

import java.io.IOException;
import java.io.InputStream;

/**
 * 文件服务器客户端
 * Created by admin on 2017/6/21.
 */
public interface FileServerClient {

    /**
     * 上传文件并获取文件请求地址
     * */
    String uploadFile( String fileName, InputStream stream ) throws IOException;

}
