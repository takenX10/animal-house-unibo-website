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
} from "mdb-vue-ui-kit";
</script>

<script>
import { check_login, raw_logout } from "@/context/utils.jsx";

export default {
  components: {},
  data() {
    return {
      logged: false,
      collapse1: false,
      dropdown1: false,
    };
  },
  created() {
    this.verify_login();
  },
  methods: {
    verify_login: async function () {
      this.logged = await check_login();
    },
  },
};
</script>

<style>
@import "@/assets/css/game_selection/style.css";
</style>

<template>
  <MDBNavbar expand="lg" class="game-nav" bg="#642afb" container>
    <MDBNavbarBrand href="/">
        <img src="/assets/logo.png" alt="" height="80" class="" />
        <b class="my-auto"> - Games</b>
    </MDBNavbarBrand>
    <MDBNavbarToggler @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="w-100 mb-2 mb-lg-0 justify-content-end">
        <MDBNavbarItem href="/comunita"> Community </MDBNavbarItem>
        <MDBNavbarItem href="/services/facetoface"> FaceToFace </MDBNavbarItem>
        <MDBNavbarItem href="/services/online"> Online </MDBNavbarItem>
        <MDBNavbarItem href="/shop"> Shop </MDBNavbarItem>
        <MDBNavbarItem to="/games"> Games </MDBNavbarItem>
        <MDBNavbarItem v-if="!logged" href="/backoffice/login">
          Login
        </MDBNavbarItem>
        <MDBNavbarItem v-if="logged" href="#" role="button" @click="raw_logout()">
          Logout
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>
