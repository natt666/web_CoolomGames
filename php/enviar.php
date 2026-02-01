<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $assumpte = htmlspecialchars($_POST['subject']);
    $missatge = htmlspecialchars($_POST['message']);

    $destinatari = "coolomgames@gmail.com"; 

    $mail_assumpte = "Nou missatge web: " . $assumpte;
    $cos = "Has rebut un nou missatge des del formulari de contacte:\n\n";
    $cos .= "Nom: $nom\n";
    $cos .= "Correu: $email\n";
    $cos .= "Assumpte: $assumpte\n\n";
    $cos .= "Missatge:\n$missatge\n";
    $headers = "From: no-reply@coolomgames.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatari, $mail_assumpte, $cos, $headers)) {
        header("Location: /contact.html?status=success");
        exit();
    } else {
        header("Location: /contact.html?status=error");
        exit();
    }
} else {
    header("Location: /contact.html");
    exit();
}
?>