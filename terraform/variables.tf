variable "image_name" {
  description = "Name and tag of the Docker image built by Jenkins."
  type        = string
}

variable "container_name" {
  description = "Name of the deployed container."
  type        = string
  default     = "node-terraform-demo"
}

variable "host_port" {
  description = "Host port exposed by the application."
  type        = number
  default     = 3000
}

variable "app_environment" {
  description = "Environment label returned by the application."
  type        = string
  default     = "production"
}
