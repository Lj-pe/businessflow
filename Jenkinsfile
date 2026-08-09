pipeline {

    agent any

    environment {
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PASSWORD = ''
        DB_NAME = 'businessflow'
        DB_PORT = '3306'
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
    }
}