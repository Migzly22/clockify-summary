
<template>
  <UContainer class="flex flex-col gap-2">
    <div class="flex items-end justify-between">
      <UserDetails :state="userState" />
      <div class="flex gap-2 justify-end">
        <DateMultiple @updateDate="updateDate"/>
        <UButton @click="isOpen = true" icon="i-heroicons-cog"/>
        <UButton @click="searchData" icon="i-heroicons-magnifying-glass" :loading="loadingState.search"/>
        <UButton @click="printFile" icon="i-heroicons-printer" :loading="loadingState.print" :disabled="tableData.length == 0"/>
      </div>
    </div>
    <TableUi :tableData="tableData" :isLoading="isLoading"/>
  </UContainer>
  <FormModal :isOpen="isOpen" @updateState="(data:boolean)=> isOpen = data" @updateDetails="updateDetails" :storedValue="userState"/>
</template>

<script lang="ts" setup>

import { sub } from 'date-fns'
import type { IUserData } from '~/constants/constants';
import { AGET } from '~/utils/axios';

const { isoDate, dateFormatter, getWeekNo } = useDate()
const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const loadingState = reactive({
  search : false,
  print : false
})

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

const { PUBLIC_URL } = useRuntimeConfig().public;

async function searchData() {
  const workspaceId = userState?.value.workplaceId ?? '';
  loadingState.search = true;

  try {
    let startDate = `${isoDate(selectedDate.value.start)}T00:00:00Z`
    let endDate = `${isoDate(selectedDate.value.end)}T24:00:00Z`
    let name =   userState.value!.firstName &&  userState.value!.lastName ? `${ userState.value!.firstName} ${ userState.value!.lastName}` : ''

    const res : any = await AGET({
      link : `${PUBLIC_URL}/clockify/main/user`,
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
    loadingState.search = false
  }
}

const printFile = async() => {
  const workspaceId = userState?.value.workplaceId ?? '';
  loadingState.print = true

  try {
    let startDate = `${isoDate(selectedDate.value.start)}T00:00:00Z`
    let endDate = `${isoDate(selectedDate.value.end)}T24:00:00Z`
    let monthData = dateFormatter(selectedDate.value.start, { year: "numeric", month: "short" })
    let weekNo = getWeekNo(selectedDate.value.start)
    
    let name =   userState.value!.firstName &&  userState.value!.lastName ? `${ userState.value!.lastName}, ${ userState.value!.firstName} ` : ''

    const res : any = await AGET({
      link : `${PUBLIC_URL}/clockify/main/print`,
      params : {
        email : userState.value.email ?? '',
        name : name,
        job :  userState.value.job ?? '',
        start: startDate,
        end: endDate,
        workspaceId : workspaceId
      }
    })

    //Base 64 to xlsx
    let base64 = res.response;
    var a = document.createElement("a");
    a.href = "data:image/png;base64," + base64;
    a.download = `Accomplishment Report (${monthData} ${weekNo}) - ${name}.xlsx`;
    a.click();

    useToastNotification().success({
      title : "Downloading please wait...",
      description : `Downloading Accomplishment Report (${monthData} ${weekNo}) - ${name}.xlsx`
    })

  } catch (error) {
    useToastNotification().error({title : "Error Parsing Data"})
  } finally {
    loadingState.print = false
  }
}

</script>

<style scoped>

</style>