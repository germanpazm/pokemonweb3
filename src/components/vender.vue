<script setup>
import { ref, onMounted, resolveDirective } from "vue";
import { inject } from 'vue';
import { useStore } from 'vuex';
import validar from "./validarBilletera.vue";
import servicioDatosPokemon from "../servicios/servicioPokemons";
import axios from 'axios'

let userAccount;
const web3js = inject('web3js');
const web = inject('web');
const mostrarpokemonEnVenta = ref([]);
const store = useStore();
const consultar=ref(false)


function mostrarPokemonEnVenta(id) {
  const nombresPokemonEnVenta = pokemonEnVenta.value.map(pokemon => pokemon.pokemonNombre);
  const pokemonPromises = nombresPokemonEnVenta.map(nombre => servicioDatosPokemon.get(nombre));

  Promise.all(pokemonPromises)
    .then(pokemonsData => {
      mostrarpokemonEnVenta.value = pokemonsData.map(pokemon => ({
        id: pokemon.data.id,
        nombre: pokemon.data.name,
        imagen: pokemon.data.sprites.other['official-artwork'].front_default,
      }));
      console.log("Hola");
      console.log(mostrarpokemonEnVenta);
    })
    .catch(error => {
      console.error('Error al obtener los datos de los pokémones en venta:', error);
    });
}
const estadopokemon=ref(false);

function obtenerPokemonsEnVentaId() {
  if (consultar.value) {
    return;
  }
  consultar.value = true;

  const userAccount = store.getters.getUserAccount;
  if(userAccount!=undefined || userAccount!=null ){
    
  web.methods.obtenerPokemonEnVenta().call()
    .then(obtenerPokemonEnVenta);
  }
  else{
    estadopokemon.value=false;
  }
  setTimeout(() => {
    consultar.value = false;
  }, 2000);

}

const ID = ref([]);
const pokemonEnVenta = ref([]);
const PokemonId = ref([]);

