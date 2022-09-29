<template>
  <div ref="msg" v-if="$props.propria" style="float: right; width: 80%; margin: 2px 0">
    <div style="text-align: left; padding: 5px">
      <div style="background-color: #ff4a3b; padding: 7px; border-radius: 15px; width: fit-content; margin-left: auto">
        {{$props.texto}}
      </div>
    </div>
  </div>
  <div ref="msg" v-else style="float: left; width: 80%; margin: 2px 0">
    <div style="text-align: left; padding: 5px; display: inline">
      <v-avatar size="30px" style="float: left; margin: 2px">
        <img :src="'/img/users/' + getAmigoFoto($props.autor)" alt="Foto de perfil"/>
      </v-avatar>
      <div style="background-color: #7c7c7c; padding: 7px; border-radius: 15px; width: fit-content; float: left">
        {{$props.texto}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MensagemComponent",
  props: {
    id: {
      type: String,
      required: true
    },
    propria: {
      type: Boolean,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
    autor: {
      type: String,
      required: true
    }
  },
  methods: {
    getAmigoFoto(foto){
      if(foto !== ''){
        return foto;
      }else{
        return 'default.jpg';
      }
    }
  }
}
</script>

<style scoped>

</style>