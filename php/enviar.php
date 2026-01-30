<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nom = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $assumpte = htmlspecialchars($_POST['subject']);
        $missatge = htmlspecialchars($_POST['message']);

        $destinatari = "coolomgames@gmail.com"; 

        $mail_assumpte = "Nou missatge des del formulari del web: " . $assumpte;

        $cos = "Nom: $nom\n";
        $cos .= "Correu electrònic: $email\n";
        $cos .= "Assumpte: $assumpte\n\n";
        $cos .= "Missatge:\n$missatge\n";

        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

    if (mail($destinatari, $mail_assumpte, $cos, $headers)) {
    header("Location: contact.html?status=success");
            exit();
        } else {
            header("Location: contact.html?status=error");
            exit();
        }
    } else {
        header("Location: contact.html");
        exit();
    }
?>