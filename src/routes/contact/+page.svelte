
<style lang="scss">
    input, textarea {
        width: 100%;
        padding: 10px;
        border: 1.5px solid #111;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 10px;
      margin-top: 10px;
      background-color: #313131;
        color: #fff;
      font-family: 'ABeeZee', sans-serif;
    }

    label{
        font-weight: bold;
    }
</style>

<script lang="ts">
    import jQuery from 'jquery';
    import { goto } from '$app/navigation';
    jQuery('#myForm').on("submit",function(e){
        e.preventDefault();
        jQuery.ajax({
            url: 'https://formsubmit.co/02ac0d8b8e1537f22177cfff6dc6ca43',
            type: 'post',
            data:jQuery('#myForm').serialize(),
            success:function(){
                goto('./submitted');
            }
        });
    });
</script>

<h1>You can <span>contact</span> me here</h1>
<form>
    <label for="email">Your email</label><br>
    <input type="email" name="email" placeholder="your.name@example.com" required><br>
    <label for="subject">Subject</label><br>
    <input type="text" name="subject" placeholder="Subject: An Awesome Reason to Chat!" required><br>
    <label for="message">Your message</label><br>
    <textarea name="message" placeholder="I just wanted to say..." required rows="8" cols="40"></textarea><br>
    <input type="hidden" name="_captcha" value="false">
    <button type="submit">Send Message</button>
</form>