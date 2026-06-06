# AWS EKS Release Engineering Platform

Production-grade Kubernetes platform built on Amazon EKS implementing Blue-Green deployment strategies, traffic-aware releases, observability, and GitOps-driven delivery.

This project demonstrates how modern platform teams can reduce deployment risk, eliminate downtime, and improve operational confidence through controlled traffic management, automated deployment workflows, and real-time observability.

The platform separates deployment from traffic routing, allowing new application versions to be validated independently before receiving production traffic. Combined with GitOps and monitoring, this enables safer releases, rapid rollback capability, and improved deployment reliability.

## Key Capabilities

* Blue-Green deployment strategy
* Zero-downtime application releases
* Traffic management using Gateway API
* GitOps-based deployment automation with Argo CD
* Observability using Prometheus, Grafana, and Alertmanager
* Deployment validation through runtime monitoring
* Controlled rollback and recovery workflows
* Independent scaling of Blue and Green environments
* Production-oriented release engineering practices

## Technology Stack

Amazon EKS • Kubernetes • Argo CD • Gateway API • Prometheus • Grafana • Alertmanager • HPA • GitOps • Release Engineering • Platform Engineering
