<template>
    <div class="border rounded-t-lg overflow-auto w-fit flex" >
        <div :class="`px-4 py-2 min-w-32  ${index < details.length-1 ? 'border-r border-white' : ''} bg-[#ffffff57]`" v-for="(data, index) in details" :key="data.label">
            <p class="text-xs text-[#bdbcbc]">{{ data.label }}</p>
            <p class="">{{ data.value }}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
    const props = defineProps({
        state : {type : Object},
    })

    const details = computed(() =>{
        if(!props.state ) return [];

        let value = props.state
        let name =  value!.firstName && value!.lastName ? `${value!.firstName} ${value!.lastName}` : '-'
        return [
            {label : "Name" , value : name},
            {label : "Email" , value : value!.email ?? '-' },
            {label : "Job" , value :  value!.job ?? '-'},
        ]
    })
</script>