<style lang="scss">
    input, textarea {
        width: 100%;
        padding: 10px;
        border: 1.5px solid #111;
        border-radius: 15px;
        box-sizing: border-box;
        margin-bottom: 10px;
      margin-top: 10px;
      background-color: #313131;
        color: #fff;
      font-family: 'ABeeZee', sans-serif;
    }

    textarea{
      border-bottom-right-radius: 0;
    }

    label{
        font-weight: bold;
    }

    button{
        background-color: #111;
        color: #fff;
        border: 1.5px solid #111;
        border-radius: 15px;
        padding: 10px;
        font-family: 'ABeeZee', sans-serif;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #fff;
          color: #111;
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
    <label for="email">Your email</label><br>
    <input type="email" name="email" placeholder="your.name@example.com" required><br>
    <label for="subject">Subject</label><br>
    <input type="text" name="subject" placeholder="Subject: An Awesome Reason to Chat!" required><br>
    <label for="message">Your message</label><br>
    <textarea name="message" placeholder="I just wanted to say..." required rows="8" cols="40"></textarea><br>
    <button type="submit">{$_("send")}</button>
</form>