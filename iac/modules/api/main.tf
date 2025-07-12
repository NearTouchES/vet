resource "aws_apigatewayv2_api" "http_api" {
  name          = "veterinaria-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "citas_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/citas"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "citas_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/citas/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "medicos_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/medicos"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "medicos_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/medicos/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "pacientes_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/pacientes"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "pacientes_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/pacientes/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "tutores_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/tutores"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "tutores_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/tutores/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "eventbridge_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_subtype    = "EventBridge-PutEvents"
  credentials_arn        = var.rol_lab_arn

  request_parameters = {
    Source       = "pe.com.veterinaria"
    DetailType   = "sacar-cita"
    Detail       = "$request.body"
    EventBusName = var.event_bus_name
  }

  payload_format_version = "1.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 500
    throttling_rate_limit  = 1000
  }

  route_settings {
    route_key     = "$default"
    logging_level = "INFO"
  }
}

#########################################
# Routes - Citas (EventBridge for POST, PUT)
#########################################
# En caso de tener más tiempo revisar esto del EventBridge, ahora esta generado por defecto por el ejemplo 
# de clase
resource "aws_apigatewayv2_route" "citas_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /citas"
  target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
}

resource "aws_apigatewayv2_route" "citas_put" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /citas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
}
#########################################
# Routes - Citas
#########################################
resource "aws_apigatewayv2_route" "citas_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /citas"
  target    = "integrations/${aws_apigatewayv2_integration.citas_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "citas_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /citas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.citas_integration.id}"
}

resource "aws_apigatewayv2_route" "citas_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /citas"
  target    = "integrations/${aws_apigatewayv2_integration.citas_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "citas_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /citas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.citas_integration.id}"
}

resource "aws_apigatewayv2_route" "citas_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /citas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.citas_integration.id}"
}
#########################################
# Routes - Medicos
#########################################
resource "aws_apigatewayv2_route" "medicos_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /medicos"
  target    = "integrations/${aws_apigatewayv2_integration.medicos_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "medicos_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /medicos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.medicos_integration.id}"
}

resource "aws_apigatewayv2_route" "medicos_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /medicos"
  target    = "integrations/${aws_apigatewayv2_integration.medicos_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "medicos_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /medicos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.medicos_integration.id}"
}

resource "aws_apigatewayv2_route" "medicos_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /medicos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.medicos_integration.id}"
}

#########################################
# Routes - Pacientes
#########################################

resource "aws_apigatewayv2_route" "pacientes_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /pacientes"
  target    = "integrations/${aws_apigatewayv2_integration.pacientes_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "pacientes_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /pacientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.pacientes_integration.id}"
}

resource "aws_apigatewayv2_route" "pacientes_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /pacientes"
  target    = "integrations/${aws_apigatewayv2_integration.pacientes_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "pacientes_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /pacientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.pacientes_integration.id}"
}

resource "aws_apigatewayv2_route" "pacientes_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /pacientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.pacientes_integration.id}"
}

#########################################
# Routes - Tutores
#########################################
resource "aws_apigatewayv2_route" "tutores_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /tutores"
  target    = "integrations/${aws_apigatewayv2_integration.tutores_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "tutores_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /tutores/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.tutores_integration.id}"
}

resource "aws_apigatewayv2_route" "tutores_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /tutores/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.tutores_integration.id}"
}

resource "aws_apigatewayv2_route" "tutores_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /tutores/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.tutores_integration.id}"
}

resource "aws_apigatewayv2_route" "tutores_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /tutores/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.tutores_integration.id}"
}