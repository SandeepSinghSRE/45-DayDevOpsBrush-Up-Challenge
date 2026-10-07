pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
  }

  environment {
    IMAGE_NAME = "node-terraform-demo:${BUILD_NUMBER}"
    TF_IN_AUTOMATION = 'true'
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Check and test') {
      steps {
        sh 'npm run check'
        sh 'npm test'
      }
    }

    stage('Build image') {
      steps {
        sh 'docker build --tag "$IMAGE_NAME" .'
      }
    }

    stage('Terraform validate') {
      steps {
        sh 'terraform -chdir=terraform fmt -check -recursive'
        sh 'terraform -chdir=terraform init -input=false'
        sh 'terraform -chdir=terraform validate'
      }
    }

    stage('Terraform plan') {
      steps {
        sh 'terraform -chdir=terraform plan -input=false -out=tfplan -var="image_name=$IMAGE_NAME"'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      input {
        message 'Deploy this build with Terraform?'
        ok 'Deploy'
      }
      steps {
        sh 'terraform -chdir=terraform apply -input=false -auto-approve tfplan'
      }
    }

    stage('Smoke test') {
      when {
        branch 'main'
      }
      steps {
        sh 'curl --fail --retry 10 --retry-delay 2 http://localhost:3000/health'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'terraform/tfplan', allowEmptyArchive: true
    }
  }
}
