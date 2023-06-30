<template>
    <q-toolbar class="bg-[#000] !p-5">
      <q-img class="banner-img h-[48px]" src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg"></q-img>
      <q-toolbar-title class="text-[#fff]">Quasar App</q-toolbar-title>
      <q-tabs class="text-[18px] text-[#fff]">
        <q-tab>Table</q-tab>
        <q-tab>Blog</q-tab>
        <q-tab>Video</q-tab>
      </q-tabs>
    </q-toolbar>
    <main class="p-5">
      <slot />
    </main>
</template>

<script setup lang="ts">

</script>

<style>
  .banner-img {
    max-width: 48px;
  }
</style>