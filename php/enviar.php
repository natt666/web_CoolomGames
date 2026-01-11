<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recollim les dades del formulari
    $nom = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $assumpte = htmlspecialchars($_POST['subject']);
    $missatge = htmlspecialchars($_POST['message']);

    // A quin correu vols que arribi
    $destinatari = "coolomgames@gmail.com"; 

    // Assumpte del correu
    $mail_assumpte = "Nou missatge des del formulari del web: " . $assumpte;

    // Cos del correu
    $cos = "Nom: $nom\n";
    $cos .= "Correu electrònic: $email\n";
    $cos .= "Assumpte: $assumpte\n\n";
    $cos .= "Missatge:\n$missatge\n";

    // Capçaleres del correu
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviem el correu
if (mail($destinatari, $mail_assumpte, $cos, $headers)) {
    // Missatge visible a l'usuari en anglès
    echo "<p>Your message has been sent successfully. Thank you!</p>";
} else {
    echo "<p>There was an error sending your message. Please try again later.</p>";
}
} else {
    echo "<p>Invalid access.</p>";
}
?>