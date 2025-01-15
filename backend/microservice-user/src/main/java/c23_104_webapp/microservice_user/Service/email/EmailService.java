package c23_104_webapp.microservice_user.Service.email;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
