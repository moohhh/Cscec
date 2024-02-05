<!-- resources/views/login.blade.php -->

<form method="POST" action="{{ url('/login') }}">
    @csrf <!-- Ajoutez ceci pour protéger contre les attaques de type CSRF -->

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>

    <label for="password">Mot de passe</label>
    <input type="password" name="password" id="password" required>

    <button type="submit">Se connecter</button>
</form>