package com.scarlett.web.controller.tools;

import com.scarlett.frame.service.utils.ueditor.UeditorActionEnter;
import com.scarlett.frame.service.utils.ueditor.UeditorService;
import com.scarlett.web.base.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * Created by admin on 2017/6/5.
 */
@Controller
@RequestMapping("/tools/ueditor")
public class UeditorController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger( UeditorController.class );

    @Autowired
    private UeditorService ueditorService;

    @ResponseBody
    @RequestMapping(value = "execute")
    public String execute(HttpServletRequest request, HttpServletResponse response, Model model) throws UnsupportedEncodingException {
        String rootPath = request.getServletContext().getRealPath("/");
        String resultMsg = new UeditorActionEnter(request, rootPath, this.ueditorService).exec( );

        return resultMsg;
    }

}
