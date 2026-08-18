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

        stage('Install backend dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run backend tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Install frontend dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy backend') {
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