pipeline {
    agent any

    environment {
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PASSWORD = ''
        DB_NAME = 'businessflow'
        DB_PORT = '3306'

        JWT_SECRET = credentials('businessflow-jwt-secret')
    }

    stages {

        stage('Install dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Build and Push Docker image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-businessflow',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat '''
                        @echo off

                        echo %DOCKER_PASSWORD% | docker login -u "%DOCKER_USERNAME%" --password-stdin

                        if errorlevel 1 (
                            echo Docker Hub login failed
                            exit /b 1
                        )

                        echo Docker Hub login successful

                        docker buildx build --push ^
                            -t lenny1980/businessflow-backend:%BUILD_NUMBER% ^
                            -t lenny1980/businessflow-backend:latest ^
                            ./backend

                        if errorlevel 1 (
                            echo Docker image build/push failed
                            exit /b 1
                        )

                        docker logout
                    '''
                }
            }
        }
    }
}