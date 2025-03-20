<svelte:head>
  <title>Contact me</title>
</svelte:head>

<div class="container">
    <form action="mailto:foo@example.com" method="GET" class="contact-form">
        <label>
            Email:
            <input type="email" name="email" required>
        </label>
        <br>
        <label>
            Subject:
            <input type="text" name="subject" required>
        </label>
        <br>
        <label>
            Message:
            <textarea name="body" required></textarea>
        </label>
        <br>
        <button type="submit">Send</button>
    </form>
</div>