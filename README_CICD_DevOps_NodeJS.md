# 🚀 DevOps CI/CD Pipeline for a Node.js Application

A simple, practical, and production-oriented guide to understand how a **CI/CD pipeline** works for a Node.js application.

---

## 📌 What is CI/CD?

**CI/CD** helps us automate the software delivery process.

- **CI — Continuous Integration**  
  Automatically build, test, scan, and validate code whenever developers push changes.

- **CD — Continuous Delivery / Deployment**  
  Automatically move the tested application through environments like:

```text
DEV → QA → UAT → PROD
```

---

# 🔄 Complete CI/CD Flow

```text
Developer
   ↓
Jira Ticket
   ↓
Write Code
   ↓
Git Commit
   ↓
GitHub / GitLab / Bitbucket
   ↓
CI Pipeline Triggered
   ↓
Install Dependencies
   ↓
Lint / Code Quality
   ↓
Unit Tests
   ↓
Code Coverage
   ↓
Security Scan
   ↓
Build Application
   ↓
Build Docker Image
   ↓
Container Security Scan
   ↓
Push Artifact / Image
   ↓
DEV
   ↓
QA
   ↓
UAT
   ↓
PROD
   ↓
Monitoring & Alerts
   ↓
Feedback / Improvement
```

---

# 🧩 CI Pipeline for Node.js

## 1️⃣ Developer Writes Code

The developer works on a Jira story or task.

Example:

```text
JIRA-123: Add user login API
```

The developer writes or modifies the Node.js application code.

---

## 2️⃣ Push Code to Git

The developer commits and pushes the code.

```bash
git add .
git commit -m "JIRA-123 Add user login API"
git push origin feature/login-api
```

### Tools

- Git
- GitHub
- GitLab
- Bitbucket

---

## 3️⃣ CI Pipeline Starts

Once code is pushed or a Pull Request is created, the CI pipeline starts automatically.

### CI Tools

- Jenkins
- GitHub Actions
- GitLab CI
- Azure DevOps

Example flow:

```text
Code Push
   ↓
Webhook
   ↓
Jenkins Pipeline Starts
```

---

## 4️⃣ Install Dependencies

For Node.js applications, dependencies are usually installed using:

```bash
npm ci
```

Why `npm ci`?

- Faster in CI
- Uses `package-lock.json`
- Gives consistent dependency versions
- Better for automated pipelines

### Other options

```text
npm
yarn
pnpm
```

---

## 5️⃣ Lint / Code Quality Check

Check the source code for formatting and coding issues.

### Tools

- ESLint
- Prettier

Example:

```bash
npm run lint
```

If linting fails:

```text
❌ Pipeline Stops
```

If linting passes:

```text
✅ Continue
```

---

## 6️⃣ Run Unit Tests

Unit tests verify individual functions or modules.

### Tools

- Jest
- Mocha
- Jasmine

Example:

```bash
npm test
```

Example result:

```text
✅ Login API Test Passed
✅ User Validation Test Passed
✅ Database Service Test Passed
```

---

## 7️⃣ Code Coverage

Code coverage tells us how much application code is covered by tests.

### Tools

- Jest Coverage
- Istanbul
- nyc

Example:

```bash
npm test -- --coverage
```

Example:

```text
Statements : 90%
Branches   : 85%
Functions  : 88%
Lines      : 91%
```

---

## 8️⃣ Code Quality & Security Scan

The code is checked for:

- Bugs
- Code smells
- Vulnerabilities
- Duplicate code
- Security issues

### Tools

- SonarQube
- Snyk
- npm audit
- OWASP Dependency-Check

Examples:

```bash
npm audit
```

or

```bash
snyk test
```

---

## 9️⃣ Build the Application

If the project requires a build step:

```bash
npm run build
```

Possible tools:

- TypeScript Compiler
- Webpack
- Vite

The goal is to create a build that is ready for packaging.

---

# 🐳 Docker Stage

## 🔟 Build Docker Image

Create a Docker image from the application.

```bash
docker build -t node-app:1.0.0 .
```

Check:

```bash
docker images
```

---

## 1️⃣1️⃣ Scan Docker Image

Before pushing the image, scan it for vulnerabilities.

### Tools

- Trivy
- Snyk Container

Example:

```bash
trivy image node-app:1.0.0
```

If critical vulnerabilities are found:

```text
❌ Stop Pipeline
```

Otherwise:

```text
✅ Continue
```

---

## 1️⃣2️⃣ Push Image to Registry

Store the tested Docker image in a registry.

### Registries

- AWS ECR
- Docker Hub
- JFrog Artifactory
- Nexus Repository

Example:

```bash
docker push <registry>/node-app:1.0.0
```

Now we have a:

```text
Tested + Scanned + Versioned Artifact
```

---

# 🚚 CD Pipeline

The CD pipeline takes the same tested artifact and deploys it to environments.

```text
Artifact
   ↓
DEV
   ↓
QA
   ↓
UAT
   ↓
PROD
```

---

## 1️⃣3️⃣ Deploy to DEV

Deploy the application to the Development environment.

Examples:

```text
Docker
Kubernetes
AWS ECS
AWS EKS
EC2
```

---

## 1️⃣4️⃣ Deploy to QA

After DEV validation:

```text
DEV ✅
 ↓
QA
```

QA teams perform:

- Functional testing
- API testing
- Regression testing
- Integration testing

