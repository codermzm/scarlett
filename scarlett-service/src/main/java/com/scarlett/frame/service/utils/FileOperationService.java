package com.scarlett.frame.service.utils;

import com.scarlett.common.path.PathUtils;
import com.scarlett.frame.service.orm.FileServerClient;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by admin on 2017/6/27.
 */
@Service
public class FileOperationService {

    private static final Logger logger = LoggerFactory.getLogger( FileOperationService.class );

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private FileServerClient fileServerClient;

    public String uploadFile( MultipartFile multipartFile ) throws IOException {
        String fileType = PathUtils.getExtName( multipartFile.getOriginalFilename( ));
        InputStream inputStream = multipartFile.getInputStream( );
        String url = fileServerClient.uploadFile( multipartFile.getOriginalFilename( ), inputStream );

        return url;
    }

    public String uploadFile( String fileName, String contentStr ) throws IOException {
        if ( StringUtils.isEmpty( contentStr )) {
            logger.error( "contentStr can not be empty" );
            throw new RuntimeException( "contentStr can not be empty" );
        }
        if ( StringUtils.isEmpty( fileName )) {
            logger.error( "fileType can not be empty" );
            throw new RuntimeException( "fileType can not be empty" );
        }

        InputStream inputStream = new ByteArrayInputStream( contentStr.getBytes("UTF-8"));
        String url = fileServerClient.uploadFile( fileName, inputStream );

        return url;
    }

    public String getFileContent( String fileUrl )  {
        if ( StringUtils.isEmpty( fileUrl )) {
            logger.error( "fileUrl can not be empty" );
            throw new RuntimeException( "fileUrl can not be empty" );
        }

        String str = restTemplate.postForObject( fileUrl, null, String.class );

        return str;
    }

}
