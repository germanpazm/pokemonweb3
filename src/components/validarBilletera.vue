<script setup>
import { ref,onMounted} from "vue";
import { inject } from 'vue';
import { useStore } from 'vuex';



      let userAccount;
      const web3js = inject('web3js');
      const mostrarConexion=ref("No Conectado");
      const store = useStore();

    // Obtener referencia al botón de conectar y al botón de desconectar
  
    function comprobar(){
    // Comprobar si MetaMask está disponible
    if (typeof window.ethereum !== 'undefined') {
      // Usar el proveedor MetaMask
      //web3js = new Web3(window.ethereum);
  
      // Comprobar si el usuario ya está conectado
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          console.log("conectado1");
          // El usuario ya está conectado, actualizar el estado de la interfaz
          userAccount= accounts[0];
          nomostrarBotonBilletera();
          mostrarConexion.value="Conectado";
          hashbilletera.value=userAccount
          store.dispatch('updateUserAccount', userAccount);
        }
      });
    } else {
      // MetaMask no está disponible, mostrar un mensaje de error
      mostrarConexion.value="MetaMask no está disponible";
    }
  }
  
  
    // Función para conectar la billetera MetaMask
    function connectWallet() {
      // Solicitar al usuario que conecte su billetera MetaMask
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log("conectado2");
          userAccount= accounts[0];
        // Actualizar el estado de la interfaz
        nomostrarBotonBilletera();
        mostrarConexion.value="Conectado";
        hashbilletera.value=userAccount
        store.dispatch('updateUserAccount', userAccount);
      })
      .catch((error) => {
        // El usuario ha rechazado la conexión de la billetera MetaMask
        mostrarConexion.value= 'Error al conectar: ' + error.message;
      });
    }
  
    // Manejar el evento accountsChanged
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        // El usuario ha desconectado su billetera MetaMask, mostrar el botón de conectar de nuevo
        console.log("desconectado");
        mostrarBotonBilletera();
        userAccount=undefined
        mostrarConexion.value="No Conectado";
        store.dispatch('updateUserAccount', userAccount);
      } else {
        // El usuario ha conectado una nueva cuenta, actualizar el estado de la interfaz
          console.log("cambio de cuenta");
          nomostrarBotonBilletera();
        mostrarConexion.value="Conectado";
        userAccount= accounts[0];
        hashbilletera.value=userAccount
        store.dispatch('updateUserAccount', userAccount);


      }
    });

const hashbilletera=ref();
      const botonbilletera=ref(true)
function mostrarBotonBilletera(){
  botonbilletera.value=true;

}

function nomostrarBotonBilletera(){
  botonbilletera.value=false;
}

onMounted(() => {
  comprobar();
});
</script>   
  
  <template>
  <div>
  <p id="status">{{ mostrarConexion }}</p>
  <button @click="connectWallet()" v-if="botonbilletera">Conectar billetera</button>
  <p v-if="!botonbilletera">{{ hashbilletera }}</p>
  <p></p>

  </div>

  </template>

<style scoped>
img{
  width: 25%;
  padding-left: 220px;
}
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