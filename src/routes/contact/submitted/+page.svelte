<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<h1>{@html $_("contact-thanks") }</h1>
<p>{$_("contact-thanks-text")}</p>
<a href="/">{$_("go-back")}</a>