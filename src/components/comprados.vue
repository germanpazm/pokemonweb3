<script setup>
import { ref, onMounted,inject} from "vue";
import servicioDatosPokemon from "../servicios/servicioPokemons";
import validar from "./validarBilletera.vue";
import { useStore } from 'vuex';
import axios from 'axios'


////
const web3js = inject('web3js');

const transactionesHashes = ref([]);
const store = useStore();
const web=inject('web');

///let pokemonTiempoReal=setInterval(obtenerPokemonID,1000);
function obtenerPokemonID(){
  
  const userAccount = store.getters.getUserAccount;

  if(userAccount!=undefined || userAccount!=null ){
    PokemonNombres2.value=[];
infoPokemonComprados.value=[];
    web.methods.obtenerPokemon(userAccount).call()
.then(obtenerPokemon);

 //transactionesHashes.value = store.getters.getTransactionHashes;
 //console.log(transactionesHashes.value);

  }
  else{
    estadopokemon.value=false;
  }


  }

let pokemonComprados= new Set();
let mostrarpokemonComprados=ref([])
const InsertarIDPokemon=ref()
function obtenerpokemonComprados(id) {
  console.log("hols");
  console.log(id);
  console.log(InsertarIDPokemon.value)
  console.log("aaa");
  console.log(PokemonNombres2)
;  const nombresArray = [...pokemonComprados];
  const pokemonPromises = PokemonNombres2.value.map(nombre => servicioDatosPokemon.get(nombre));

  return Promise.all(pokemonPromises)
    .then(pokemonsData => {
      mostrarpokemonComprados.value = pokemonsData.map(pokemon => ({
        id: pokemon.data.id,
        nombre: pokemon.data.name,
        imagen: pokemon.data.sprites.other['official-artwork'].front_default,
      }));

      console.log(mostrarpokemonComprados);
    })
    .catch(error => {
      console.error('Error al obtener los datos de los pokémones:', error);
    });
}

function recuperarHashes(){
  const userAccount = store.getters.getUserAccount;

web.methods.getUserTransactionHashes(userAccount).call()
.then((hashes) => {
    console.log('Hashes de transacciones del usuario:', hashes);
    transactionesHashes.value=hashes;

    obtenerInformacionTransacciones()
        .then((transactionInfo) => {
          console.log("hola");
          transactionInfoList.value = transactionInfo;
          console.log(transactionInfo)
          console.log('Información de transacciones:', transactionInfoList.value);
        })
        .catch((error) => {
          console.error('Error al obtener la información de transacciones:', error);
        });
    })
    .catch((error) => {
      console.error('Error al obtener los hashes de transacciones:', error);
    });
}

async function obtenerPokemonAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function obtenerHash(index) {
      const hashConcatenar= transactionesHashes.value[index];
      return "https://sepolia.etherscan.io/tx/"+hashConcatenar
    }
const PokemonNombres2=ref([]);
const infoPokemonComprados=ref([]);
const PokemonId=ref([]);
function obtenerPokemon(ids){
  PokemonId.value=ids;
  console.log(PokemonId)
   const userAccount = store.getters.getUserAccount;
  console.log(store.getters.getTransactionHashes);

  for (let id of ids){
    web.methods.pokemon(id).call()
    .then((result) => {
      console.log("joder")
      console.log(result);
      console.log("aa");
      console.log(PokemonId)
      console.log("sa");
      console.log(result.nombre);
      PokemonNombres2.value.push(result.nombre)
      console.log("joder2");
      console.log(PokemonNombres2)
      infoPokemonComprados.value.push({
          nombre: result.nombre,
          nivel: result.nivel,
          ataque: result.ataque,
          defensa:result.defensa,
          id:id
        });

        console.log(infoPokemonComprados);
    pokemonComprados.add(result.nombre)
    console.log(pokemonComprados)
    estadopokemon.value=true
    obtenerpokemonComprados(id);
})
.catch((error) => {
  console.error(error);
});
  
  }
}


const estadopokemon=ref(false);

let estadorealUIPokemon=setInterval(EstadoPokemonComprados,500)
const actualizar=ref();

/*function EstadoPokemonComprados(){
  const userAccount = store.getters.getUserAccount;

   actualizar.value=store.getters.getActualizar;
  console.log(actualizar.value);
  console.log(userAccount);
  if(userAccount===undefined || userAccount===null ){
    estadopokemon.value=false;

  }

  
  else if(actualizar.value===true ||  userAccount!= undefined){
    estadopokemon.value=true;
    obtenerPokemonID();
     actualizar.value=false;
     store.dispatch('updateActualizar',actualizar)

  }
  else if(actualizar.value===false){
     console.log("nada")
  }

}
*/

