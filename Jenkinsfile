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

        stage('Test Docker Hub login') {
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

                        echo Probando Docker Hub con usuario: %DOCKER_USERNAME%

                        echo %DOCKER_PASSWORD% | docker login -u "%DOCKER_USERNAME%" --password-stdin

                        if errorlevel 1 (
                            echo Docker Hub login failed
                            exit /b 1
                        )

                        echo Docker Hub login OK

                        docker logout
                    '''
                }
            }
        }
    }
}