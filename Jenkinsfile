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

        stage('Build Docker image') {
            steps {
                bat 'docker build -t lenny1980/businessflow-backend:%BUILD_NUMBER% ./backend'
            }
        }

        stage('Push Docker image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-businessflow',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat 'docker login -u "%DOCKER_USERNAME%" -p "%DOCKER_PASSWORD%"'
                    bat 'docker push lenny1980/businessflow-backend:%BUILD_NUMBER%'
                    bat 'docker logout'
                }
            }
        }
    }
}