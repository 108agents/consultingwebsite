#!/usr/bin/env pwsh
# Azure deployment script for Frontend-Only JagadeeshIndia Website
# This script deploys a static website for jagadeeshindia

# Function to get and display container logs
function Get-AppServiceLogs {
    param (
        [string]$resourceGroup,
        [string]$webAppName
    )
    
    Write-Host "`n=== Retrieving App Service Container Logs ===" -ForegroundColor Cyan
    
    # Get the latest container logs
    Write-Host "Fetching container logs..."
    az webapp log download --resource-group $resourceGroup --name $webAppName --log-file webapplogs.zip
    
    if (Test-Path ./webapplogs.zip) {
        # Extract the logs
        Expand-Archive -Path ./webapplogs.zip -DestinationPath ./webapplogs -Force
        
        # Display Docker logs if they exist
        $dockerLogsPath = "./webapplogs/LogFiles/docker"
        if (Test-Path $dockerLogsPath) {
            $latestLogFile = Get-ChildItem -Path $dockerLogsPath -Filter "*.log" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
            
            if ($latestLogFile) {
                Write-Host "`nLatest Docker container logs from $($latestLogFile.Name):" -ForegroundColor Yellow
                Get-Content $latestLogFile.FullName | Select-Object -Last 100
            }
        }
        
        # Display detailed application logs if they exist
        $detailedLogsPath = "./webapplogs/LogFiles/DetailedErrors"
        if (Test-Path $detailedLogsPath) {
            $errorFiles = Get-ChildItem -Path $detailedLogsPath -Filter "*.htm"
            
            if ($errorFiles.Count -gt 0) {
                Write-Host "`nFound $($errorFiles.Count) detailed error logs:" -ForegroundColor Yellow
                foreach ($errorFile in $errorFiles) {
                    Write-Host " - $($errorFile.Name)"
                }
                Write-Host "Detailed errors available in ./webapplogs/LogFiles/DetailedErrors/"
            }
        }
    } else {
        Write-Host "Could not download logs. Trying to retrieve logs via streaming API..." -ForegroundColor Yellow
        
        # Try to get real-time logs as a fallback
        Write-Host "`nStreaming recent logs (press Ctrl+C to stop):" -ForegroundColor Yellow
        az webapp log tail --resource-group $resourceGroup --name $webAppName --provider docker
    }
    
    Write-Host "`n=== End of App Service Logs ===" -ForegroundColor Cyan
}

# Set default configuration values for jagadeeshindia website
$resourceGroup = "jagadeeshindia-rg"
$location = "westus"
$webAppName = "jagadeeshindia"
$appServicePlan = "jagadeeshindia-plan"
$registry = "jagadeeshindiarg"
$loginServer = "$registry.azurecr.io"
$imageName = "jagadeeshindia-web"
$fullImageTag = "$loginServer/$imageName" + ":latest"

Write-Host "=== Starting Azure Deployment for JagadeeshIndia Website ==="
Write-Host "This script will deploy a frontend-only website to Azure."

# Check Docker is installed
$dockerCheck = $(docker --version)
Write-Host "Docker is installed: $dockerCheck"

# Login to Azure
Write-Host "Logging in to Azure..."
az login

# Get the existing resource group's location if it exists
$rgExists = $(az group exists --name $resourceGroup)
if ($rgExists -eq "true") {
    $location = $(az group show --name $resourceGroup --query location -o tsv)
    Write-Host "Using existing resource group location: $location"
} else {
    Write-Host "Using default location: $location"
}

# Debug variables
Write-Host "Resource Group: $resourceGroup"
Write-Host "Web App Name: $webAppName"
Write-Host "App Service Plan: $appServicePlan"
Write-Host "Container Registry: $registry"
Write-Host "ACR Login Server: $loginServer"
Write-Host "Image Tag: $fullImageTag"

# Create resource group if it doesn't exist
Write-Host "Creating resource group if it doesn't exist..."
az group create --name $resourceGroup --location $location

# Create container registry if it doesn't exist
Write-Host "Creating container registry if it doesn't exist..."
$maxRetries = 3
$retryCount = 0
$acrCreated = $false
$originalRegistry = $registry

