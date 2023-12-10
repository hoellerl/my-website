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
      vertical-align: middle;
      font-size: 1.1rem;
    }


</style>

<script lang="ts">
    import jQuery from 'jquery';
    import { goto } from '$app/navigation';
    import { _ } from "svelte-i18n";
    import {onMount} from "svelte";

    function submitForm(e: Event){
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

    onMount(async () =>{
        const script = document.createElement('script');
        script.src = 'https://web3forms.com/client/script.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    })
</script>

<svelte:head>
    <title>Kontakt | Adam Höllerl</title>
</svelte:head>

<h1>{@html $_("contact-header")}</h1>
<form id="contact" action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="7b60772a-7925-491c-b272-616e60a62db5">
    <label for="email">{$_("contact-email")}</label><br>
    <input type="email" name="email" placeholder="{$_('contact-email-placeholder')}" required><br>
    <label for="subject">{$_("contact-subject")}</label><br>
    <input type="text" name="subject" placeholder="{$_('contact-subject-placeholder')}" required><br>
    <label for="message">{$_("contact-message")}</label><br>
    <textarea name="message" placeholder="{$_('contact-message-placeholder')}" required rows="8" cols="40"></textarea><br>
    <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
    <div class="h-captcha" data-captcha="true"></div>
    <button class="button" type="submit"><i class="twa twa-rocket"></i>&nbsp&nbsp{$_("send")}</button>
</form>