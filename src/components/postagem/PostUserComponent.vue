<template>
  <v-card dark rounded style="margin-bottom: 30px">
    <v-card-title>
      <v-avatar size="50px" style="margin-right: 3px">
        <img src="/img/users/default.jpg" alt=""/>
      </v-avatar>
      <h3 style="font-size: 16px">Karlos Warney Moreira de Oliveira</h3>
    </v-card-title>
    <v-card-subtitle style="text-align: left; margin-left: 53px; margin-top: -30px">há 10 min</v-card-subtitle>
    <v-menu offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-btn dark icon style="position: absolute; top: 0; right: 0" v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </template>
      <v-list dark>
        <v-list-item>
          <v-list-item-title><v-icon>mdi-pencil</v-icon> Editar</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-icon>mdi-delete</v-icon> Excluir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-card-text>
      <p style="text-align: left">
        gfhfhjgjghdfhth gd grtg trg rtg erg reg reg erg erg erg erg
        dghfgh fgh dfg erg ytjh tyujutj yui t etr erqag rgt trhrth rth yh
        dfse wef rg huyjmui tuy rtbgerfg  yht yjh tfwe rgtrt hy ujky ertg rgferfg
        fgdg gdghtrhyh tgfer fhytjhtyjuju dfghtfhtyh trhtgg ergfrefgrg ththy
      </p>
      <div class="img-post">
        <img src="/img/episodios/vlcsnap-2022-08-06-01h10m10s046.jpg" alt=""/>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn dark><v-icon>mdi-heart-outline</v-icon></v-btn>
      <v-btn dark><v-icon>mdi-comment-text-outline</v-icon></v-btn>
      <v-btn dark><v-icon>mdi-share-variant-outline</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PostUserComponent"
}
</script>

<style scoped>
.img-post {
  width: 100%;
  padding: 20px;
}

.img-post img {
  width: 100%;
}
</style>