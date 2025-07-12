output "nombre_cluster" {
  value = aws_ecs_cluster.cluster_veterinaria_servicios.name
}

output "task_definition_arn" {
  value = aws_ecs_cluster.cluster_veterinaria_servicios.arn
}

output "load_balancer_url" {
  description = "URL pública del Load Balancer"
  value       = aws_lb.veterinaria_load_balancer.dns_name
}