function obtenerPokemonEnVenta(ids) {
  console.log("anuj")
  console.log(ids);
  PokemonId.value = ids;
  pokemonEnVenta.value = []; // Reiniciar el arreglo antes de agregar nuevos pokémon

  for (let id of ids) {
    web.methods.pokemonvender(id).call()
      .then((result) => {
        console.log(result);
        console.log("logitud" + ID.value.length)
        if (result.pokemonNombre !== "") {
          pokemonEnVenta.value.push({
            id: result.id,
            precioventa: result.precioventa,
            actualpropietario: result.actualpropietario,
            pokemonNombre: result.pokemonNombre,
            nivel: result.nivel,
            ataque: result.ataque,
            defensa: result.defensa
          });


          ID.value.push(id)
          console.log("HOls");
          console.log(ID);
          console.log(ID.value.length)

          console.log("jocsd")
          console.log(pokemonEnVenta)
          estadopokemon.value=true

          mostrarPokemonEnVenta(id)
        } else {
          console.log("entra");
          mostrarPokemonEnVenta(id)

        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
}

function comprarPokemonVenta(IdPokemon, precioVenta, antiguoPropietario) {
  const userAccount = store.getters.getUserAccount;

  web.methods.Transferir(IdPokemon, precioVenta, antiguoPropietario).send({
      from: userAccount,
      value: precioVenta
    })
    .then((result) => {
      console.log("TransferenciaRealizada" + result);
    })
    .catch((error) => {
      console.error(error);
    });
}


let estadorealUIPokemon=setInterval(EstadoPokemonComprados,500)
function EstadoPokemonComprados(){
  const userAccount = store.getters.getUserAccount;
  if(userAccount===undefined || userAccount===null ){
    //estadopokemon.value=false;
    obtenerPokemonsEnVentaId();
    console.log("entra");
    mostrarBoton.value=false;
  }
  else{
    mostrarBoton.value=true;
  }

}
const mostrarBoton=ref(false);

</script>

<template>
  <validar />
  <div>
     <!-- About Start -->
     <div class="container-fluid py-5">
        <div class="container pt-5">
            <div class="row">
                <div class="col-lg-6" style="min-height: 500px;">
                    <div class="position-relative h-100">
                        <img class="position-absolute w-100 h-100" src="../assets/pokemon6.jpeg" style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-lg-6 pt-5 pb-lg-5">
                    <div class="about-text bg-white p-4 p-lg-5 my-lg-5">
                        <h6 class="text-primary text-uppercase" style="letter-spacing: 5px;">About Us</h6>
                        <h1 class="mb-3">Mercado Pokémon ¡Descubre y adquiere Pokémon únicos de otros entrenadores!</h1>
                        <p>Bienvenido al Mercado Pokémon, el lugar donde los entrenadores se reúnen para comprar y vender Pokémon entre sí. Aquí encontrarás una emocionante selección de Pokémon únicos y especiales puestos a la venta por otros usuarios como tú</p>
                        <div class="row mb-4">
                            <div class="col-6">
                                <img class="img-fluid" src="../assets/pokemon2.jpeg" alt="">
                            </div>
                            <div class="col-6">
                                <img class="img-fluid" src="../assets/pokemon5.jpeg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->


    <!-- Feature Start -->
    <div class="container-fluid pb-5">
        <div class="container pb-5">
            <div class="row">
                <div class="col-md-4">
                    <div class="d-flex mb-4 mb-lg-0">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3" style="height: 100px; width: 100px;">
                            <i class="fa fa-2x fa-money-check-alt text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="">Precios Competitivos</h5>
                            <p class="m-0">Los mejores pokemons en cuestion de calidad precio</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex mb-4 mb-lg-0">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3" style="height: 100px; width: 100px;">
                            <i class="fa fa-2x fa-award text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="">Mejores Servicios</h5>
                            <p class="m-0"> Nuestro equipo de expertos en Pokémon estará encantado de brindarte asistencia </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex mb-4 mb-lg-0">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3" style="height: 100px; width: 100px;">
                            <i class="fa fa-2x fa-globe text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="">Totalmente disponible</h5>
                            <p class="m-0">Podrás comprar tus pokemons desde cualquier parte del mundo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Feature End -->

    
    <button v-if="mostrarBoton" @click="obtenerPokemonsEnVentaId()">Obtener Pokemons en Venta</button>
  
     
         <div v-if="estadopokemon" class="container-fluid">
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
                                    <button type="button" class="btn btn-sm btn-light " onclick="window.location.href='https://support.metamask.io/hc/es/articles/4410741657499-Gu%C3%ADa-Pr%C3%A1ctica-Transacciones'">Guia Transacciones</button>
                                  
                                </div>
                                <div class="btn-group ml-2">
                                    <button type="button" class="btn btn-sm btn-light " onclick="window.location.href='https://support.metamask.io/hc/es/articles/360015489251-C%C3%B3mo-acelerar-o-cancelar-una-transacci%C3%B3n-pendiente'">Acelerar Transacciones</button>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                         
                         <div v-for="(pokemon, index) in mostrarpokemonEnVenta" :key="index" class="col-lg-4 col-md-6 col-sm-6 pb-1">
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
                                     <a class="h2 text-decoration-none text-truncate" href="">{{ pokemon.nombre }}</a>
                                     <div class="h2 d-flex align-items-center justify-content-center mt-2 ml-2">
                                         <p>Id {{ pokemonEnVenta[index]?.id }}</p>
                                         <p>Nivel {{ pokemonEnVenta[index]?.nivel }}</p>
                                         <p>Ataque {{ pokemonEnVenta[index]?.ataque }}</p>
                                         <p>Defensa {{ pokemonEnVenta[index]?.defensa }}</p>
                                         
                                     </div>
                                     <div class="h4 d-flex align-items-center justify-content-center mt-2">
                                        <p>Precio Venta:{{ parseInt(pokemonEnVenta[index]?.precioventa) / 10**18 }} ETH</p>
                                </div>
                                    
                      
                                     <div class="d-flex align-items-center justify-content-center mb-1">
        <button @click="comprarPokemonVenta(pokemonEnVenta[index]?.id, pokemonEnVenta[index]?.precioventa, pokemonEnVenta[index]?.actualpropietario)">Comprar Pokemon</button>
  
                                     </div>
                                 </div>
                             </div>
                         </div> 
                         <div class="col-12">
                             <nav>
                               <ul class="pagination justify-content-center">
                                 <li class="page-item disabled"><a class="page-link" href="#"></a></li>
                                 <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                 <li class="page-item"><a class="page-link" href="#">2</a></li>
                                 <li class="page-item"><a class="page-link" href="#">3</a></li>
                                 <li class="page-item"><a class="page-link" href="#">Next</a></li>
                               </ul>
                             </nav>
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


ul {
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

button:hover {
  background-color: #8bb8a9;
  cursor: pointer;
}

li {
  list-style: none;
}

p {
  text-align: center;
}

button {
  display: block;
  margin: 0 auto;
  text-align: center;
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

button:hover {
  background-color: #8bb8a9;
  cursor: pointer;
}

#comprar,
#comprar2 {
  display: none;
}
</style>