### Tools

- Postman
- Newman
- Selenium
- Cypress

---

## 1️⃣5️⃣ Deploy to UAT

After QA approval:

```text
QA ✅
 ↓
UAT
```

UAT is normally used by:

- Business teams
- Product owners
- Client representatives

They confirm that the application meets business requirements.

---

## 1️⃣6️⃣ Approval Gate

Before Production, we may add a manual approval step.

```text
UAT
 ↓
Approval Required
 ↓
PROD
```

This provides control before a production release.

---

## 1️⃣7️⃣ Deploy to Production

After approval:

```text
DEV → QA → UAT → PROD
```

The same Docker image/artifact should ideally move through all environments.

Example:

```text
node-app:1.0.0
```

This avoids:

```text
"It worked in QA but failed in Production."
```

---

# ☸️ Infrastructure & Deployment Tools

### Infrastructure as Code

```text
Terraform
```

Used for:

- VPC
- EC2
- EKS
- Load Balancers
- Security Groups
- RDS
- IAM

### Configuration Management

```text
Ansible
```

Used for:

- Installing packages
- Configuring servers
- Application configuration
- Service management

### Container Orchestration

```text
Kubernetes
```

Used for:

- Deployment
- Scaling
- Self-healing
- Rolling updates
- Service discovery

---

# 📊 Monitoring & Alerts

After production deployment, monitoring begins.

We monitor:

- CPU
- Memory
- Application errors
- API response time
- Availability
- Logs
- Metrics
- Traces

### Tools

```text
Prometheus
Grafana
ELK / OpenSearch
Datadog
New Relic
CloudWatch
```

Example:

```text
High CPU
   ↓
Monitoring Tool Detects
   ↓
Alert Generated
   ↓
DevOps / SRE Team Investigates
```

---

# 🔁 Feedback Loop

DevOps is a continuous cycle.

```text
Plan
 ↓
Code
 ↓
Build
 ↓
Test
 ↓
Release
 ↓
Deploy
 ↓
Monitor
 ↓
Feedback
 ↓
Improve
 ↓
Plan Again
```

---

# 🛠️ Recommended Node.js CI Tool Stack

| Stage | Tool |
|---|---|
| Planning | Jira |
| Communication | Slack / Teams |
| Source Control | Git + GitHub |
| CI/CD | Jenkins / GitHub Actions |
| Dependencies | npm |
| Linting | ESLint |
| Formatting | Prettier |
| Unit Testing | Jest |
| Code Coverage | Jest / Istanbul |
| Code Quality | SonarQube |
| Dependency Security | npm audit / Snyk |
| Packaging | Docker |
| Image Security | Trivy |
| Artifact Registry | AWS ECR |
| Infrastructure | Terraform |
| Configuration | Ansible |
| Deployment | Kubernetes / EKS |
| API Testing | Postman / Newman |
| UI Testing | Selenium / Cypress |
| Monitoring | Prometheus + Grafana |
| Logging | ELK / OpenSearch |
| Alerts/APM | Datadog / New Relic |

---

# ⚡ Simple Production CI Flow

```text
GitHub
  ↓
Jenkins
  ↓
npm ci
  ↓
ESLint
  ↓
Jest
  ↓
SonarQube
  ↓
npm audit / Snyk
  ↓
npm run build
  ↓
Docker Build
  ↓
Trivy Scan
  ↓
Push to AWS ECR
```

---

# 🚀 Simple Production CD Flow

```text
AWS ECR
   ↓
DEV Deployment
   ↓
Automated Tests
   ↓
QA Deployment
   ↓
Regression Testing
   ↓
UAT Deployment
   ↓
Approval
   ↓
Production Deployment
   ↓
Monitoring
```

---

# ✅ What Happens If a Stage Fails?

```text
Developer Pushes Code
        ↓
      Build
        ↓
      Tests ❌
        ↓
PIPELINE STOPS
        ↓
Developer Gets Feedback
        ↓
Fix Code
        ↓
Push Again
```

This is one of the biggest benefits of CI:

> **Find problems early instead of finding them in Production.**

---

# 🎯 Main Benefits of CI/CD

```text
Less Manual Work
        +
Faster Releases
        +
Early Bug Detection
        +
Security Checks
        +
Repeatable Deployments
        +
Faster Recovery
        +
More Reliable Software
```

---

# 🧠 Easy Way to Remember

### CI

```text
CODE
 ↓
BUILD
 ↓
TEST
 ↓
SCAN
 ↓
PACKAGE
```

### CD

```text
PACKAGE
 ↓
DEV
 ↓
QA
 ↓
UAT
 ↓
PROD
```

### Operations

```text
PROD
 ↓
MONITOR
 ↓
ALERT
 ↓
IMPROVE
```

---

## 🔥 Complete DevOps Flow

```text
PLAN → CODE → BUILD → TEST → SCAN → PACKAGE → RELEASE → DEPLOY → MONITOR → IMPROVE
```

---

## 💡 Final Thought

> **CI/CD is not only about Jenkins or pipelines. It is about creating a repeatable, automated, secure, and reliable process to take code from a developer's laptop to Production.**

---

### ⭐ Learn → Practice → Implement → Troubleshoot → Share

#DevOps #CICD #NodeJS #Jenkins #GitHub #Docker #Kubernetes #AWS #Terraform #Ansible #SonarQube #Trivy #Monitoring #DevSecOps