while (-not $acrCreated -and $retryCount -lt $maxRetries) {
    try {
        $result = az acr create --name $registry --resource-group $resourceGroup --sku Basic --admin-enabled true --query name -o tsv
        if ($result) {
            $acrCreated = $true
            Write-Host "Container registry created successfully: $registry.azurecr.io" -ForegroundColor Green
        }
    } catch {
        $errorMessage = $_.ToString()
        $retryCount++
        
        # Check if name exists conflict
        if ($errorMessage -match "name.*already exists" -or $errorMessage -match "registry.*exists") {
            Write-Host "Error: The container registry name '$registry' is already in use." -ForegroundColor Red
            Write-Host "Azure Container Registry names must be globally unique." -ForegroundColor Yellow
            
            # Generate alternative names
            $timestamp = Get-Date -Format "yyMMdd"
            $randomSuffix = -join ((65..90) + (97..122) | Get-Random -Count 4 | ForEach-Object {[char]$_})
            $alternative1 = "$($originalRegistry)$timestamp"
            $alternative2 = "$($originalRegistry)$randomSuffix"
            $alternative3 = "$($originalRegistry.Substring(0, [Math]::Min(10, $originalRegistry.Length)))$randomSuffix"
            
            Write-Host "Would you like to try with one of these alternative names?" -ForegroundColor Yellow
            Write-Host "1. $alternative1" -ForegroundColor Cyan
            Write-Host "2. $alternative2" -ForegroundColor Cyan
            Write-Host "3. $alternative3" -ForegroundColor Cyan
            Write-Host "4. Enter custom name" -ForegroundColor Cyan
            Write-Host "5. Abort deployment" -ForegroundColor Cyan
            
            $choice = Read-Host "Select an option (1-5)"
            switch ($choice) {
                "1" { $registry = $alternative1 }
                "2" { $registry = $alternative2 }
                "3" { $registry = $alternative3 }
                "4" { 
                    $registry = Read-Host "Enter custom container registry name"
                }
                "5" { 
                    Write-Host "Deployment aborted." -ForegroundColor Red
                    exit 1
                }
                default {
                    Write-Host "Invalid choice. Trying with alternative 1: $alternative1" -ForegroundColor Yellow
                    $registry = $alternative1 
                }
            }
            
            # Update login server and image tag with new registry name
            $loginServer = "$registry.azurecr.io"
            $fullImageTag = "$loginServer/$imageName" + ":latest"
            
            # Reset retry count to give the new name a fair chance
            $retryCount = 0
            Write-Host "Trying with new registry name: $registry" -ForegroundColor Yellow
        } elseif ($retryCount -lt $maxRetries) {
            Write-Host "Failed to create container registry. Retrying in 10 seconds... (Attempt $retryCount/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 10
        } else {
            Write-Host "Failed to create container registry after $maxRetries attempts." -ForegroundColor Red
            Write-Host "Error: $errorMessage" -ForegroundColor Red
            Write-Host "Would you like to continue with deployment anyway? (Y/N)" -ForegroundColor Yellow
            $continue = Read-Host
            if ($continue -ne "Y") {
                Write-Host "Deployment aborted." -ForegroundColor Red
                exit 1
            }
        }
    }
}

# Verify ACR exists before proceeding
Write-Host "Verifying Container Registry exists..."
$acrExists = $false
try {
    $acrInfo = az acr show --name $registry --resource-group $resourceGroup 2>$null
    if ($acrInfo) {
        $acrExists = $true
        Write-Host "Container Registry verified: $registry" -ForegroundColor Green
    }
} catch {
    Write-Host "Container Registry verification failed" -ForegroundColor Red
}

if (-not $acrExists) {
    Write-Host "Container Registry does not exist. We need to create it before proceeding." -ForegroundColor Yellow
    Write-Host "This may be due to Azure resource propagation delays." -ForegroundColor Yellow
    Write-Host "Would you like to continue anyway? (Y/N)" -ForegroundColor Yellow
    $continue = Read-Host
    if ($continue -ne "Y") {
        Write-Host "Deployment aborted." -ForegroundColor Red
        exit 1
    }
}

# Build the frontend Docker image
Write-Host "Building frontend Docker image..."
# Verify variables before building
if ([string]::IsNullOrEmpty($registry) -or [string]::IsNullOrEmpty($imageName)) {
    Write-Error "Registry or image name is empty! Cannot continue."
    Write-Host "Registry: $registry"
    Write-Host "Image name: $imageName"
    exit 1
}