function EstadoPokemonComprados(){
  const userAccount = store.getters.getUserAccount;
  if(userAccount===undefined || userAccount===null ){
    //estadopokemon.value=false;
    obtenerPokemonID();
    console.log("entra");
    mostrarBoton.value=false;
  }
  else{
    mostrarBoton.value=true;
  }

}


const transactionInfoList = ref([]);
const etherscanApiKey="Q3IZF832FJK2IBAB59S2AF65U1GQJ25TX3"
function obtenerInformacionTransacciones() {
  const requests = transactionesHashes.value.map((hash) => {
    return new Promise((resolve, reject) => {
      const apiUrl = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apikey=${etherscanApiKey}`;
      axios.get(apiUrl)
        .then((response) => {
          const transactionInfo = response.data.result;
          resolve(transactionInfo);
        })
        .catch((error) => {
          console.error('Error al obtener la información de la transacción:', error);
          reject(error);
        });
    });
  });

  return Promise.all(requests);
}

function venderPokemon(id,precioVenta,pokemonNombre,ataque,defensa,nivel){
  const userAccount = store.getters.getUserAccount;
  let precio=precioVenta.toString();
  let enviar=web3js.utils.toWei(precio, 'ether')
  console.log(enviar);
web.methods.vender(id,enviar,pokemonNombre,ataque,defensa,nivel).send({
    from: userAccount
  })
  .then((result) => {
      console.log("realizado",result);
})
.catch((error) => {
  console.log("error",error)
});
}
//        <a :href="obtenerHash(index) ">enlace </a>

const precios = ref([]);
onMounted(() => {
});

const mostrarBoton=ref(false);

function subirNivel(pokemonId){
    const userAccount = store.getters.getUserAccount;

    web.methods.subirNivel(pokemonId).send({
    from: userAccount,
    value: web3js.utils.toWei('0.0005', 'ether') 
  })
  .then((result) => {
      console.log("realizado",result);
})
.catch((error) => {
  console.log("error",error)
});
}
</script>   

<template>
  <validar/>
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
                        <h1 class="mb-3">We Provide Best Tour Packages In Your Budget</h1>
                        <p>Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo</p>
                        <div class="row mb-4">
                            <div class="col-6">
                                <img class="img-fluid" src="../assets/pokemon2.jpeg" alt="">
                            </div>
                            <div class="col-6">
                                <img class="img-fluid" src="../assets/pokemon5.jpeg" alt="">
                            </div>
                        </div>
                        <a href="" class="btn btn-primary mt-1">Book Now</a>
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
                            <h5 class="">Competitive Pricing</h5>
                            <p class="m-0">Magna sit magna dolor duo dolor labore rebum amet elitr est diam sea</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex mb-4 mb-lg-0">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3" style="height: 100px; width: 100px;">
                            <i class="fa fa-2x fa-award text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="">Best Services</h5>
                            <p class="m-0">Magna sit magna dolor duo dolor labore rebum amet elitr est diam sea</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex mb-4 mb-lg-0">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3" style="height: 100px; width: 100px;">
                            <i class="fa fa-2x fa-globe text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="">Worldwide Coverage</h5>
                            <p class="m-0">Magna sit magna dolor duo dolor labore rebum amet elitr est diam sea</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Feature End -->


    
    <button v-if="mostrarBoton" @click="obtenerPokemonID(),recuperarHashes()">MostrarPOkemon</button>
   
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
                                   <button class="btn btn-sm btn-light ml-2"><i class="fa fa-bars"></i></button>
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
                       
                       <div v-for="(pokemon, index) in mostrarpokemonComprados" :key="index" class="col-lg-4 col-md-6 col-sm-6 pb-1">
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
                                       <p>Id: {{ infoPokemonComprados[index].id }}</p>
                                       <p>Nivel: {{ infoPokemonComprados[index].nivel }}</p>
                                       <p>Ataque: {{ infoPokemonComprados[index].ataque }}</p>
                                       <p>Defensa: {{ infoPokemonComprados[index].defensa }}</p>
                                       
                                   </div>
                                                                   <div class="d-flex align-items-center justify-content-center mt-2">
                                       <input v-model="precios[index]">
   
   
                 
                                       
                                   </div>
   
                                   <div class="d-flex align-items-center justify-content-center mb-1">
                                    <button @click="venderPokemon(infoPokemonComprados[index].id,precios[index],pokemon.nombre,infoPokemonComprados[index].ataque,infoPokemonComprados[index].defensa,infoPokemonComprados[index].nivel)">VenderPokemon</button>
                                    <button @click="subirNivel(infoPokemonComprados[index].id)">Subir Nivel</button>

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