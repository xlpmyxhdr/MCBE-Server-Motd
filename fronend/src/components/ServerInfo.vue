<template>
  <div id="server-info">
    <v-card :disabled="loading" :loading="loading" elevation="0">
      <v-card-text>
        <div class="d-flex">
          <v-card elevation="0" height="80">
            <v-img
                v-if="this.query_data == null || this.query_data.status !== true"
                :aspect-ratio="1"
                lazy-src="@/assets/img_5.png"
                src="@/assets/img_5.png"
                width="80"
            ></v-img>
            <v-img
                v-else
                :aspect-ratio="1"
                lazy-src="@/assets/img_4.png"
                src="@/assets/img_4.png"
                width="80"
            ></v-img>
          </v-card>
          <div v-if="this.loading !== true && this.query_data !== null && this.query_data.status === true"
               class="ml-4">
            <h2 class="title" v-html="text_format(this.query_data.motd)"></h2>
            <div class="text-subtitle-1">
              <v-icon size="16">mdi-server</v-icon>
              {{ this.query_data.host }}
            </div>
            <div class="text-subtitle-2">
              <v-icon size="16">mdi-gamepad</v-icon>
              MCBE: {{ this.query_data.version }} |
              <template
                  v-if="join_open && this.$vuetify.breakpoint.smAndDown"
              >
                <v-btn color="primary" small class="pb-1" text elevation="0" v-on:click="dialog = true">
                  加入服务器
                </v-btn>
              </template>
              <template v-else> Protocol: {{ this.query_data.agreement }} </template>
            </div>

          </div>
          <div v-else-if="loading === true" class="ml-4">
            <h2 class="title">正在加载</h2>
            <div class="text-subtitle-1">
              如果迟迟不响应，请刷新页面重试，也许是api炸了呢
            </div>
          </div>
          <div v-else class="ml-4">
            <h2 class="title">当前服务器离线</h2>
            <div class="text-subtitle-2">
              所谓的携手共进不就是这样吗？如果平坦的道理上只有一个人的宽度，那么我会很开心地走上长满荆棘的道路。 --- 樱小路露娜
            </div>
          </div>
          <div
              class="ml-auto"
              v-if="join_open && this.$vuetify.breakpoint.mdAndUp"
          >
            <v-btn color="primary" small elevation="0" v-on:click="dialog = true">
              加入服务器
            </v-btn>
          </div>
        </div>
        <div class="mb-3">
          <v-row
              v-if="this.query_data !== null && this.query_data.status === true"
              class="pt-4"
          >
            <v-btn
                :color="(this.query_data.gamemode === 'Survival')? 'deep-orange': 'red' "
                class="mt-1"
                dark
                depressed
                small
                style="margin-left: 10px"
                tile
            >
              游戏模式: {{ this.query_data.gamemode }}
            </v-btn>
            <v-btn
                class="mt-1"
                color="cyan"
                dark
                depressed
                small
                style="margin-left: 10px"
                tile
            >
              在线人数: {{ this.query_data.online }} / {{ this.query_data.max }}
            </v-btn>

            <v-btn
                class="mt-1"
                color="indigo"
                dark
                depressed
                small
                style="margin-left: 10px"
                tile
            >
              地图名: {{ this.query_data.level_name }}
            </v-btn>
            <v-btn
                :color="(this.query_data.delay > 50)? 'warning': 'success' "
                class="mt-1"
                dark
                depressed
                small
                style="margin-left: 10px"
                tile
            >
              延迟: {{ this.query_data.delay }} ms
            </v-btn>
          </v-row>
          <v-row
              v-else
              class="pt-4"
          >
            <v-btn
                class="mt-1"
                color="primary"
                depressed
                disabled
                small
                style="margin-left: 10px"
                text
                tile
            >
              加载中
            </v-btn>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
        v-if="join_open"
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          提示
        </v-card-title>
        <v-card-text>
          我们将唤起本地的 MinecraftBE 客户端并自动添加服务器信息，若无法唤起请检查浏览器权限或更换浏览器。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="joinServer"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerInfo",
  data: () => ({
    dialog: false
  }),
  props: {
    query_data: {
      type: Object | Boolean,
      default() {
        return null;
      }
    },
    join_open: {
      type: Boolean,
      default() {
        return false;
      }
    },
    loading: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  methods: {
    // 参考: https://github.com/pmmp/PocketMine-MP/blob/stable/src/utils/TextFormat.php
    // 基本实现了基础的替换 有人需要再发npm包吧? 应该不会有吧(((
    // 感觉不是太完美 希望有人提pr吧（（ 也欢迎issue和我讨论
    text_format(motd) {
      const escape = '§';
      const formats = {
        "k": "<span style=text-decoration:line-through>", // 这个好像没啥办法做（（ 就先这样吧
        "l": "<span style=font-weight:bold>",
        "m": "<span style=text-decoration:line-through>",
        "n": "<span style=text-decoration:underline>",
        "o": "<span style=font-style:italic>"
      };
      const reset = {
        "r": "</span>"
      };
      const color = {
        "0": "<span style=color:#000>",
        "1": "<span style=color:#00A>",
        "2": "<span style=color:#0A0>",
        "3": "<span style=color:#0AA>",
        "4": "<span style=color:#A00>",
        "5": "<span style=color:#A0A>",
        "6": "<span style=color:#FA0>",
        "7": "<span style=color:#AAA>",
        "8": "<span style=color:#555>",
        "9": "<span style=color:#55F>",
        "a": "<span style=color:#5F5>",
        "b": "<span style=color:#5FF>",
        "c": "<span style=color:#F55>",
        "d": "<span style=color:#F5F>",
        "e": "<span style=color:#FF5>",
        "f": "<span style=color:#FFF>",
      };
      let map = motd.split(escape);
      let color_state = false;
      let result = "";
      let format_state = false;
      let reset_state = false;
      if (map.length > 1) {
        map.forEach((item, index) => {
          if (color[item.substr(0, 1)] !== undefined) {
            if (color_state) {
              if (reset_state) {
                reset_state = false;
              } else {
                map[index] = "</span>" + color[item.substr(0, 1)] + item.substr(1);
              }
            } else {
              map[index] = color[item.substr(0, 1)] + item.substr(1);
            }
            result = result + map[index];
          } else if (formats[item.substr(0, 1)] !== undefined) {
            if (format_state) {
              if (reset_state) {
                reset_state = false;
              } else {
                map[index] = "</span>" + formats[item.substr(0, 1)] + item.substr(1);
              }
            } else {
              map[index] = formats[item.substr(0, 1)] + item.substr(1);
            }
            result = result + map[index];
          } else if (reset[item.substr(0, 1)] !== undefined) {
            map[index] = "</span>" + item.substr(1);
            reset_state = true;
            result = result + map[index];
          } else {
            result = result + item.substr(1);
          }
        });
      } else {
        result = motd;
      }
      return result;
    },
    joinServer(){
      this.dialog = false;
      window.open('minecraft:?addExternalServer='+this.query_data.motd+'|'+this.query_data.host, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
