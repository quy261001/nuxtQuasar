<template>
     <h1>pagination</h1>
</template>
<script setup lang="ts">
const props = defineProps({
    current: Number,
    size: Number,
})
watch(props.current, val => {
    console.log(val)
})
console.log(props.current)
</script>