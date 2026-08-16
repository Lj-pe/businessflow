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

        stage('Deploy') {
            steps {
                dir('backend') {
                    bat '''
                        @echo off

                        echo Starting BusinessFlow API...

                        start "BusinessFlow API" /B cmd /c "node server.js"

                        timeout /t 5 /nobreak >nul

                        curl.exe http://localhost:3000/api/health

                        if errorlevel 1 (
                            echo Deploy verification failed
                            exit /b 1
                        )

                        echo Deploy successful
                    '''
                }
            }
        }
    }
}