<script setup>
// import cabecera from './components/cabecera.vue'
// import cuerpo from './components/cuerpo.vue'
import barramenu  from './components/cabecera.vue'
import baja from './components/footer.vue'

</script>

<template>
  <header>
    <barramenu titulo="" :links="['Inicio','Comprar','Tus Pokemons','Historial de Compras','En Venta']"/>

    

    <!-- <cabecera titulo="Aplicacion" contenido="Esta web es desarrollado por" /> -->
 </header>
  <hr>

  <main>
    <!-- <cuerpo /> -->
    <RouterView />
  </main>
  <footer>
    <baja/>
  </footer>


</template>

<style scoped>  
</style>

