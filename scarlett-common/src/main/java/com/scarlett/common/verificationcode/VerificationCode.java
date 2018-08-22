package com.scarlett.common.verificationcode;

import java.awt.Color;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import com.scarlett.common.verificationcode.patchca.background.SingleColorBackgroundFactory;
import com.scarlett.common.verificationcode.patchca.color.ColorFactory;
import com.scarlett.common.verificationcode.patchca.filter.predefined.CurvesRippleFilterFactory;
import com.scarlett.common.verificationcode.patchca.filter.predefined.DiffuseRippleFilterFactory;
import com.scarlett.common.verificationcode.patchca.filter.predefined.DoubleRippleFilterFactory;
import com.scarlett.common.verificationcode.patchca.filter.predefined.MarbleRippleFilterFactory;
import com.scarlett.common.verificationcode.patchca.filter.predefined.WobbleRippleFilterFactory;
import com.scarlett.common.verificationcode.patchca.service.Captcha;
import com.scarlett.common.verificationcode.patchca.service.ConfigurableCaptchaService;
import com.scarlett.common.verificationcode.patchca.utils.encoder.EncoderHelper;
import com.scarlett.common.verificationcode.patchca.word.RandomWordFactory;

public class VerificationCode {

	private static ConfigurableCaptchaService cs = new ConfigurableCaptchaService();
	private static Random random = new Random();
	
	static {
		cs.setColorFactory(new ColorFactory() {
			@Override
			public Color getColor(int x) {
				int[] c = new int[3];
				int i = random.nextInt(c.length);
				for (int fi = 0; fi < c.length; fi++) {
					if (fi == i) {
						c[fi] = random.nextInt(71);
					} else {
						c[fi] = random.nextInt(256);
					}
				}
				return new Color(c[0], c[1], c[2]);
			}
		});
		
		cs.setBackgroundFactory(new SingleColorBackgroundFactory(new Color(240, 240, 240)));
		
		RandomWordFactory wf = new RandomWordFactory();
		wf.setCharacters("23456789abcdefghigkmnpqrstuvwxyzABCDEFGHIGKLMNPQRSTUVWXYZ");
		wf.setMaxLength(4);
		wf.setMinLength(4);
		cs.setWordFactory(wf);
	}
	
	public static VerificationEntity build(){
		VerificationEntity verificationEntity = new VerificationEntity();
		switch (random.nextInt(5)) {
			case 0:
				cs.setFilterFactory(new CurvesRippleFilterFactory(cs.getColorFactory()));
				break;
			case 1:
				cs.setFilterFactory(new MarbleRippleFilterFactory());
				break;
			case 2:
				cs.setFilterFactory(new DoubleRippleFilterFactory());
				break;
			case 3:
				cs.setFilterFactory(new WobbleRippleFilterFactory());
				break;
			case 4:
				cs.setFilterFactory(new DiffuseRippleFilterFactory());
				break;
		}
		
		Captcha captcha = cs.getCaptcha();
		verificationEntity.setBufferedImage(captcha.getImage());
		verificationEntity.setText(captcha.getChallenge());
		
		return verificationEntity;
	}
	
	public static String buildAndWrite(OutputStream os) throws IOException{
		switch (random.nextInt(5)) {
			case 0:
				cs.setFilterFactory(new CurvesRippleFilterFactory(cs.getColorFactory()));
				break;
			case 1:
				cs.setFilterFactory(new MarbleRippleFilterFactory());
				break;
			case 2:
				cs.setFilterFactory(new DoubleRippleFilterFactory());
				break;
			case 3:
				cs.setFilterFactory(new WobbleRippleFilterFactory());
				break;
			case 4:
				cs.setFilterFactory(new DiffuseRippleFilterFactory());
				break;
		}
		
		return EncoderHelper.getChallangeAndWriteImage(cs, "png", os);
	}
	
	
}
