import { createRouter, createWebHistory } from "vue-router";
import paginaInicio from "@/paginas/paginaInicio.vue";
import paginaListar from "@/paginas/paginaListar.vue";
import autor from "@/paginas/autor.vue";
import historialCompras from "@/paginas/historialCompras.vue"
import vender from "@/paginas/paginaVender.vue"


const router = createRouter({
    history: createWebHistory (import.meta.env.BASE_URL),
    routes: [
        //Públicas
        {   path: '/', 
            name:'Inicio',
            component: paginaInicio
        },  
        {   path: '/comprar', 
            name:'Comprar',
            component: paginaListar
        },   
        {   path: '/comprados', 
            name:'Tus Pokemons',
            component: autor
        },    
        {
            path: '/historial', 
            name:'Historial de Compras',
            component: historialCompras
        },
        {
            path: '/vender', 
            name:'En Venta',
            component:vender
        },
 

        //Si se produce un error
        {
            path: '/:pathMatch(.*)*',
            redirect:() => ({ name:'inicio'})
        }
    ]

});

export default router;