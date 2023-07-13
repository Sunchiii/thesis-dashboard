<script setup>
import { reactive , onMounted} from "vue";
import { RocketOutlined, SmileFilled } from "@ant-design/icons-vue";
import ARow from "ant-design-vue/lib/grid/Row";
import Poly from "./assets/images/Polygon.svg";
import Retan from "./assets/images/Rectangle.svg";
import Ellip from "./assets/images/Ellipse.svg";
import Power from "./assets/images/power.svg";
import Camera from "./assets/images/camera.svg";
import Robot from "./assets/images/robot.svg";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = reactive({
  triangle :"",
  square :"",
  circle :"",
})
const chartData = reactive({
  labels: ["Circle", "Square", "Retangle"],
  datasets: [
    { backgroundColor: ["#41B883", "#E46651", "#00D8FF"], data: [50, 20, 30] },
  ],
});
const chartOption = reactive({
  responsive: true,
});


const socket = new WebSocket("ws://localhost:8080/")

socket.onopen = ()=>{
  console.log("connected!!")
}

socket.onmessage = e =>{
  let da = JSON.parse(e.data)
  data.triangle = da?.triangle
}

</script>

<template>
  <a-layout>
    <a-Layout-header style="background-color: #f0f2f5; margin: 0 0 8px 0">
      <a-row>
        <a-col style="margin: 8px 24px">
          <rocket-outlined style="font-size: 32px; color: #3a487b" />
        </a-col>
        <a-col>
          <p
            style="
              color: #3a487b;
              font-size: 32px;
              font-family: 'Montserrat';
              font-weight: bold;
            "
          >
            Dashboard
          </p>
        </a-col>
      </a-row>
    </a-Layout-header>

    <a-layout-content style="padding: 0 124px">
      <div>
        <a-row type="flex" justify="space-between" align="top">
          <a-col
            style="background-color: #ffff; padding: 24px; padding-top: 20px"
          >
          <div>
                  <p
                    style="
                      font-family: 'Montserrat';
                      font-size: 16px;
                      font-weight: bold;
                    "
                  >
                    Statistic
                  </p>
                  <Pie :options="chartOptions" :data="chartData" />
                </div>
          </a-col>

          <a-col style="background-color: #ffff; padding: 20px 36px">
            <p
              style="
                font-family: 'Montserrat';
                font-size: 16px;
                font-weight: bold;
              "
            >
              Amount of Collection
            </p>

            <a-row justify="space-around" type="flex" align="middle">
              <a-col>
                <div>
                  <Img :src="Poly" width="70" />
                </div>
              </a-col>
              <a-col>
                <div
                  :style="{
                    background: '#f0f2f5',
                    margin: '32px',
                    minWidth: '104px',
                  }"
                >
                  <p
                    style="
                      text-align: center;
                      font-family: 'Montserrat';
                      font-size: 16px;
                      font-weight: bold;
                    "
                  >
                    {{ data?.triangle == ""?"0": data?.triangle}}
                  </p>
                </div>
              </a-col>
            </a-row>

            <a-row justify="space-around" type="flex" align="middle">
              <a-col>
                <div>
                  <Img :src="Retan" width="70" />
                </div>
              </a-col>
              <a-col>
                <div
                  :style="{
                    background: '#f0f2f5',
                    margin: '32px',
                    minWidth: '104px',
                  }"
                >
                  <p
                    style="
                      text-align: center;
                      font-family: 'Montserrat';
                      font-size: 16px;
                      font-weight: bold;
                    "
                  >
                  {{ data?.triangle == ""?"0": data?.triangle}}
                  </p>
                </div>
              </a-col>
            </a-row>

            <a-row justify="space-around" type="flex" align="middle">
              <a-col>
                <div>
                  <Img :src="Ellip" width="70" />
                </div>
              </a-col>
              <a-col>
                <div
                  :style="{
                    background: '#f0f2f5',
                    margin: '32px',
                    minWidth: '104px',
                  }"
                >
                  <p
                    style="
                      text-align: center;
                      font-family: 'Montserrat';
                      font-size: 16px;
                      font-weight: bold;
                    "
                  >
                  {{ data?.triangle == ""?"0": data?.triangle}}
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-col>

          <a-col
            style="
              background-color: #ffff;
              padding: 24px;
              padding-top: 20px;
              width: 280px;
            "
          >
            <p
              style="
                font-family: 'Montserrat';
                font-size: 16px;
                font-weight: bold;
              "
            >
              Status
            </p>

            <a-row
              justify="space-between"
              type="flex"
              align="center"
              :style="{ margin: '12px 0px' }"
            >
              <a-col>
                <div>
                  <img :src="Power" :width="30" />
                </div>
              </a-col>
              <a-col>
                <p>Power</p>
              </a-col>
              <a-col>
                <smile-filled style="font-size: 16px; color: #2ac400" />
              </a-col>
            </a-row>

            <a-row
              justify="space-between"
              type="flex"
              align="center"
              :style="{ margin: '12px 0px' }"
            >
              <a-col>
                <Img :src="Camera" :width="30" />
              </a-col>
              <a-col>
                <p>Camera</p>
              </a-col>
              <a-col>
                <smile-filled style="font-size: 16px; color: #2ac400" />
              </a-col>
            </a-row>

            <a-row
              justify="space-between"
              type="flex"
              align="center"
              :style="{ margin: '12px 0px' }"
            >
              <a-col>
                <div>
                  <Img :src="Robot" :width="30" />
                </div>
              </a-col>
              <a-col>
                <p>Robot</p>
              </a-col>
              <a-col>
                <smile-filled style="font-size: 16px; color: #2ac400" />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

    </a-layout-content>

    <div style="height:200px;"></div>
    <a-layout-footer style="text-align: center;">
      UI Design ©2023 Created by PUI
    </a-layout-footer>
  </a-layout>
</template>

<style></style>
