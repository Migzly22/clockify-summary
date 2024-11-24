
<template>
  <UContainer class="flex flex-col gap-2">
    <div class="flex items-end justify-between">
      <UserDetails :state="userState" />
      <div class="flex gap-2 justify-end">
        <DateMultiple @updateDate="updateDate"/>
        <UButton @click="isOpen = true" icon="i-heroicons-cog"/>
        <UButton @click="searchData" icon="i-heroicons-magnifying-glass" :loading="isLoading"/>
        <UButton @click="" icon="i-heroicons-printer" :loading="isLoading" :disabled="tableData.length == 0"/>
      </div>
    </div>
    <TableUi :tableData="tableData" :isLoading="isLoading"/>
  </UContainer>
  <FormModal :isOpen="isOpen" @updateState="(data:boolean)=> isOpen = data" @updateDetails="updateDetails" :storedValue="userState"/>
</template>

<script lang="ts" setup>
import { sub, format, isSameDay, type Duration } from 'date-fns'
import type { DataHolder, IUserData } from '~/constants/constants';
import { AGET } from '~/utils/axios';

const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const tableData = ref([])
const userState = ref<IUserData>({
  email: undefined,
  firstName : undefined,
  lastName : undefined,
  job : undefined,
  workplaceId : undefined,
})


const updateDetails = (data:object) => {
  userState.value = data
  isOpen.value = false
}; 

const selectedDate = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
const updateDate = (newData:any ) => selectedDate.value = newData;

const { API_KEY, WORKSPACE } = useRuntimeConfig().public;
const apiKey:string = (API_KEY as string)!; 

async function searchData() {
  const workspaceId = userState?.value.workplaceId ?? (WORKSPACE ?? '');
  isLoading.value = true

  try {
    let startDate = `${isoDate(selectedDate.value.start)}T00:00:00Z`
    let endDate = `${isoDate(selectedDate.value.end)}T24:00:00Z`
    let name =   userState.value!.firstName &&  userState.value!.lastName ? `${ userState.value!.firstName} ${ userState.value!.lastName}` : ''

    const res : any = await AGET({
      link : `http://localhost:8080/clockify/main/user`,
      params : {
        email : userState.value.email ?? '',
        name : name,
        job :  userState.value.job ?? '',
        start: startDate,
        end: endDate,
        workspaceId : workspaceId
      }
    })

    tableData.value = res?.rows
  } catch (error) {
    useToastNotification().error({title : "Error Parsing Data"})
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>

</style>