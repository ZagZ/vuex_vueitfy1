<template>
  <div>
    <v-layout :wrap="true" class="pa-10">
      <v-flex xs12>
        <v-date-picker
          v-model="fecha"
          full-width
          locale="es-mx"
          :min="minimo"
          :max="maximo"
          @change="getDolar(fecha)"
        >
        </v-date-picker>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-center">
            {{ +valor > 0 ? `$${valor}` : `${valor}` }} - {{ fecha }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      fecha: new Date(new Date().getTime() - 3600000 * 6)
        .toISOString()
        .substr(0, 10),
      minimo: "1984",
      maximo: new Date(new Date().getTime() - 3600000 * 6)
        .toISOString()
        .substr(0, 10),
      valor: null,
    };
  },

  methods: {
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),

    async getDolar(dia) {
      let reverseDate = dia?.split("-").reverse().join("-");

      try {
        this.mostrarLoading({
          titulo: "Buscando informacion",
          color: "primary",
        });
        let datos = await axios.get(
          `https://mindicador.cl/api/dolar/${reverseDate}`
        );

        if (datos?.data?.serie?.length) {
          this.valor = datos?.data?.serie[0]?.valor;
        } else {
          this.valor = "Sin resultados";
          throw this.valor;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.ocultarLoading();
      }
    },
  },
  created() {
    this.getDolar(this.fecha);
  },
};
</script>
