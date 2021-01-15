pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
           steps {
                sh 'chmod +x -R ./jenkins/scripts/test.sh'
                sh './jenkins/scripts/test.sh'
           }
        }
        stage('Deliver') {
           steps {
                sh "chmod +x -R ./jenkins/scripts/deliver.sh"
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click Proceed to continue)'
                sh './jenkins/scripts/kill.sh'
           }
        }
    }
}

