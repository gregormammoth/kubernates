# Apply the ConfigMap to set environment variables
kubectl apply -f configmap.yaml

# Apply the Secret to provide sensitive data
kubectl apply -f secret.yaml

# Build the Docker image for the application
docker build -t hello-k8s .

# Deploy the application to Kubernetes
kubectl apply -f deployment.yaml

# Expose and access the service via Minikube
minikube service hello-k8s-service --url