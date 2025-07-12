output "sacar_cita_funcion_arn" {
  description = "ARN de la función para sacar citas"
  value       = aws_lambda_function.sacar_cita.arn
}
output "sacar_cita_funcion_name" {
  description = "Nombre de la función Lambda para sacar citas"
  value       = aws_lambda_function.sacar_cita.function_name
}