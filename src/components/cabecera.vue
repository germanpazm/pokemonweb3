<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    "titulo":String,
    "links":Array,
})
</script>   

<template>
    <div class="container-fluid">
        <div class="row bg-secondary py-1 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
                <div class="d-inline-flex align-items-center h-100">
                    <a class="text-body mr-4" href="https://metamask.io/faqs/"> FAQS Metamask</a>
                    <a class="text-body mr-4" href="https://docs.soliditylang.org/en/v0.4.24/frequently-asked-questions.html">Solidity</a>
                    <a class="text-body mr-4" href="https://web3js.readthedocs.io/en/v1.10.0/">Web3js</a>
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                   
                    <div class="btn-group mx-2">
                        <button type="button" class="btn btn-sm btn-light" onclick="window.location.href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es'">Extension Metamask</button>
                        
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-light" onclick="window.location.href='https://metamask.io/download/'">Descargar Metamask</button>
                       
                    </div>
                </div>
                <div class="d-inline-flex align-items-center d-block d-lg-none">
                    <a href="" class="btn px-0 ml-2">
                        <i class="fas fa-heart text-dark"></i>
                        <span class="badge text-dark border border-dark rounded-circle" style="padding-bottom: 2px;">0</span>
                    </a>
                    <a href="" class="btn px-0 ml-2">
                        <i class="fas fa-shopping-cart text-dark"></i>
                        <span class="badge text-dark border border-dark rounded-circle" style="padding-bottom: 2px;">0</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div class="col-lg-4">
                <a href="" class="text-decoration-none">
                    <span class="h1 text-uppercase text-primary bg-dark px-2">Poke</span>
                    <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                </a>
            </div>
            <div class="col-lg-4 col-6 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-4 col-6 text-right">
                <p class="m-0">Atencion al Cliente</p>
                <h5 class="m-0">912 345 678</h5>
            </div>
        </div>
    </div>
    <!-- Topbar End -->


    <!-- Navbar Start -->
    <div class="container-fluid bg-dark mb-30">
        <div class="row px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; padding: 0 30px;">
                    <h6 class="text-dark m-0"><i class="fa fa-bars mr-2"></i>Pokemons</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style="width: calc(100% - 30px); z-index: 999;">
                    <div class="navbar-nav w-100">
                        <RouterLink class="nav-item nav-link" to="/comprar">Bulbasur </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Ivysaur</RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Venusaur </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Charmander </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Charmeleon </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Charizard </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Squirtle</RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Wartotle </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Blastoise </RouterLink>
                        <RouterLink class="nav-item nav-link" to="/comprar">Caterpie </RouterLink>

                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <span class="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
    <div class="navbar-nav mr-auto py-0">
        <RouterLink
            v-for="enlace in props.links"
            :key="enlace"
            :to="{ name: enlace }"
            class="nav-item nav-link"
            :class="{ active: enlace === 'Home' }"
        >
            {{ enlace }}
        </RouterLink>
        <div class="nav-item dropdown"> 
            <div class="dropdown-menu bg-primary rounded-0 border-0 m-0">
                <RouterLink to="cart.html" class="dropdown-item">Shopping Cart</RouterLink>
                <RouterLink to="checkout.html" class="dropdown-item">Checkout</RouterLink>
            </div>
        </div>
        <RouterLink to="contact.html" class="nav-item nav-link">Contact</RouterLink>
    </div>
    <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
        <a href="" class="btn px-0">
            <i class="fas fa-heart text-primary"></i>
            <span class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
        </a>
        
    </div>
</div>

                </nav>
            </div>
        </div>
    </div>
    <!-- Navbar End 
    <span>{{props.titulo}}</span>
    <nav>
        <RouterLink
         v-for="enlace in props.links"
         :key="enlace"
         :to="{ name: enlace }">
            {{ enlace }} ---
        </RouterLink>        
    </nav>
-->
</template>
<style scoped> 

</style>