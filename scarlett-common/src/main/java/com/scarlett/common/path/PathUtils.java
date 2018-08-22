package com.scarlett.common.path;

import com.scarlett.common.config.ConfigUtil;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.AndFileFilter;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.NameFileFilter;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.net.URL;
import java.util.UUID;


public class PathUtils {

    private static final Logger logger = LoggerFactory.getLogger( PathUtils.class );

    private static final String UPLOAD_FILE_PATH = "file.dir";

    private static String webRootPath = StringUtils.EMPTY;
    
    private static String configPath = StringUtils.EMPTY;
    
    public static final String ROOT_TAG = "$root$";

    private static File getPath(File[] files) {
        File[] arrayOfFile = files;
        int j = files.length;
        for (int i = 0; i < j; i++) {
            File file = arrayOfFile[i];
            if ((file.isDirectory())
                && (file.getName().equalsIgnoreCase("web-inf"))
                && (!file.getParentFile().getName().equals("jsp-demo"))) {
                return file;
            }
        }

        arrayOfFile = files;
        j = files.length;
        for (int i = 0; i < j; i++) {
            File file = arrayOfFile[i];
            if (file.isDirectory()) {
                File temfile = getPath(file.listFiles());
                if (temfile != null) {
                    return temfile;
                }
            }
        }
        return null;
    }

    /**
     * 合并路径 
     * @param paths 路径
     * @return 合并后的路径
     * */
    public static String combine(String... paths) {
        if (paths.length == 0) {
            return "";
        }

        File combined = new File(paths[0]);

        int i = 1;
        while (i < paths.length) {
            combined = new File(combined, paths[i]);
            ++i;
        }

        return combined.getPath();
    }

    public static String combineUrl(String... paths) {
        if (paths.length == 0) {
            return "";
        }

        StringBuilder builder = new StringBuilder( paths[ 0 ] );
        int i = 1;
        while (i < paths.length) {
            if ( builder.lastIndexOf( "/" ) != builder.length( ) - 1 ) {
                builder.append( "/" );
            }
            builder.append( paths[ i ]);
            ++i;
        }

        return builder.toString( );
    }
    
    /**
     * 获取测试资源文件路径
     * */
    public static String getProjectPath(){
        String result = StringUtils.EMPTY;
        URL url = PathUtils.class.getResource("/");
        File baseDir = new File(url.getFile());
        do{
            if (baseDir != null && !baseDir.exists() || !baseDir.isDirectory()){
                break ;
            }
            IOFileFilter fileFilter1 =  new NameFileFilter(ROOT_TAG);
            FilenameFilter filenameFilter = new AndFileFilter(fileFilter1, DirectoryFileFilter.DIRECTORY);
            
            if(baseDir.list(filenameFilter).length > 0){
                result = baseDir.getPath();
                break;
            }else {
                baseDir = baseDir.getParentFile();
            }
            
        }while(StringUtils.isEmpty(result));
       
        return result;
    }
    
    /**
     * 获取测试资源根路径
     * */
    public static String getTestSourcePath(){
        String rootPath = PathUtils.getProjectPath();
        
        return FilenameUtils.concat(rootPath, PathUtils.ROOT_TAG);
    }
    
    public static String getConfigPath(){
        String webRoot = getWebRoot();
        if(!StringUtils.isEmpty(webRoot))
            configPath = FilenameUtils.concat(webRoot, "WEB-INF/config");

        return configPath;
    }
    
    public static String getWebRoot(){
        if(StringUtils.isEmpty(webRootPath)){
            String webRoot = PathUtils.getWebRootPath();
            if(!StringUtils.isEmpty(webRoot))
                webRootPath = webRoot;
        }
        if(StringUtils.isEmpty(webRootPath)){
            String patn = PathUtils.getTestSourcePath();
            webRootPath = patn;
        }
        
        return webRootPath;
    }
    
    private static String getWebRootPath() {
        String webRoot = new String();

        File webinfFile = null;
        URL classesUrl = PathUtils.class.getClassLoader().getResource("/");
        if (classesUrl == null) {
            classesUrl = PathUtils.class.getClassLoader().getResource("");
        }
        File classesFile = new File(classesUrl.getFile());
        if (("classes".equals(classesFile.getName()))
            && (classesFile.getParentFile() != null)
            && ("WEB-INF".equalsIgnoreCase(classesFile.getParentFile()
                .getName()))) {
            webinfFile = classesFile.getParentFile();
        } else if ((classesFile.getParentFile() != null)
            && ("lib".equals(classesFile.getParentFile().getName()))
            && (classesFile.getParentFile().getParentFile() != null)
            && ("WEB-INF".equalsIgnoreCase(classesFile.getParentFile()
                .getParentFile().getName()))) {
            webinfFile = classesFile.getParentFile().getParentFile();
        } else {
            File rootFile = new File(new File("").getAbsolutePath());
            webinfFile = getPath(rootFile.listFiles());
        }
        if (webinfFile != null) {
            webRoot = webinfFile.getParentFile().getPath();
            if (webRoot.startsWith("file:\\")) {
                webRoot = webRoot.substring(6);
            }
            if (webRoot.startsWith("file:\\\\")) {
                webRoot = webRoot.substring(7);
            }
            if (webRoot.startsWith("file:/")) {
                webRoot = webRoot.substring(5);
            }
            if (webRoot.startsWith("file://")) {
                webRoot = webRoot.substring(6);
            }
        }

        return webRoot;
    }

    /**
     * 获取文件扩展名
     * */
    public static String getExtName( String s ) {
        return s.substring( s.lastIndexOf(".") + 1 );
    }

    /**
     * 根据根目录创建新文件
     * */
    public static File uploadPathDir( ) {
        String rootPath = ConfigUtil.get( UPLOAD_FILE_PATH );
        if ( StringUtils.isEmpty( rootPath )) {
            throw new RuntimeException( "未找到配置:" + UPLOAD_FILE_PATH );
        }
        String allPathDir = combine( rootPath );
        File file = new File( allPathDir );
        if ( file.exists( ) == false ) {
            boolean b = file.mkdirs( );
            if ( b == false ) {
                logger.error( "create new file error,file name:{}", allPathDir );
            }
        }

        return file;
    }

    /**
     * 创建上传文件 自动生成文件名
     * */
    public static File uploadPathFile( String fileType ) {
        if ( StringUtils.isEmpty( fileType )) {
            throw new RuntimeException( "file type can not be empty" );
        }

        // 生成文件名
        String fileName   = UUID.randomUUID( ).toString( ).replaceAll( "\\-", "" ) + "." + fileType;
        // 创建目录
        File dir = uploadPathDir( );
        String filePath = combine( dir.getPath( ), fileName );
        File file = new File( fileName );
        if ( file.exists( ) == true ) {
            logger.error( "file has exit, file path:{}", filePath );
            throw new RuntimeException( "file hash exits." );
        }

        // 创建文件
        try {
            Boolean b = file.createNewFile( );
            if ( b == false ) {
                throw new RuntimeException( "create file error,filePath:" + filePath );
            }
        } catch ( IOException e ) {
            logger.error( "create file error,filePath:{}", filePath );
            throw new RuntimeException( "create file error,filePath:" + filePath );
        }

        return file;
    }


    public static String getRemoteHost(HttpServletRequest request){
        String ip = request.getHeader("x-forwarded-for");
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
    }

}
