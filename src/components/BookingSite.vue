<script>
import Calender from './Calender.vue';

export default {
  components: {
    Calender
  },
  data() {
    return {
      showModal: false,
      openedLokaleIndex: null, 
      lokale: [
        {
          navn: "Salen",
          beskrivelse: "Findes i stueetagen, med plads til ca. 50 personer",
          billede: "/src/images/salen.jpeg", alt:"Salen"
        },
        {
          navn: "Studiezonen",
          beskrivelse: "Findes på 1. sal, med plads til ca. 80 personer",
          billede: "/src/images/studiezonen.jpeg", alt:"Studiezonen"
        },
        {
          navn: "Mødelokale",
          beskrivelse: "Findes på 1. sal med plads til ca. 10 personer",
          billede: "/src/images/modelokale.jpeg", alt:"Mødelokale"

        },
        {
          navn: "Mødeboks",
          beskrivelse: "Findes på 1. sal med plads til ca. 4 personer",
          billede: "/src/images/modeboks.png", alt:"Lukket Mødelokale"
        },
        {
          navn: "Caféområdet",
          beskrivelse: "Findes i stueetagen med plads til ca. 100 personer",
          billede: "/src/images/cafeomrade.png", alt:"Caféområde"
        },
        {
          navn: "Studenterhuset",
          beskrivelse: "Plads til ca. 140 personer",
          billede: "/src/images/studenterhuset.jpeg", alt:"Studenterhuset"
        },
        {
          navn: "Kontoret",
          beskrivelse: "Findes på 1. sal med plads til ca. 5 personer",
          billede: "/src/images/modelokale.webp", alt:"Kontoret"
        },
      ]
    }
  },
  methods: {
    openModal(index) {
      this.showModal = true;
      this.openedLokaleIndex = index; 
    },
    closeModal() {
      this.showModal = false;
      this.openedLokaleIndex = null; 
    }
    }
  }
  </script>


<template>
  <div class="wrapper">
  <h1>Book et af vores lokaler her!</h1>
  <div class="wrapper-grid" >
    <div class="lokale" v-for="(lokale, index) in lokale" :key="index" @click="openModal(index)">
      <h2>{{ lokale.navn }}</h2>
      <h4>{{ lokale.beskrivelse }}</h4>
      <img :src="lokale.billede" :alt="lokale.alt">
      <button class="book">Book {{ lokale.navn }}</button>
    </div>
  </div>
  
  <div id="modal" v-if="showModal">
    <div class="modal-content">
    <span @click="closeModal" class="close" >X</span>
    <h2>Book {{ lokale[openedLokaleIndex].navn }}</h2>
  </div>
  <Calender :valgtLokale="lokale[openedLokaleIndex].navn" />
</div>
</div>
</template>


