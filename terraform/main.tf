provider "docker" {}

resource "docker_image" "app" {
  name         = var.image_name
  keep_locally = true
}

resource "docker_container" "app" {
  name  = var.container_name
  image = docker_image.app.image_id

  env = ["APP_ENV=${var.app_environment}"]

  ports {
    internal = 3000
    external = var.host_port
  }

  healthcheck {
    test         = ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://127.0.0.1:3000/health"]
    interval     = "10s"
    timeout      = "3s"
    retries      = 3
    start_period = "5s"
  }

  restart = "unless-stopped"
}
