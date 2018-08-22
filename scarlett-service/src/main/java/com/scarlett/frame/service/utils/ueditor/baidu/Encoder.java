package com.scarlett.frame.service.utils.ueditor.baidu;

public class Encoder
{
  public static String toUnicode(String input)
  {
    StringBuilder builder = new StringBuilder();
    char[] chars = input.toCharArray();

    for (char ch : chars)
    {
      if (ch < 'Ā')
        builder.append(ch);
      else {
        builder.append("\\u" + Integer.toHexString(ch & 0xFFFF));
      }

    }

    return builder.toString();
  }
}