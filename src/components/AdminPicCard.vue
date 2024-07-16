<template>
    <v-card>
      <v-img :src="pic.url" height="200px"></v-img>
      <v-card-subtitle>
        {{ pic.scene }} - {{ pic.user }} - {{ pic.time }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="red" @click="deletePic(pic)">删除</v-btn>
      </v-card-actions>
      <v-btn icon color="blue" @click="muteUser(pic.user)" style="position: absolute; top: 0; right: 0;">
        <v-icon>mdi-volume-off</v-icon>
      </v-btn>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      pic: {
        type: Object,
        required: true
      }
    },
    methods: {
      async deletePic(pic) {
        try {
          const data = {
            picid: pic.picid,
            url: pic.url,
            user: pic.user,
            scene: pic.scene,
            time: pic.time
          };
          await fetch('/api/pics/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          this.$emit('deleted', pic.picid);
        } catch (error) {
          console.error('删除图片失败:', error);
        }
      },
      async muteUser(user) {
        try {
          await fetch('/api/users/mute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
          });
          this.$emit('muted', user);
        } catch (error) {
          console.error('禁言用户失败:', error);
        }
      }
    }
  };
  </script>
  