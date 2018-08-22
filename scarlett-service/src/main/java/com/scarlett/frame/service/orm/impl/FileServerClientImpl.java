package com.scarlett.frame.service.orm.impl;

import com.alibaba.fastjson.JSONObject;
import com.scarlett.bean.constant.ConstantCodeKey;
import com.scarlett.common.config.ConfigUtil;
import com.scarlett.frame.service.orm.FileServerClient;
import com.scarlett.frame.service.orm.entity.result.ResultInfo;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by admin on 2017/6/21.
 */
@Service
public class FileServerClientImpl implements FileServerClient {

    private static final Logger logger = LoggerFactory.getLogger( FileServerClientImpl.class );

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String uploadFile( final String fileName, InputStream stream) throws IOException {
        if ( StringUtils.isEmpty( fileName )) {
            logger.error( "filename can not be empty" );
            throw new RuntimeException( "filename can not be empty" );
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream( );
        byte[] data = new byte[1024];
        int count = -1;
        while ((count = stream.read( data, 0, 1024 )) != -1) {
            byteArrayOutputStream.write(data, 0, count);
        }
        stream.close( );
        byteArrayOutputStream.close( );

        ByteArrayResource arrayResource = new ByteArrayResource( byteArrayOutputStream.toByteArray( )) {
            @Override
            public String getFilename( ) throws IllegalStateException {
                return fileName;
            }
        };

        String fileServerKey = ConstantCodeKey.FILE_SERVER_URL.getKey( );
        String fileServerUrl = ConfigUtil.get( fileServerKey );

        HttpHeaders headers =new HttpHeaders( );
        headers.setContentType( MediaType.MULTIPART_FORM_DATA );

        MultiValueMap<String, Object> param = new LinkedMultiValueMap<>( );
        param.add("file", arrayResource);

        HttpEntity request = new HttpEntity( param, headers );
        logger.info( "RestTemplate|req,url:{},fileName:{}", fileServerUrl, fileName );
        JSONObject json = restTemplate.postForObject( fileServerUrl, request, JSONObject.class );
        logger.info( "RestTemplate|req,url:{},fileName:{},res:{}",
                fileServerUrl, fileName, json.toJSONString( ));

        ResultInfo resultInfo = new ResultInfo( json );
        if ( resultInfo.isSuccess( ) == false ) { // 处理失败
            logger.error( "upload file error,file name:{}", fileName );
            throw new IOException( "upload file error,file name:" + fileName );
        }
        Object urlObj =  resultInfo.getData( );
        if (( urlObj instanceof String ) == false ) {
            logger.error( "result type error,file name:{}", fileName );
            throw new RuntimeException( "upload file error,file name:" + fileName );
        }

        return ( String ) urlObj;
    }
}
