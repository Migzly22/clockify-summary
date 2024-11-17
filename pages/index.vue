<template>
  <UContainer class="flex flex-col gap-2">
    <div class="flex gap-2 ">
      <UButton label="Open" @click="isOpen = true" />
      <UButton label="Search" @click="isOpen = true" />
      <UButton label="Show toast" @click="ToastNotification.success({title: 'Notification Success'})" />
      <UButton label="Show toast" @click="ToastNotification.info({title: 'Notification Success'})" />
    </div>
    <TableUi :tableData="tableData"/>
    
  </UContainer>
  <FormModal :isOpen="isOpen" @updateState="(data)=> isOpen = data" @updateDetails="updateDetails"/>

</template>

<script lang="ts" setup>

const isOpen = ref<boolean>(false)
const tableData = ref([])
const userState = ref({})

const updateDetails = (data:object) => userState.value = data;


const searchData = () =>{
  try {
    tableData.value = []
  } catch (error) {
    
  }
}

</script>

<style scoped>

</style>