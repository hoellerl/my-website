<style lang="scss">
    input, textarea {
        width: 100%;
        padding: 10px;
        border: 1.5px solid #111;
        border-radius: 15px;
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-top: 10px;
        background-color: #312c2c;
        color: #f5e2c3;
        font-size: 1rem;
        font-family: 'ABeeZee', sans-serif;
    }

    textarea{
      border-bottom-right-radius: 0;
    }

    label{
        font-weight: bold;
    }

    button{
      color: wheat;
      font-weight: bold;
      height: 50px;
      padding: 0 30px;
      margin: 0 10px;
      text-decoration: none;
      background-color: #362b2b;
      border: 1px solid #000;
      transition: 0.3s ease;
        border-radius: 15px;

      &:hover {
        background-color: #642330;
        color:wheat;
      }
    }
</style>

<script lang="ts">
    import jQuery from 'jquery';
    import { goto } from '$app/navigation';
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>Kontakt | Adam Höllerl</title>
</svelte:head>

<h1>{@html $_("contact-header")}</h1>
<form on:submit={
    (e) => {
        e.preventDefault();
        console.log("submitting");
        jQuery.ajax({
            url: 'https://formsubmit.co/02ac0d8b8e1537f22177cfff6dc6ca43',
            type: 'post',
            data: {
                email: jQuery('input[name="email"]').val(),
                subject: jQuery('input[name="subject"]').val(),
                message: jQuery('textarea[name="message"]').val(),
            },
            success:function(){
                goto('./submitted');
            }
        });
    }
} id="contact">
    <label for="email">{$_("contact-email")}</label><br>
    <input type="email" name="email" placeholder="{$_('contact-email-placeholder')}" required><br>
    <label for="subject">{$_("contact-subject")}</label><br>
    <input type="text" name="subject" placeholder="{$_('contact-subject-placeholder')}" required><br>
    <label for="message">{$_("contact-message")}</label><br>
    <textarea name="message" placeholder="{$_('contact-message-placeholder')}" required rows="8" cols="40"></textarea><br>
    <button type="submit">{$_("send")}</button>
</form>