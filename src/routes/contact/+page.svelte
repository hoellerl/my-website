<style lang="scss">

  .all-inputs{
    text-align: left !important;
  }

  label{
    margin-left: 10px;
  }

    @media only screen and (max-width: 1024px) {
        // make the two-inputs divs stack on top of each other
        div.two-inputs{
            flex-direction: column !important;
            div{
                width: 100%;
                margin: unset !important;
            }

        }

    }

    input, textarea {
        width: 100%;
        padding: 10px;
        border: 1.5px solid #111;
        border-radius: var(--rounding);
        box-sizing: border-box;
        margin-bottom: 10px;
        margin-top: 10px;
        background-color: var(--sec-bg);
        color: var(--sec-text);
        font-size: 1rem;
        font-family: 'ABeeZee', sans-serif;
        transition: all 0.3s ease;
        &:focus{
            outline: none;
            transform: scale(1.01);
            border: 1.5px solid var(--accent);
            box-shadow:  0 0 5px rgba(0, 0, 0, 0.5);
        }
    }

    div.two-inputs{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        input, div{
            &:first-child{
                margin-right: 10px;
            }
            &:last-child{
                margin-left: 10px;
            }
        }
        div{
            width: 50%;
            display: flex;
            flex-direction: row;
            justify-content: left;
        }
    }

    textarea{
        resize: vertical;
        border-bottom-right-radius: 0;
    }

    label{
        font-weight: bold;
        font-size: var(--text-size-small);
    }

    button{
        vertical-align: middle;
        font-size: var(--text-size-small);
    }

    .button{
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        border-radius: var(--rounding);
        background-color: var(--sec-bg);
        border: #1f1d1d 1.5px solid;
        color: var(--text);
        text-decoration: none;
        transition: 0.3s ease;
        &:hover{
            transform: scale(1.05);
            box-shadow:  0 0 5px rgba(0, 0, 0, 0.5);
            color: var(--text);
        }
        &:active{
            transform: scale(0.95);
            box-shadow:  0 0 0 rgba(0, 0, 0, 0.5);
        }
    }

</style>

<script lang="ts">
    import { _ } from "svelte-i18n";
    import {onMount} from "svelte";
    import { browser } from '$app/environment';
    let win = browser ? window : null;

    onMount(async () =>{
        // if on mobile rearrange the two labels
        rearrangeLabelsOnMobile();
        window.addEventListener('resize', () => {setTimeout(rearrangeLabelsOnMobile, 300);});
        // uncomment to enable hCaptcha
        // const form = document.getElementById('contact');
        // if (!form) {
        //     return;
        // }
        // form.addEventListener('submit', (e) => {
        //     const hCaptchaElement = form.querySelector('textarea[name=h-captcha-response]') as HTMLTextAreaElement;
        //     const hCaptcha = hCaptchaElement ? hCaptchaElement.value : null;
        //     if (!hCaptcha) {
        //         e.preventDefault();
        //         alert('Please complete the captcha');
        //     }
        // });
    });
    // uncomment to enable hCaptcha
    // afterUpdate(() => {
    //     if (!browser) {
    //         return;
    //     }
    //     const script = document.createElement('script');
    //     script.src = 'https://web3forms.com/client/script.js';
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    // });

    function rearrangeLabelsOnMobile(){
        const noOfChilds = document.querySelectorAll('div.labels div');
        const twoInputs = document.getElementsByClassName('two-inputs');
        if(noOfChilds.length >= 2 && window.innerWidth < 1024){
            const secondLabel = twoInputs[0].children[1];
            if (secondLabel) {
                twoInputs[0].removeChild(secondLabel);
                twoInputs[1].insertBefore(secondLabel, twoInputs[1].children[1]);
            }
        }
        else if (noOfChilds.length < 2 && window.innerWidth >= 1024){
            const secondLabel = twoInputs[1].children[1];
            if (secondLabel) {
                twoInputs[1].removeChild(secondLabel);
                twoInputs[0].appendChild(secondLabel);
            }}
    }
</script>

<svelte:head>
    <title>Adam Höllerl - {$_("contact")}</title>
</svelte:head>

<h1>{@html $_("contact-header")}</h1>
<form id="contact" action="https://api.web3forms.com/submit" method="POST">
    <div class="all-inputs">
    <input type="hidden" name="access_key" value="7b60772a-7925-491c-b272-616e60a62db5">
        <div class="two-inputs labels">
            <div>
            <label for="email">{$_("contact-email")}</label>
            </div>
            <div>
            <label for="from_name">{$_("contact-name")}</label>
            </div>
        </div>
        <div class="two-inputs">
            <input type="email" name="email" placeholder="{$_('contact-email-placeholder')}" required><br>
            <input type="text" name="from_name" placeholder="{$_('contact-name-placeholder')}" required><br>
        </div>
    <label for="subject">{$_("contact-subject")}</label><br>
    <input type="text" name="subject" placeholder="{$_('contact-subject-placeholder')}" required><br>
    <label for="message">{$_("contact-message")}</label><br>
    <textarea name="message" placeholder="{$_('contact-message-placeholder')}" required rows="5" cols="40"></textarea><br>
    <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
    </div>
    <!-- uncomment to enable hCaptcha -->
    <!--    <div class="h-captcha" data-captcha="true" data-theme="dark"></div>-->
    <input type="hidden" name="redirect" value="{win?.location?.origin??'hoellerl.dev'}/contact/submitted" style="display: none;">
    <button class="button" type="submit"><i class="twa twa-rocket"></i>&nbsp&nbsp{$_("send")}</button>
</form>