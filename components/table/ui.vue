<template>
    <div class="flex flex-col gap-5">
        <UTable 
            :loading="isLoading"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :rows="mainData" :columns="tableColumns"
        />
        <div class="flex justify-end">
            <UPagination v-model="pageData.current" :page-count="pageData.count" :total="tableData.length" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { tableColumns } from '~/constants/constants';


const props = defineProps({
    tableData : {
        type : Array as PropType<Object[]>,
        required : true
    },
    isLoading : {type : Boolean}
})

const pageData = reactive({
  count : 10,
  current : 1,
})

const mainData = computed(()=>{
  let end =  pageData.count * pageData.current
  let start =  pageData.count * (  pageData.current -1)
  return props.tableData.slice(start, end)
})

</script>

<style scoped>

</style>