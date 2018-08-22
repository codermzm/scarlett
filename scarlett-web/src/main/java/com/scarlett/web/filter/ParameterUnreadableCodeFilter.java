package com.scarlett.web.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

public class ParameterUnreadableCodeFilter implements Filter {
	private String encoding;
	private boolean hasBeenEncoded = false;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		encoding = filterConfig.getInitParameter("encoding");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest requ = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;

		// 使用包装类
		MyHttpServletRequest myrequest = new MyHttpServletRequest(requ);
		chain.doFilter(myrequest, resp);
	}

	private class MyHttpServletRequest extends HttpServletRequestWrapper {
		private HttpServletRequest request;

		public MyHttpServletRequest(HttpServletRequest request) {
			super(request);
			this.request = request;
		}

		// 求某个
		@Override
		public String getParameter(String name) {
			Map<String, String[]> map = getParameterMap();
			if (map != null) {
				String[] values = map.get(name);
				if (values != null) {
					return values[0];
				}
			}
			return null;
		}

		@Override
		public String[] getParameterValues(String name) {
			Map<String, String[]> map = getParameterMap();
			if (map != null) {
				String[] values = map.get(name);
				if (values != null) {
					return values;
				}
			}
			return null;
		}

		@Override
		public Map<String, String[]> getParameterMap() {
			if ("post".equalsIgnoreCase(request.getMethod())) {
				// post方式提交
				try {
					request.setCharacterEncoding(encoding);
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				return request.getParameterMap();
			} else {
				// get方式提交
				Map<String, String[]> paramMap = request.getParameterMap();
				if (!hasBeenEncoded) {
					for (Map.Entry<String, String[]> me : paramMap.entrySet()) {
						String[] values = me.getValue();
						for (int i = 0; i < values.length; i++) {
							try {
								values[i] = new String(values[i].getBytes("iso8859-1"), encoding);
							} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
							}
						}
					}
					hasBeenEncoded = true;
				}
				return paramMap;
			}
		}
	}

	@Override
	public void destroy() {
		encoding = null;
	}

}
