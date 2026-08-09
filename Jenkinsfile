pipeline {

    agent any

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