<template>
  <div class="flex flex-col gap-y-2 px-2">
    <div>
      <p>Menubar app to track coin price, open source.</p>
      <p class="text-sm text-neutral-500">
        (Active maintaining, feel free to feedback anything.)
      </p>
    </div>

    <div class="mt-2">
      <h3>Assets</h3>
      <p>
        Data source:
        <a href="https://www.coingecko.com/" target="_blank">CoinGecko</a>
      </p>
      <p>
        Source code:
        <a href="https://github.com/2nthony/coin-ticker" target="_blank">
          2nthony/coin-ticker
        </a>
      </p>
    </div>

    <div>
      <h3>Contacts</h3>
      <p>
        GitHub:
        <a href="https://github.com/2nthony" target="_blank">2nthony</a>
      </p>
      <p>
        Twitter:
        <a href="https://twitter.com/_2nthony" target="_blank">_2nthony</a>
      </p>
      <p>
        Email:
        <a href="mailto:ant.hu@outlook.com" target="_blank">
          ant.hu@outlook.com
        </a>
      </p>
    </div>

    <div class="support-me">
      <h3>Support me</h3>
      <p>
        <img
          src="https://github.githubassets.com/images/email/sponsors/mona.png"
        >
        GitHub Sponsor:
        <a href="https://github.com/sponsors/2nthony" target="_blank">
          2nthony
        </a>
      </p>
      <p>
        <img
          src="https://www.paypalobjects.com/digitalassets/c/website/logo/monogram/pp_fc_mg_2x.png"
        >
        Paypal:
        <a href="https://www.paypal.com/paypalme/evillt" target="_blank">
          evillt
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
a {
  @apply text-sky-500;
}

h3 {
  @apply text-xl font-bold;
}

.support-me img {
  @apply w-5 h-5 inline-block;
}
</style>
