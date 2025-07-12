resource "aws_cloudwatch_event_bus" "citas_bus" {
    name = "citas-bus"
}

resource "aws_cloudwatch_event_rule" "sacar_cita" {
    name           = "sacar-cita"
    description    = "Regla para sacar cita desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.citas_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.veterinaria"],
        "detail-type": ["sacar-cita"]
    })
}

resource "aws_cloudwatch_event_target" "target_lambda_sacar_cita" {
    rule      = aws_cloudwatch_event_rule.sacar_cita.name
    target_id = "sacar-cita-lambda"
    arn       = var.sacar_cita_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.citas_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge" {
    statement_id  = "AllowExecutionFromEventBridge"
    action        = "lambda:InvokeFunction"
    function_name = var.sacar_cita_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.sacar_cita.arn
}