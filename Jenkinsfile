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
                        set "DOCKER_CONFIG=%WORKSPACE%\\.docker"
                        if not exist "%DOCKER_CONFIG%" mkdir "%DOCKER_CONFIG%"

                        echo %DOCKER_PASSWORD% | docker login -u "%DOCKER_USERNAME%" --password-stdin

                        docker buildx build --push -t lenny1980/businessflow-backend:%BUILD_NUMBER% ./backend

                        docker logout
                    '''
                }
            }
        }
    }
}