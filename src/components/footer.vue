<script>
import { RouterLink } from 'vue-router';

</script>
<template>
      <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <h5 class="text-secondary text-uppercase mb-4">Explora</h5>
                <p class="mb-4">Explora, crea y conecta en el mundo digital descentralizado de la web3
                    Abraza la libertad y la transparencia de la web3: un futuro digital sin límites
                </p>
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>Santa Irene, Madrid, Espana</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>pokemonweb3@gmail.com</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+912 345 678</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Compra</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <RouterLink class="text-secondary mb-2" to="/comprar"><i class="fa fa-angle-right mr-2"></i>Inicio </RouterLink>

                            <RouterLink class="text-secondary mb-2" to="/comprar"><i class="fa fa-angle-right mr-2"></i>Comprar </RouterLink>

                            <RouterLink class="text-secondary mb-2" to="/comprados"><i class="fa fa-angle-right mr-2"></i>Tus Pokemons </RouterLink>

                            <RouterLink class="text-secondary mb-2" to="/historial"><i class="fa fa-angle-right mr-2"></i>Historial de Compras</RouterLink>

                            <RouterLink class="text-secondary mb-2" to="/vender"><i class="fa fa-angle-right mr-2"></i>Vender</RouterLink>

                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Mi Cuenta</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <RouterLink class="text-secondary mb-2" to="/comprar"><i class="fa fa-angle-right mr-2"></i>Inicio </RouterLink>

<RouterLink class="text-secondary mb-2" to="/comprar"><i class="fa fa-angle-right mr-2"></i>Comprar </RouterLink>

<RouterLink class="text-secondary mb-2" to="/comprados"><i class="fa fa-angle-right mr-2"></i>Tus Pokemons </RouterLink>

<RouterLink class="text-secondary mb-2" to="/historial"><i class="fa fa-angle-right mr-2"></i>Historial de Compras</RouterLink>

<RouterLink class="text-secondary mb-2" to="/vender"><i class="fa fa-angle-right mr-2"></i>Vender</RouterLink>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                        <p>Si quieres recibir mas informacion de este proyecto facilitanos un correo electrónico</p>
                        <form action="">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Tu correo Electrónico">
                                <div class="input-group-append">
                                    <button class="btn btn-primary">Enviar</button>
                                </div>
                            </div>
                        </form>
                        <h6 class="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div class="d-flex">
                            <a class="btn btn-primary btn-square mr-2" href="https://twitter.com/ethereum"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-primary btn-square mr-2" href="https://www.facebook.com/ethereumproject/?locale=es_ES"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-primary btn-square mr-2" href="https://www.linkedin.com/company/ethereum"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top mx-xl-5 py-4" style="border-color: rgba(256, 256, 256, .1) !important;">
           
        </div>
    </div>
</template>

<style>


</style>