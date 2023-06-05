<script setup>
import validar from "./validarBilletera.vue";
import { ref, onMounted, inject } from "vue";
import { useStore } from 'vuex';
import axios from 'axios';

const transactionesHashes = ref([]);
const store = useStore();
const web = inject('web');

const recuperandoHashes = ref(false);
const etherscanApiKey = "Q3IZF832FJK2IBAB59S2AF65U1GQJ25TX3";
const transactionInfoList = ref([]);

function recuperarHashes() {
  if (recuperandoHashes.value) {
    return;
  }

  recuperandoHashes.value = true;

  const userAccount = store.getters.getUserAccount;

  if (userAccount !== undefined && userAccount !== null) {
    web.methods.getUserTransactionHashes(userAccount).call()
      .then((hashes) => {
        console.log('Hashes de transacciones del usuario:', hashes);
        transactionesHashes.value = hashes;

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
  else {
    transactionInfoList.value = "";
  }

  setTimeout(() => {
    recuperandoHashes.value = false;
  }, 3000);
}

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

let estadorealUIPokemon = setInterval(EstadoPokemonComprados, 500);

function EstadoPokemonComprados() {
  const userAccount = store.getters.getUserAccount;
  if (userAccount === undefined || userAccount === null) {
    recuperarHashes();
    console.log("entra");
  }
}

function obtenerHash(index) {
  const hashConcatenar = transactionesHashes.value[index];
  return "https://sepolia.etherscan.io/tx/" + hashConcatenar;
}

</script>

<template>
  <validar/>
  <button @click="recuperarHashes()">Mostrar</button>
  <table>
    <thead>
      <tr>
        <th>Hash Transacción</th>
        <th>Remitente</th>
        <th>Destinatario</th>
        <th>Gas utilizado</th>
        <th>Número de bloque</th>
        <th>Estado de la transacción</th>
        <th>Más Informacion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(transaction, index) in transactionInfoList" :key="index">
        <td>{{ transactionesHashes[index] }}</td>
        <td>{{ transaction.from }}</td>
        <td>{{ transaction.to }}</td>
        <td>{{ parseInt(transaction.gasUsed,16) }} WEI</td>
        <td>{{ transaction.blockNumber }}</td>
        <td>{{ parseInt(transaction.status, 16) === 1 ? 'Exitosa' : 'Fallida' }}</td>
        <td><a :href="'https://sepolia.etherscan.io/tx/' + transactionesHashes[index]">Enlace</a></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

/* Estilos para dispositivos móviles y tablets */
@media only screen and (max-width: 768px) {
  table {
    font-size: 14px;
  }

  th, td {
    padding: 8px;
  }

  th {
    font-size: 16px;
  }
}
</style>
