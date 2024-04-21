<template>
  <div class="book-wrapper">
    <div class="kalender">
      <div id="kalender-header">
        <i @click="changeMonthMinus()" class='bx bx-left-arrow-alt' ></i>
        <div class="center">
          <h2>{{ getCurrentMonth() }}</h2>
          <h2>{{ getCurrentYear() }}</h2>
        </div>
        <i @click="changeMonthPlus()" class='bx bx-right-arrow-alt'></i>
      </div>
      <div class="kalender-main">
        <div class="kalender-dage">
          <h3 v-for="dag in dage" :key="dag">{{ dag }}</h3>
        </div>
        <div class="kalender-datoer">
          <p v-for="dato in getDaysInMonth()" :key="dato" :class="{ active: isActive[dato] }" @click="handleDateClick($event, dato)">{{ dato }}</p>
        </div>
      </div>
    </div>
    <div class="information">
      <input type="text" v-model="navn" placeholder="Indtast dit navn"/>
      <input type="text" v-model="mail" placeholder="Indtast e-mail"/>
    <select v-model="tid" name="tidspunkt" id="tid">
      <option value="" disabled selected hidden>Vælg tidsrum</option>
      <option value="08-15">Kl. 08-15</option>
      <option value="15-22">Kl. 15-22</option>
    </select>
      <button id="btn-book" type="button" @click="bookingDate">Book her</button>
    </div>
  </div>

</template>

<script >

 export default {
  data() {
    return {
      tid: '',
      months: [
        'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'
      ],
      currentMonthIndex: new Date().getMonth(),
      dage: ['Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør', 'Søn'],
      isActive: {},
    };
  },
  methods: {
  bookingDate() {
    const datoer = {
    month: this.getCurrentMonth(),
    year: this.getCurrentYear(),
    daysInMonth: this.dato,
  };
    const datoerStreng = `${datoer.daysInMonth} ${datoer.month} ${datoer.year}`;

    const bookingData = {
      lokale: this.valgtLokale,
      navn: this.navn,
      mail: this.mail,
      tid: this.tid,
      dato: datoerStreng,
    };

    fetch('https://event-booking-29842-default-rtdb.europe-west1.firebasedatabase.app/booking.json', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Der opstod en fejl ved bookingen.');
      }
      return response.json();
    })
    .then(() => {
      this.$router.push('/Bekraftelse')

    })
    .catch(error => {
      alert('Fejl ved booking:', error);
    });
},
    getCurrentMonth() {
      return this.months[this.currentMonthIndex];
    },
    getCurrentYear () {
      return new Date().getFullYear();
    },
    getDaysInMonth() {
      const daysInMonth = new Date(new Date().getFullYear(), this.currentMonthIndex + 1, 0).getDate();
      const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return days;
    },
    changeMonthPlus() {
      this.currentMonthIndex++;
      if (this.currentMonthIndex > 11) {
        this.currentMonthIndex = 0;
      }
    },
    changeMonthMinus() {
      if (this.currentMonthIndex === 0) {
        return;
      } 
      this.currentMonthIndex--;
    },
    handleDateClick(event,dato) {
      this.dato = event.target.innerText;
      this.isActive[dato] = !this.isActive[dato];
    },
  }
  };
</script>
