<template>
  <UContainer class="flex flex-col gap-2">
    <div class="flex gap-2 ">
      <DateMultiple @updateDate="updateDate"/>
      <UButton label="Open" @click="isOpen = true" />
      <UButton label="Search" @click="searchData"/>
    </div>
    <TableUi :tableData="tableData"/>
    
  </UContainer>
  <FormModal :isOpen="isOpen" @updateState="(data:boolean)=> isOpen = data" @updateDetails="updateDetails" :storedValue="userState"/>

</template>

<script lang="ts" setup>
import { sub, format, isSameDay, type Duration } from 'date-fns'
import type { DataHolder, IUserData } from '~/constants/constants';
import { GET } from '~/utils/axios';

const isOpen = ref<boolean>(false)
const tableData = ref([])
const userState = ref<IUserData>({
  email: undefined,
  firstName : undefined,
  lastName : undefined,
  job : undefined,
  workplaceId : undefined,
})
const isLoading = ref<boolean>(false)

const updateDetails = (data:object) => {
  userState.value = data
  console.log(userState.value)
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
    const {name, id} = (await GET(`https://api.clockify.me/api/v1/workspaces/${workspaceId}/users?email=${userState.value.email}`,{'X-Api-Key': apiKey}))[0];

    let startDate = `${isoDate(selectedDate.value.start)}T00:00:00Z`
    let endDate = `${isoDate(selectedDate.value.end)}T24:00:00Z`
    
    const listOfData = await GET(`https://api.clockify.me/api/v1/workspaces/${workspaceId}/user/${id}/time-entries?start=${startDate}&end=${endDate}`,{'X-Api-Key': apiKey})

    tableData.value = listOfData.map((data:any) =>jsonFormatter(data)).sort((a:DataHolder, b:DataHolder) => parseDate(a.dateTime).getTime() - parseDate(b.dateTime).getTime())

  } catch (error) {
    useToastNotification().error({title : "Error Parsing Data"})
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>

</style>