<template>
  <div class="p-2.5 flex flex-col gap-2.5 min-h-svh justify-between">
    <div class="flex flex-col md:flex-row md:items-center justify-between max-h-[100px] p-2.5 px-0 self-start w-full">
      <h1 class="text-xl font-bold tracking-tight">Opportunity Cost Calculator</h1>
      <a href="https://www.madebyporter.com" target="_blank" class="underline text-base font-bold tracking-tight">Made by Porter</a>
    </div>
    <div id="middlediv" class="grid lg:grid-cols-2 gap-2.5 grow">
      <div class="col-span-1 bg-white rounded-lg flex flex-col">
        <div class="border-b border-neutral-300 px-10 py-5 lg:p-10 flex flex-col md:flex-row gap-2 lg:gap-4 justify-between items-center md:items-end grow">
          <h2 class="text-3xl lg:text-5xl font-medium tracking-tight">Your Cost</h2>
          <span class="text-lg lg:text-4xl font-medium tracking-tight">${{ yourOpportunityCost }}</span>
        </div>
        <div class="p-10 grid md:grid-cols-2 2xl:grid-cols-3 gap-5 justify-stretch items-start">
          <label class="md:col-span-2 2xl:col-span-1 inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md w-full">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit truncate ...">Type</div>
            <select v-model="yourCostType" class="border-0 font-bold p-5 outline-none w-full whitespace-nowrap focus:ring-transparent">
              <option value="hourly">Hourly Rate</option>
              <option value="fixed">Fixed Cost</option>
            </select>
          </label>
          <label class="inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit  truncate ...">
              <span v-if="yourCostType === 'hourly'">Hourly Rate</span>
              <span v-else>Fixed Cost</span>
            </div>
            <div class="flex flex-row gap-1 items-center">
              <span class="font-bold p-5 pr-0">$</span>
              <input type="number" placeholder="00" class="border-0 p-5 pl-0 font-bold outline-none w-full focus:ring-transparent" v-model.number="yourCost" @focus="$event.target.select()" />
            </div>
          </label>
          <label v-if="yourCostType === 'hourly'" class="inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit truncate ...">
              Duration
            </div>
            <div class="flex flex-row justify-between w-full gap-0 items-center">
              <input type="text" class="border-0 p-5 pr-2 font-bold outline-none w-full focus:ring-transparent" v-model.number="yourDuration" @focus="$event.target.select()" />
              <span class="font-bold p-5 pl-2">min</span>
            </div>
          </label>
        </div>
      </div>
      <div class="col-span-1 bg-white rounded-lg flex flex-col">
        <div class="border-b border-neutral-300 px-10 py-5 lg:p-10 flex flex-col md:flex-row gap-2 lg:gap-4 justify-between items-center md:items-end grow">
          <h2 class="text-3xl lg:text-5xl font-medium tracking-tight">Delegated Cost</h2>
          <span class="text-lg lg:text-4xl font-medium tracking-tight">${{ delegatedOpportunityCost }}</span>
        </div>
        <div class="p-10 grid md:grid-cols-2 2xl:grid-cols-3 gap-5 justify-stretch items-start">
          <label class="md:col-span-2 2xl:col-span-1 inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit truncate ...">Type</div>
            <select v-model="delegatedCostType" class="border-0 font-bold p-5 outline-none w-full whitespace-nowrap focus:ring-transparent">
              <option value="hourly">Hourly Rate</option>
              <option value="fixed">Fixed Cost</option>
            </select>
          </label>
          <label class="inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit truncate ...">
              <span v-if="delegatedCostType === 'hourly'">Hourly Rate</span>
              <span v-else>Fixed Cost</span>
            </div>
            <div class="flex flex-row gap-1 items-center">
              <span class="font-bold p-5 pr-0">$</span>
              <input type="number" placeholder="00" class="border-0 p-5 pl-0 font-bold outline-none w-full focus:ring-transparent" v-model.number="delegatedCost" @focus="$event.target.select()" />
            </div>
          </label>
          <label v-if="delegatedCostType === 'hourly'" class="inline-flex flex-row items-center border border-neutral-300 overflow-hidden rounded-md">
            <div class="p-5 border-r border-neutral-300 min-w-[100px] lg:min-w-fit truncate ...">
              Duration
            </div>
            <div class="flex flex-row justify-between w-full gap-0 items-center">
              <input type="text" class="border-0 p-5 pr-2 font-bold outline-none w-full focus:ring-transparent" v-model.number="delegatedDuration" @focus="$event.target.select()" />
              <span class="font-bold p-5 pl-2">min</span>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="sticky bottom-2.5 lg:relative lg:bottom-auto bg-neutral-800 p-5 lg:p-10 flex flex-row justify-center text-center rounded-lg self-end w-full">
      <p v-html="opportunityCostComparison" class="text-white text-base lg:text-2xl">
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
  import { useHead } from '#imports';

  useHead({
    htmlAttrs: {
      class: 'bg-neutral-100',
      lang: 'en'
    }
  });

  const yourCostType = ref("hourly");
  const yourCost = ref(0);
  const yourDuration = ref(0);
  const delegatedCostType = ref("hourly");
  const delegatedCost = ref(0);
  const delegatedDuration = ref(0);

  const yourOpportunityCost = computed(() => {
    if (yourCostType.value === "hourly") {
      const hourlyRateInMinutes = yourCost.value / 60;
      return (hourlyRateInMinutes * yourDuration.value).toFixed(2);
    } else {
      return yourCost.value.toFixed(2);
    }
  });

  const delegatedOpportunityCost = computed(() => {
    if (delegatedCostType.value === "hourly") {
      const hourlyRateInMinutes = delegatedCost.value / 60;
      return (hourlyRateInMinutes * delegatedDuration.value).toFixed(2);
    } else {
      return delegatedCost.value.toFixed(2);
    }
  });

  const opportunityCostComparison = computed(() => {
    const yourCostNum = parseFloat(yourOpportunityCost.value);
    const delegatedCostNum = parseFloat(delegatedOpportunityCost.value);

    // Safely checking if window is defined before accessing innerWidth
    const isNarrowScreen = typeof window !== 'undefined' && window.innerWidth < 420;

    if ((isNaN(delegatedCostNum) || delegatedCostNum <= 0) && isNarrowScreen) {
      return "Please scroll down and fill out the delegated cost to see the comparison.";
    } else if (isNaN(delegatedCostNum) || delegatedCostNum <= 0) {
      return "Please fill out the delegated cost fields to see the comparison.";
    } else if (yourCostNum < delegatedCostNum) {
      return `You'll <span class="text-red-400 font-bold">lose $${(delegatedCostNum - yourCostNum).toFixed(2)}</span> by delegating this task.`;
    } else if (yourCostNum > delegatedCostNum) {
      return `You'll <span class="text-green-400 font-bold">save $${(yourCostNum - delegatedCostNum).toFixed(2)}</span> by delegating this task.`;
    } else {
      return "There's no opportunity cost difference between delegating and doing the task yourself.";
    }
  });


  
  onMounted(() => {
    watch(delegatedCost, (newVal, oldVal) => {
      if (newVal === 0 || newVal === "0") {
        // Handle the default zero value
        const parsedDelegatedCost = 0;
        // Use the parsedDelegatedCost for further calculations
        // For example:
        const delegatedOpportunityCost = parsedDelegatedCost.toFixed(2);
      } else {
        const parsedDelegatedCost = parseFloat(newVal);
        if (!isNaN(parsedDelegatedCost)) {
          // Use the parsedDelegatedCost for further calculations
          // For example:
          const delegatedOpportunityCost = parsedDelegatedCost.toFixed(2);
        } else {
          // Handle the case where delegatedCost is not a valid number
          // For example, display an error message to the user
          console.error('Invalid delegated cost input');
        }
      }
    });
  });

</script>

<style>*{}</style>