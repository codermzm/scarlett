package com.scarlett.web.controller.tools;

import com.scarlett.frame.service.utils.FileOperationService;
import com.scarlett.web.base.BaseController;
import com.scarlett.web.base.JsonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 负责文件的上传下载
 * Created by mazhiming on 2017/6/20.
 */
@Controller
@RequestMapping("/tools/file")
public class FileOperationController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger( FileOperationController.class );

    @Autowired
    private FileOperationService fileOperationService;

    @ResponseBody
    @RequestMapping( value = "/upload" )
    public JsonResult<String> upload(@RequestParam( value = "file") MultipartFile multipartFile ) throws IOException {
        String url = fileOperationService.uploadFile( multipartFile );

        return super.success( "ok", url );
    }
}
