<script setup>
import { ref, onMounted,inject} from "vue";
import servicioDatosPokemon from "../servicios/servicioPokemons";
import validarBilletera from "./validarBilletera.vue";
import { useStore } from 'vuex';
let listanumeros = [];
let pokemons = ref([]);
const web3js = inject('web3js');
console.log(web3js);
const web=inject('web');
const store = useStore();
const actualizar=ref(false);
store.dispatch('updateActualizar',actualizar)
const transaccionesHashes = ref();
function obtenerProductos() {
  servicioDatosPokemon.getAll()
    .then(async response => {
      const pokemonPromises = response.data.results.map(pokemon => obtenerPokemonAPI(pokemon.url));
      const pokemonsData = await Promise.all(pokemonPromises);
      pokemons.value = pokemonsData.map(pokemon => ({
        id: pokemon.id,
        nombre: pokemon.name,
        imagen: pokemon.sprites.other['official-artwork'].front_default
      }));
    })
    .catch(error => {
      console.log(error);
    });
}

async function obtenerPokemonAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
const max = 100;
const min=80;
function comprarpokemon(nombre) {
  const userAccount = store.getters.getUserAccount;
  
  let random1 = Math.floor(Math.random() * (max - min + 1)) + min;
  let random2=Math.floor(Math.random() * (max - min + 1)) + min;
 
  web.methods.anadirpokemon(nombre,random1,random2).send({
    from: userAccount,
    value: web3js.utils.toWei('0.001', 'ether')
  })
    .then((result) => {
      console.log(result)
      actualizar.value=true;
    store.dispatch('updateActualizar',actualizar)
      console.log("Compra Realizada");
      store.dispatch('addTransactionHash',result.transactionHash)
      transaccionesHashes.value=result.transaccionesHashes
      hashes(result.transactionHash);
      //transactionesHashes.value.push(result.transactionHash); 
       //console.log(transactionesHashes.value);
       console.log( store.getters.getTransactionHashes);


    })
    .catch((error) => {
      console.error(error);
    });
}

function hashes(hash){
  const userAccount = store.getters.getUserAccount;

  web.methods.logTransaction(hash).send({
  from: userAccount,
})
.then((result) => {
      console.log('Transacción guardada correctamente:', result);
      // Aquí puedes realizar cualquier acción adicional después de guardar el hash de la transacción
      recuperarHashes(userAccount);


    })
    .catch((error) => {
      console.error('Error al guardar la transacción:', error);
      // Aquí puedes manejar cualquier error que ocurra durante la transacción
    });

}
function recuperarHashes(user){
web.methods.getUserTransactionHashes(user).call()
.then((hashes) => {
    console.log('Hashes de transacciones del usuario:', hashes);
    // Utiliza los hashes de transacciones obtenidos
  })
  .catch((error) => {
    console.error('Error al obtener los hashes de transacciones:', error);
    // Maneja cualquier error que ocurra durante la llamada
  });
}

onMounted(() => {
  obtenerProductos();
});
</script>

<template>
  <div>
    <validar-billetera />
    

    <!-- Shop Start -->
    <div class="container-fluid">
        <div class="row px-xl-5">
            <!-- Shop Sidebar Start -->
            <div class="col-lg-3 col-md-4">
                <!-- Price Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filter by price</span></h5>
                <div class="bg-light p-4 mb-30">
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="price-all">
                            <label class="custom-control-label" for="price-all">All Price</label>
                            <span class="badge border font-weight-normal">1000</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-1">
                            <label class="custom-control-label" for="price-1">$0 - $100</label>
                            <span class="badge border font-weight-normal">150</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-2">
                            <label class="custom-control-label" for="price-2">$100 - $200</label>
                            <span class="badge border font-weight-normal">295</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-3">
                            <label class="custom-control-label" for="price-3">$200 - $300</label>
                            <span class="badge border font-weight-normal">246</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-4">
                            <label class="custom-control-label" for="price-4">$300 - $400</label>
                            <span class="badge border font-weight-normal">145</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="price-5">
                            <label class="custom-control-label" for="price-5">$400 - $500</label>
                            <span class="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>
                <!-- Price End -->
                
                <!-- Color Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filter by color</span></h5>
                <div class="bg-light p-4 mb-30">
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="color-all">
                            <label class="custom-control-label" for="price-all">All Color</label>
                            <span class="badge border font-weight-normal">1000</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-1">
                            <label class="custom-control-label" for="color-1">Black</label>
                            <span class="badge border font-weight-normal">150</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-2">
                            <label class="custom-control-label" for="color-2">White</label>
                            <span class="badge border font-weight-normal">295</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-3">
                            <label class="custom-control-label" for="color-3">Red</label>
                            <span class="badge border font-weight-normal">246</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-4">
                            <label class="custom-control-label" for="color-4">Blue</label>
                            <span class="badge border font-weight-normal">145</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="color-5">
                            <label class="custom-control-label" for="color-5">Green</label>
                            <span class="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>
                <!-- Color End -->

                <!-- Size Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filter by size</span></h5>
                <div class="bg-light p-4 mb-30">
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="size-all">
                            <label class="custom-control-label" for="size-all">All Size</label>
                            <span class="badge border font-weight-normal">1000</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-1">
                            <label class="custom-control-label" for="size-1">XS</label>
                            <span class="badge border font-weight-normal">150</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-2">
                            <label class="custom-control-label" for="size-2">S</label>
                            <span class="badge border font-weight-normal">295</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-3">
                            <label class="custom-control-label" for="size-3">M</label>
                            <span class="badge border font-weight-normal">246</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="size-4">
                            <label class="custom-control-label" for="size-4">L</label>
                            <span class="badge border font-weight-normal">145</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="size-5">
                            <label class="custom-control-label" for="size-5">XL</label>
                            <span class="badge border font-weight-normal">168</span>
                        </div>
                    </form>
                </div>
                <!-- Size End -->
            </div>
            <!-- Shop Sidebar End -->


            <!-- Shop Product Start -->
            <div class="col-lg-9 col-md-8">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div>
                                <button class="btn btn-sm btn-light"><i class="fa fa-th-large"></i></button>
                            </div>
                            <div class="ml-2">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">Latest</a>
                                        <a class="dropdown-item" href="#">Popularity</a>
                                        <a class="dropdown-item" href="#">Best Rating</a>
                                    </div>
                                </div>
                                <div class="btn-group ml-2">
                                    <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">10</a>
                                        <a class="dropdown-item" href="#">20</a>
                                        <a class="dropdown-item" href="#">30</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(pokemon, index) in pokemons" :key="index" class="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" :src="pokemon.imagen" alt="">
                                <div class="product-action">
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate" href="">{{ pokemon.nombre }}</a>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    <h5>0.001 ETH</h5><h6 class="text-muted ml-2"><del>0.002 ETH</del></h6>
                                </div>
                                <div class="d-flex align-items-center justify-content-center mb-1">
                                                                        <button @click="comprarpokemon(pokemon.nombre)">Comprar Pokemon</button>

                                </div>
                            </div>
                        </div>
                    </div>
               
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
    <!-- Shop End -->

  </div>
</template>


<style scoped>

ul{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #a7d7c5;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

button:hover{
  background-color: #8bb8a9;
  cursor: pointer;
}
li {
  list-style: none;
}
p{
    text-align: center;
}
button {
  display: block;
  margin: 0 auto;
  text-align: center;  padding: 10px 20px;
  background-color: #a7d7c5;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

button:hover{
  background-color: #8bb8a9;
  cursor: pointer;
}
#comprar,#comprar2{
    display: none;
}




</style>