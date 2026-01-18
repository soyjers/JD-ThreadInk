<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "jdruiz98@outlook.com";
    $subject = "Nuevo mensaje desde tu landing page";
    $body = "Nombre: $name\nCorreo: $email\n\nMensaje:\n$message";

    $headers = "From: no-reply@tudominio.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>
