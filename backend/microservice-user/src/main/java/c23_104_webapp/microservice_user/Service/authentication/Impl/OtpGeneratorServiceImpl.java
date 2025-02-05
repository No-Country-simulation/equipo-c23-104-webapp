package c23_104_webapp.microservice_user.Service.authentication.Impl;

import c23_104_webapp.microservice_user.Service.authentication.OtpGeneratorService;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpGeneratorServiceImpl implements OtpGeneratorService {

    private final Random random;

    public OtpGeneratorServiceImpl() {
        random = new Random();
    }

    @Override
    public String generateOtp(){
        return String.format("%06d", random.nextInt(1000000));
    }
}
