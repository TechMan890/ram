��#   r a m 
 # Install kind (requires Go or download binary)
GO111MODULE="on" go install sigs.k8s.io/kind@v0.29.0  
# Create a cluster named 'argo-practice'
kind create cluster --name argo-practice  


curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash  
k3d cluster create argo-practice
 
