package com.scarlett.frame.service.backstage;

import com.scarlett.bean.bo.VisitHistoryBo;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.Future;

/**
 * Created by admin on 2017/10/16.
 */
public interface VisitHistoryAsyncService {

    Future<Boolean> insertVisit(HttpServletRequest request );

    Future<Boolean> insertVisit( VisitHistoryBo visitHistoryBo );

}
