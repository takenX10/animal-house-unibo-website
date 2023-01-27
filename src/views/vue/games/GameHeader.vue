
<script setup>
  import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  } from 'mdb-vue-ui-kit';
</script>

<script>
import { check_login, raw_logout } from "@/context/utils.jsx";

  export default {
    components: {
    },
    data() {
       return { 
         logged: false,
         collapse1: false,
         dropdown1: false
       }
    },
    created(){
        this.verify_login();
    },
    methods: {
      verify_login: async function () {
        this.logged = await check_login()
      }
    }
  };
</script>

<template>
<MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="/games">AnimalHouse - Games</MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent" >
      <MDBNavbarNav class="w-100 mb-2 mb-lg-0 justify-content-end" >
        <MDBNavbarItem >
          <!-- Navbar dropdown -->
          <MDBDropdown class="nav-item" v-model="dropdown1">
            <a @click="dropdown1 = !dropdown1" tabindex="0" href="#" role="button" type="button" class="dropdown-toggle nav-link">Services</a>
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="/comunita" tabindex="0">Community</MDBDropdownItem>
              <MDBDropdownItem href="/services/facetoface">Face to Face</MDBDropdownItem>
              <MDBDropdownItem href="/services/online">Online</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
        <MDBNavbarItem href="/shop" >
        Shop
        </MDBNavbarItem>
        <MDBNavbarItem to="/games">
          Games 
        </MDBNavbarItem>
        <MDBNavbarItem v-if="!logged" href="/backoffice/login" >
          Login 
        </MDBNavbarItem>
        <MDBNavbarItem v-if="logged" href="#" role="button" @onclick="raw_logout()" >
          Logout 
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>
