package c23_104_webapp.microservice_user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroserviceUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceUserApplication.class, args);
	}

}
