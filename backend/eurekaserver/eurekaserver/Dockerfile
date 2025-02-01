FROM openjdk:17-jdk-slim

LABEL authors="walter"

COPY target/*.jar  app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]