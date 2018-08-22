package com.scarlett.common.verificationcode;

import java.awt.image.BufferedImage;

public class VerificationEntity {

	private BufferedImage bufferedImage;  
	
	private String text;

	public BufferedImage getBufferedImage() {
		return bufferedImage;
	}

	public void setBufferedImage(BufferedImage bufferedImage) {
		this.bufferedImage = bufferedImage;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}  
}
