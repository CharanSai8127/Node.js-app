# 🚀 Resilient Deployment Platform on Kubernetes  
## Blue-Green Strategy with Traffic Control and Observability  

---

## 🧩 Overview  

This project demonstrates a **resilient and observable Kubernetes platform** that enables **zero-downtime deployments** using a **Blue-Green deployment strategy** combined with **traffic control and monitoring**.

It evolves the platform from controlled delivery into a system capable of **safe releases, runtime visibility, and operational decision-making**.

---

## 🎯 Objectives  

- Enable **zero-downtime deployments**  
- Introduce **traffic-aware release strategies**  
- Improve **runtime observability and alerting**  
- Ensure **safe rollback capability**  
- Strengthen **deployment reliability in production scenarios**  

---

## 🏗️ Architecture  

The system is structured to separate **deployment, traffic control, and observability**:

---

### 🔹 Application Layer  

Defines application workloads:

- Node.js / Backend application  
- Database (MySQL / PostgreSQL)  
- Prestart / Migration jobs  

👉 Represents **business logic execution**

---

### 🔹 Deployment Layer (Blue-Green Strategy)

- Blue environment (current live version)  
- Green environment (new version)  
- Parallel deployments  

👉 Enables **safe version switching without downtime**

---

### 🔹 Traffic Layer (Gateway API)

- HTTPRoute manages traffic  
- Traffic shifts between Blue and Green  

👉 Separates **deployment from traffic routing**

---

### 🔹 Observability Layer  

- Prometheus → metrics collection  
- Grafana → visualization  
- Alertmanager → alerts  

👉 Provides **runtime visibility and feedback**

---

### 🔹 GitOps Layer  

- Argo CD → continuous reconciliation  
- Git → source of truth  

👉 Ensures **declarative and automated deployment control**

---

## 🧭 Architecture Diagrams  

### 🔹 CI Pipeline  

![CI Architecture](./docs/ci-architecture.png)

**Flow:**
- Code pushed to repository  
- CI pipeline builds and scans application  
- Docker image created and pushed  

👉 Ensures **validated and secure artifacts**

---

### 🔹 CD / Blue-Green Deployment  

![CD Architecture](./docs/cd-architecture.png)

**Flow:**
- Argo CD syncs manifests from Git  
- Blue and Green versions are deployed  
- Gateway API routes traffic  
- Traffic is switched between versions  
- Monitoring tracks system health  

👉 Ensures **safe and controlled releases**

---

> This architecture separates **deployment from traffic routing**, enabling zero-downtime releases and safer rollbacks.

---

## 📁 Repository Structure  

---

### 🔹 Argo CD  

`argocd/`

- Application definitions  
- Environment-specific deployments  

👉 Controls **deployment lifecycle**

---

### 🔹 Kubernetes Manifests  

`k8s/`

- Blue deployment  
- Green deployment  
- Services and routing  

---

### 🔹 Observability  

`monitoring/`

- Prometheus  
- Grafana  
- Alertmanager  

👉 Enables **system visibility**

---

## 🔁 System Flow  

### Flow Explanation:

1. Developer pushes code  
2. CI pipeline builds and scans image  
3. Image pushed to registry  
4. Manifests updated in Git  
5. Argo CD syncs cluster state  
6. Blue and Green environments deployed  
7. Gateway routes traffic  
8. Monitoring collects metrics  
9. Traffic is switched after validation  

---

## 🎛️ Control Model  

| Layer | Responsibility |
|------|---------------|
| **Git** | Source of truth |
| **CI Pipeline** | Artifact validation |
| **Argo CD** | Deployment control |
| **Gateway API** | Traffic routing |
| **Kubernetes** | Runtime enforcement |
| **Observability** | System feedback |

---

## ⚙️ Runtime Behavior  

---

### 🔹 Deployment Behavior  

- New version deployed in parallel (Green)  
- Existing version (Blue) continues serving traffic  
- Traffic switched only after validation  

👉 Ensures **zero downtime**

---

### 🔹 Failure Handling  

- If Green fails → traffic remains on Blue  
- Manual or automated rollback possible  

👉 Ensures **safe recovery**

---

### 🔹 Traffic Behavior  

- Gateway API controls traffic routing  
- Full switch from Blue → Green after validation  

👉 Ensures **controlled rollout**

---

### 🔹 Observability Behavior  

- Metrics collected continuously  
- Alerts triggered on failures  
- Dashboards provide visibility  

👉 Enables **real-time monitoring**

---

### 🔹 Scaling Behavior  

- HPA scales based on load  
- Works independently for Blue and Green  

👉 Ensures **availability under load**

---

## 📊 Observability  

- Prometheus → metrics  
- Grafana → dashboards  
- Alertmanager → alerts  

Enables:
- Performance tracking  
- Failure detection  
- Deployment validation  

---

## ⚖️ Design Trade-offs & Future Enhancements  

- Blue-Green doubles resource usage → can increase cost  
- Traffic switching is binary → canary deployments can improve granularity  
- Rollback is manual → automated rollback can improve safety  
- Observability is reactive → predictive alerts can enhance reliability  

---

## 💬 Summary  

This project introduces a **safe deployment strategy with zero downtime**, combining **traffic control, observability, and GitOps**.

It demonstrates how **deployment, traffic routing, and monitoring** can work together to ensure reliable production releases.

> The system is designed using a **Solution → Control → Behavior model**, enabling safe, observable, and resilient deployments.
