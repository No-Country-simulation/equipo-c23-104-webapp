package c23_104_webapp.microservice_comment.Security;

import org.springframework.stereotype.Component;

@Component
public class UserContext {

    private static final ThreadLocal<Long> userIdThreadLocal = new ThreadLocal<>();

    public void setUserId(Long userId) {
        userIdThreadLocal.set(userId);
    }

    public Long getUserId() {
        return userIdThreadLocal.get();
    }

    public void clear() {
        userIdThreadLocal.remove();
    }
}
