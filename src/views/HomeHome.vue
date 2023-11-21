<template>
    <div class="container">
        <div class="cake">
            <div style="display: flex;margin-bottom: 50px; background:rgb(245, 207, 207);">
                <div v-for="(el, index) in up" :key="'up'+index" class="border"
                     :id="'up-'+index"
                     @mousedown="mouseDown($event,'up-'+index)" >
                  {{el.txt}}
                </div>
              </div>
              <div style="display: flex; background:rgb(245, 207, 207);">
                <div v-for="(el, index) in below" :key="'below'+index" class="border"
                     :id="'below-'+index"
                     @mousedown="mouseDown($event,'below-'+index)">
                  {{el.txt}}
                </div>
              </div>
        </div>
        <div class="loginlogin">
          <BomHome></BomHome>
        <ComHome></ComHome>
        </div>

    </div>
</template>
<script lang="ts">
import BomHome from "@/components/BomHome.vue";
import ComHome from '@/components/ComHome.vue'
import { jsPlumb } from "jsplumb";
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            instance: null,
            up: [
                { txt: "猪" },
                { txt: "鸭子" },
                { txt: "猫" },
                { txt: "毛毛虫" },
            ],
            below: [
                { txt: "没有脚" },
                { txt: "四只脚" },
                { txt: "有翅膀" },
                { txt: "一个猪鼻子" },
            ],
            curItem: "",
            pos: {
                pageX: 0,
                pageY: 0,
            },
            clickItem: []
        };
    },
    beforeDestroy() {
        document.removeEventListener("mouseup", this.mock);
    },
    mounted() {
        const _this = this;
        this.$nextTick(() => {
            jsPlumb.ready(function () {
                // 初始化jsPlumb 创建jsPlumb实例
                _this.init();
                // 设置可以为连线起点和连线终点的元素
                _this.setContainer();
                // 在连线事件中 只允许连接相邻的列表 不能跨列表连接
                _this.setRule();
                jsPlumb.fire("jsPlumbDemoLoaded", _this.instance);
            });
        });
        document.addEventListener("mouseup", this.mock);
    },
    methods: {
        init() {
            this.instance = jsPlumb.getInstance({
                Container: "container",
                Connector: "Straight",
                ConnectionsDetachable: false,
                DeleteEndpointsOnDetach: false,
                Detachable: false,
                PaintStyle: {
                    strokeWidth: 5,
                    stroke: "#ffffff",
                    dashstyle: "5 0.8",
                    outlineStroke: "transparent",
                    outlineWidth: 15
                },
                HoverPaintStyle: {
                    strokeWidth: 5,
                    stroke: "#368FFF",
                    dashstyle: "5 0.8"
                },
                Endpoint: ["Dot", { radius: 5 }],
                EndpointStyle: { fill: "transparent" }
            });
        },
        setContainer() {
            this.instance.batch(() => {
                for (let i = 0; i < this.up.length; i++) {
                    this.initLeaf(`up-${i}`);
                }
                for (let j = 0; j < this.below.length; j++) {
                    this.initLeaf(`below-${j}`);
                }
            });
        },
        setRule() {
            this.instance.bind("connection", () => {
                this.clickItem = [];
            });
        },
        initLeaf(id) {
            // anchor: ["Left", "Right"] 左右
            const elem = document.getElementById(id);
            this.instance.makeSource(elem, {
                anchor: ["Top", "Bottom"],
                allowLoopback: false,
                maxConnections: -1
            });
            this.instance.makeTarget(elem, {
                anchor: ["Top", "Bottom"]
            });
        },
        mouseDown(e, index) {
            console.log("eee", e);
            this.curItem = index;
            this.pos = {
                pageX: e.pageX,
                pageY: e.pageY
            };
        },
        mock(e) {
            // 模拟点击
            if (Math.abs(e.pageX - this.pos.pageX) <= 10 &&
                Math.abs(e.pageY - this.pos.pageY) <= 10) {
                if (this.clickItem.length > 0) {
                    this.clickItem.push(this.curItem);
                    this.instance.connect({
                        source: this.clickItem[0],
                        target: this.clickItem[1]
                    });
                }
                else {
                    this.clickItem.push(this.curItem);
                }
            }
            else {
                this.clickItem = [];
            }
        },
    },
    components: { BomHome }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    background: url("../assets/1.jpg") center center no-repeat;
    background-size: 100% 100%;
    position:absolute;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.el-table{
    margin: 40px;
}
.border {
    width: 120px;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    border: 1px dashed black;
    margin: 20px;
  }
.cake{
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.loginlogin{
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
