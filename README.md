# Node.js + Jenkins + Terraform demo

This project is a small HTTP API packaged as a Docker image and deployed as a local Docker container by Terraform. Jenkins runs the tests, builds the image, validates the infrastructure, creates a plan, and deploys `main` after manual approval.

## Endpoints

- `GET /` — welcome response
- `GET /health` — health check

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm ci
npm test
npm start
curl http://localhost:3000/health
```

## Deploy locally with Terraform

Requirements: Docker and Terraform 1.5 or newer.

```bash
docker build -t node-terraform-demo:local .
terraform -chdir=terraform init
terraform -chdir=terraform plan -out=tfplan -var='image_name=node-terraform-demo:local'
terraform -chdir=terraform apply tfplan
curl http://localhost:3000/
```

Remove the deployment with:

```bash
terraform -chdir=terraform destroy -var='image_name=node-terraform-demo:local'
```

## Jenkins setup

Create a Pipeline or Multibranch Pipeline pointed at this repository. The Jenkins agent needs:

- Node.js 20+
- Docker CLI and permission to access the Docker daemon
- Terraform 1.5+
- `curl`

Feature branches stop after producing a Terraform plan. The `main` branch asks for approval, applies the saved plan, and runs a smoke test. For a team environment, configure a remote Terraform backend instead of storing state in the Jenkins workspace.
