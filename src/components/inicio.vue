<script setup>
import { ref, onMounted, resolveDirective } from "vue";
import { inject } from 'vue';
import { useStore } from 'vuex';
import validar from "./validarBilletera.vue";
import servicioDatosPokemon from "../servicios/servicioPokemons";
import axios from 'axios'
import { RouterLink } from 'vue-router';


</script>

<template>


    <!-- Carousel Start -->
    <div class="container-fluid mb-3">
        <div class="row px-xl-5">
            <div class="col-lg-8">
                <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#header-carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#header-carousel" data-slide-to="1"></li>
                        <li data-target="#header-carousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item position-relative active" style="height: 480px;">
                            <img class="position-absolute w-100 h-100" src="../assets/pokemon23.jpg" style="object-fit: cover;">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Compra Tus Pokemon</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                    <RouterLink class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="/comprar">Compra Ahora</RouterLink>

                                </div>
                            </div>
                        </div>
                        <div class="carousel-item position-relative" style="height: 480px;">
                            <img class="position-absolute w-100 h-100"  src="../assets/pokemon25.jpeg" style="object-fit: cover;">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown" >Visualiza Tus Pokemons</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                    <RouterLink class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="/comprados">Tus Pokemons</RouterLink>

                                </div>
                            </div>
                        </div>
                        <div class="carousel-item position-relative" style="height: 480px;">
                            <img class="position-absolute w-100 h-100" src="../assets/pokemon15.webp" style="object-fit: cover;">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Tu Historial de Transacciones</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                    <RouterLink class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="/historial">Historial</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="product-offer mb-30" style="height: 225px;">
                    <img class="img-fluid" src="../assets/pokemon20.jpg" alt="">
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <RouterLink class="btn btn-primary" to="/comprar">Comprar</RouterLink>

                    </div>
                </div>
                <div class="product-offer mb-30" style="height: 225px;">
                    <img class="img-fluid" src="../assets/pokemon33.jpg" alt="">
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <RouterLink class="btn btn-primary" to="/comprar">Comprar</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Carousel End -->


    <!-- Featured Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                    <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Producto de Calidad</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                    <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 class="font-weight-semi-bold m-0">Transacciones Rápidas</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                    <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Ventas entre Usuarios</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style="padding: 30px;">
                    <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Soporte Rápido</h5>
                </div>
            </div>
        </div>
    </div>
    <!-- Featured End -->


  

   

    <!-- Offer Start -->
    <div class="container-fluid pt-5 pb-3">
        <div class="row px-xl-5">
            <div class="col-md-6">
                <div class="product-offer mb-30" style="height: 400px;">
                    <img class="img-fluid" src="../assets/pokemon34.jpg" alt="">
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <a href="" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-offer mb-30" style="height: 400px;">
                    <img class="img-fluid" src="../assets/pokemon32.jpg" alt="">
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        <a href="" class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Offer End -->



    <!-- Vendor Start -->
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col">
                <div class="owl-carousel vendor-carousel">
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                    <div class="bg-light p-4">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Vendor End -->

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