Write-Host "Building image: $fullImageTag"
# Look for optimal Dockerfile in the root directory
if (Test-Path "./Dockerfile-v2-fixed") {
    Write-Host "Using optimized Dockerfile-v2-fixed for production deployment..." -ForegroundColor Green
    docker build -t "$fullImageTag" -f "Dockerfile-v2-fixed" .
} elseif (Test-Path "./Dockerfile-v2") {
    Write-Host "Using Dockerfile-v2..." -ForegroundColor Yellow
    docker build -t "$fullImageTag" -f "Dockerfile-v2" .
} elseif (Test-Path "./Dockerfile") {
    Write-Host "Using existing Dockerfile..." -ForegroundColor Yellow
    docker build -t "$fullImageTag" -f "Dockerfile" .
} else {
    # If no Dockerfile found, create a proper one for static site
    Write-Host "No Dockerfile found, creating optimized Dockerfile for static website deployment..." -ForegroundColor Yellow
    @"
# Production deployment for React application
FROM nginx:alpine

# Copy built frontend assets only (not the public folder)
COPY ./build /usr/share/nginx/html

# Configure nginx to handle SPA routing
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/

# Expose port 80 for HTTP
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
"@ | Out-File -FilePath "./Dockerfile" -Encoding utf8
    
    # Build with the newly created Dockerfile
    docker build -t "$fullImageTag" -f "Dockerfile" .
}

# Get ACR credentials
$acrCredentials = az acr credential show --name $registry | ConvertFrom-Json
$username = $acrCredentials.username
$password = $acrCredentials.passwords[0].value

# Login to ACR
Write-Host "Logging in to container registry..."
docker login "$loginServer" -u $username -p $password

# Push the image
Write-Host "Pushing Docker image to registry..."
docker push "$fullImageTag"

# Check if App Service Plan already exists and get its location
Write-Host "Checking App Service Plan..."
$appServicePlanExists = $(az appservice plan list --resource-group $resourceGroup --query "[?name=='$appServicePlan'].name" -o tsv)

if ($appServicePlanExists) {
    $planLocation = $(az appservice plan show --name $appServicePlan --resource-group $resourceGroup --query "location" -o tsv)
    Write-Host "App Service Plan $appServicePlan already exists in location $planLocation"
    # Use the existing plan's location for consistency
    $location = $planLocation
    Write-Host "Updated location to match existing App Service Plan: $location"
} else {
    Write-Host "Creating App Service Plan..."
    az appservice plan create --name $appServicePlan --resource-group $resourceGroup --sku B1 --is-linux --location $location
}

# Create or update Web App 
Write-Host "Creating or updating Web App..."
$webAppExists = $(az webapp list --resource-group $resourceGroup --query "[?name=='$webAppName'].name" -o tsv)

if ($webAppExists) {
    Write-Host "Web app $webAppName already exists. Updating..."
} else {
    Write-Host "Creating new web app $webAppName..."
    az webapp create --resource-group $resourceGroup --plan $appServicePlan --name $webAppName --deployment-container-image-name "$fullImageTag"
}

# Configure environment variables for web app (frontend-only)
Write-Host "Configuring Web App environment variables..."
az webapp config appsettings set --resource-group $resourceGroup --name $webAppName `
  --settings WEBSITES_ENABLE_APP_SERVICE_STORAGE=false `
  WEBSITES_PORT="80"

# Update Web App with the latest image
Write-Host "Updating Web App with latest image..."
az webapp config container set --name $webAppName --resource-group $resourceGroup `
  --container-image-name "$fullImageTag" `
  --container-registry-url "https://$loginServer" `
  --container-registry-user $username `
  --container-registry-password $password

# Restart the web app
Write-Host "Restarting Web App..."
az webapp restart --name $webAppName --resource-group $resourceGroup

# Wait for deployment to complete
Write-Host "Waiting for deployment to complete (30 seconds)..."
Start-Sleep -Seconds 30

# Set a deployment error flag to false initially
$deploymentError = $false

# Test the website
Write-Host "Testing website..."
try {
    $response = Invoke-WebRequest -Uri "https://$webAppName.azurewebsites.net/" -TimeoutSec 30
    Write-Host "Website check successful. Status code: $($response.StatusCode)" -ForegroundColor Green
} catch {
    $deploymentError = $true
    Write-Host "Could not verify website. This may indicate a deployment error." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "=== Azure Deployment Complete ==="
Write-Host "Website URL: https://$webAppName.azurewebsites.net"

# Retrieve and display the logs only if there was a deployment error
if ($deploymentError) {
    Write-Host "Deployment error detected. Downloading webapp logs for troubleshooting..." -ForegroundColor Yellow
    Get-AppServiceLogs -resourceGroup $resourceGroup -webAppName $webAppName
} else {
    Write-Host "Deployment completed successfully. No need to download logs." -ForegroundColor Green
    Write-Host "If you need to view logs later, you can manually run: Get-AppServiceLogs -resourceGroup $resourceGroup -webAppName $webAppName"
}
