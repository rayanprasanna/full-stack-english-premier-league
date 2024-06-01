# Use the official Maven image as the base image
FROM maven:3.9.7-sapmachine-22 AS build
# Set the working directory in the container
WORKDIR /app
# Copy the pom.xml and the project files to the container
COPY pom.xml .
COPY src ./src
# Build the application using Maven
RUN mvn clean package -DskipTests
# Use an official OpenJDK image as the base image
FROM openjdk:22-jdk
# Set the working directory in the container
WORKDIR /app
# Copy the built JAR file from the previous stage to the container
COPY ./target/english-premier-league-backend-0.0.1-SNAPSHOT.jar /app
# Set the command to run the application
CMD ["java", "-jar", "english-premier-league-backend-0.0.1-SNAPSHOT.jar"]
