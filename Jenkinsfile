pipeline {
    agent any
    tools { nodejs 'Node' }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Check if the backend process is already running
                    def isBackendRunning = sh(script: "pm2 list | grep 'backend' | grep -q 'online'", returnStatus: true)
                    if (isBackendRunning == 0) {
                        // Restart the backend process
                        sh "pm2 restart backend"
                    } else {
                        // Start the backend process if it's not running
                        sh "pm2 start --name backend npm -- start"
                    }
                }
            }
        }
    }
}
