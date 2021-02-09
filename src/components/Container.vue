<template>
  <div
    class="w-screen h-screen p-10 bg-gray-100 bg-background bg-cover bg-no-repeat bg-top"
  >
    <div
      class="max-w-screen-xl w-full h-full m-auto overflow-hidden rounded-4xl p-10 bg-white bg-opacity-30 border border-white border-opacity-60"
    >
      <div
        class="w-full h-full bg-white rounded-4xl shadow-container flex flex-col overflow-hidden transform"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
