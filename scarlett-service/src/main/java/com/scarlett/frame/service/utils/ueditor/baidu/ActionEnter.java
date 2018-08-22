package com.scarlett.frame.service.utils.ueditor.baidu;

import com.scarlett.frame.service.utils.ueditor.baidu.define.ActionMap;
import com.scarlett.frame.service.utils.ueditor.baidu.define.BaseState;
import com.scarlett.frame.service.utils.ueditor.baidu.define.State;
import com.scarlett.frame.service.utils.ueditor.baidu.hunter.FileManager;
import com.scarlett.frame.service.utils.ueditor.baidu.hunter.ImageHunter;
import com.scarlett.frame.service.utils.ueditor.baidu.upload.Uploader;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


public class ActionEnter
{
  private HttpServletRequest request = null;

  private String rootPath = null;
  private String contextPath = null;

  private String actionType = null;

  private ConfigManager configManager = null;

  public ActionEnter(HttpServletRequest request, String rootPath)
  {
    this.request = request;
    this.rootPath = rootPath;
    this.actionType = request.getParameter("action");
    this.contextPath = request.getContextPath();
    this.configManager = ConfigManager.getInstance(this.rootPath, this.contextPath, request.getRequestURI());
  }

  public String exec()
  {
    String callbackName = this.request.getParameter("callback");

    if (callbackName != null)
    {
      if (!validCallbackName(callbackName)) {
        return new BaseState(false, 401).toJSONString();
      }

      return callbackName + "(" + invoke() + ");";
    }

    return invoke();
  }

  public String invoke()
  {
    if ((this.actionType == null) || (!ActionMap.mapping.containsKey(this.actionType))) {
      return new BaseState(false, 101).toJSONString();
    }

    if ((this.configManager == null) || (!this.configManager.valid())) {
      return new BaseState(false, 102).toJSONString();
    }

    State state = null;

    int actionCode = ActionMap.getType(this.actionType);

    Map conf = null;

    switch (actionCode)
    {
    case 0:
      return this.configManager.getAllConfig().toString();
    case 1:
    case 2:
    case 3:
    case 4:
      conf = this.configManager.getConfig(actionCode);
      state = new Uploader(this.request, conf).doExec();
      break;
    case 5:
      conf = this.configManager.getConfig(actionCode);
      String[] list = this.request.getParameterValues((String)conf.get("fieldName"));
      state = new ImageHunter(conf).capture(list);
      break;
    case 6:
    case 7:
      conf = this.configManager.getConfig(actionCode);
      int start = getStartIndex();
      state = new FileManager(conf).listFile(start);
    }

    return state.toJSONString();
  }

  public int getStartIndex()
  {
    String start = this.request.getParameter("start");
    try
    {
      return Integer.parseInt(start); } catch (Exception e) {
    }
    return 0;
  }

  public boolean validCallbackName(String name)
  {
    if (name.matches("^[a-zA-Z_]+[\\w0-9_]*$")) {
      return true;
    }

    return false;
  }
}