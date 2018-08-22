package com.scarlett.frame.service.exception;

public class ServiceException extends RuntimeException {

	private static final long serialVersionUID = -3691723850562718292L;

	public ServiceException() {
		super();
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

}
