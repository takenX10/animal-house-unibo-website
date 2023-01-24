

<script>
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
    MDBDropdownItem
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  export default {
    components: {
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
      MDBDropdownItem
    },
    setup() {
      const collapse1 = ref(false);
      const dropdown1 = ref(false);
      return {
        collapse1,
        dropdown1
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
        <MDBNavbarItem>
          <!-- Navbar dropdown -->
          <MDBDropdown class="nav-item" v-model="dropdown1">
            <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown1 = !dropdown1"
              >Services</MDBDropdownToggle
            >
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="/comunita">Community</MDBDropdownItem>
              <MDBDropdownItem href="/services/facetoface">Offline</MDBDropdownItem>
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
        <MDBNavbarItem href="/backoffice/login" >
          Login 
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>
