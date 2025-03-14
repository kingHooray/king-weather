<script>
export default {
  name: 'WeatherCard',
  props: [
    'weatherDay',
    'weatherNow',
    'lastUpdateTime',
    'location',
    'alarms'
  ],
  data: function () {
    return {
      bgColor: 'linear-gradient(160deg, #B2D8FF 0%, #D4E8FF 33%, #EBF5FF 100%)'
    }
  },
  computed: {
    weatherPng() {
      const weatherText = this.weatherDay.dayText
      const hour = new Date().getHours()
      if (weatherText.includes('多云')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/cloudy.png'
        } else {
          return './weather/cloudy_night.png'
        }
      } else if (weatherText.includes('晴')) {
        return './weather/sunny.png'
      } else if (weatherText.includes('阴')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/overcast.png'
        } else {
          return './weather/overcast_night.png'
        }
      } else if (weatherText.includes('大到暴雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/heavy_rainstorm.png'
        } else {
          return './weather/heavy_rainstorm_night.png'
        }
      } else if (weatherText.includes('暴雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/rainstorm.png'
        } else {
          return './weather/rainstorm_night.png'
        }
      } else if (weatherText.includes('雨夹雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/sleet.png'
        } else {
          return './weather/sleet_night.png'
        }
      } else if (weatherText.includes('冰雹')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/thunderstorm_with_hail.png'
        } else {
          return './weather/thunderstorm_with_hail_night.png'
        }
      } else if (weatherText.includes('雷阵雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/thunderstorm.png'
        } else {
          return './weather/thunderstorm_night.png'
        }
      } else if (weatherText.includes('阵雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/shower_rain.png'
        } else {
          return './weather/shower_rain_night.png'
        }
      } else if (weatherText.includes('小雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/light_rain.png'
        } else {
          return './weather/light_rain_night.png'
        }
      } else if (weatherText.includes('中雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/moderate_rain.png'
        } else {
          return './weather/moderate_rain_night.png'
        }
      } else if (weatherText.includes('大雨')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/heavy_rain.png'
        } else {
          return './weather/heavy_rain_night.png'
        }
      } else if (weatherText.includes('小雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/light_snow.png'
        } else {
          return './weather/light_snow_night.png'
        }
      } else if (weatherText.includes('阵雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/shower_snow.png'
        } else {
          return './weather/shower_snow_night.png'
        }
      } else if (weatherText.includes('中雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/moderate_snow.png'
        } else {
          return './weather/moderate_snow_night.png'
        }
      } else if (weatherText.includes('大雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/heavy_snow.png'
        } else {
          return './weather/heavy_snow_night.png'
        }
      } else if (weatherText.includes('暴雪')) {
        if (hour >= 6 && hour <= 18) {
          return './weather/snowstorm.png'
        } else {
          return './weather/snowstorm_night.png'
        }
      } else if (weatherText.includes('扬沙')) {
        return './weather/blowing_sand.png'
      } else if (weatherText.includes('雾')) {
        return './weather/fog.png'
      } else if (weatherText.includes('霾')) {
        return './weather/haze.png'
      } else if (weatherText.includes('沙尘暴')) {
        return './weather/sandstorm.png'
      } else if (weatherText.includes('浮尘')) {
        return './weather/floating_dust.png'
      } else {
        return './weather/fog2.png'
      }
    },
  },
  methods: {
    weatherDesc() {
      const weatherText = this.weatherDay.dayText
      if (weatherText.includes('晴')) {
        this.bgColor = 'linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb)'
        return '出门记得涂防晒。'
      } else if (weatherText.includes('阴')) {
        this.bgColor = 'linear-gradient(45deg, #778899 0%, #A9A9A9 100%)'
        return '添件外套，避免感冒。'
      } else if (weatherText.includes('多云')) {
        this.bgColor = 'linear-gradient(to bottom, #B0C4DE 0%, #F0F8FF 100%)'
        return '户外活动无需遮阳伞但建议戴帽子。'
      } else if (weatherText.includes('扬沙')) {
        this.bgColor = 'linear-gradient(225deg, rgba(178, 156, 130, 0.66), #ded9d7 64.29%, #d9d7dc)'
        return '出门戴好口罩。'
      } else if (weatherText.includes('冰雹')) {
        this.bgColor = 'linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED)'
        return '车辆停室内，保护农作物。'
      } else if (weatherText.includes('雾')) {
        this.bgColor = 'linear-gradient(225deg, rgba(178, 156, 130, 0.66), #ded9d7 64.29%, #d9d7dc)'
        return '开车打开雾灯，保持车距。'
      } else if (weatherText.includes('雷')) {
        this.bgColor = 'linear-gradient(145deg, rgba(51, 55, 71, 0.66) 0%, rgba(67, 72, 97, 0.54) 50%,rgba(153, 102, 204, 0.17) 100%)'
        return '关闭电器，勿在树下避雨。'
      } else if (weatherText.includes('台风')) {
        this.bgColor = 'linear-gradient(to bottom, #4682B4 0%, #6C7A89 100%)'
        return '囤好物资，避免外出。'
      } else if (weatherText.includes('雪')) {
        this.bgColor = 'linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED)'
        return '穿防滑鞋，减速慢行。'
      } else if (weatherText.includes('雨')) {
        this.bgColor = 'linear-gradient(to bottom, #4682B4 0%, #6C7A89 100%)'
        return '随身带伞，小心着凉。'
      } else if (weatherText.includes('风')) {
        this.bgColor = 'linear-gradient(to bottom, #4682B4 0%, #6C7A89 100%)'
        return '远离广告牌，注意安全。'
      } else if (weatherText.includes('霾')) {
        this.bgColor = 'linear-gradient(225deg, rgba(178, 156, 130, 0.66), #ded9d7 64.29%, #d9d7dc)'
        return '口罩是此刻的盾牌。'
      } else {
        this.bgColor = 'linear-gradient(160deg, #B2D8FF 0%, #D4E8FF 33%, #EBF5FF 100%)'
        return '人生偶尔有风雨，但你有自己的晴天！'
      }
    }
  }
}
</script>

<template>
  <div id="weather-card" :style="'background:'+bgColor">
    <div class="card-head">
      <div class="current-position">
        <img src="@/assets/other/locate.png" alt="">
        <span>{{ location.name }}</span>
      </div>
      <span class="update-time">{{ lastUpdateTime }}</span>
      <div class="weather-img">
        <img :src="weatherPng" alt="">
        <div>
          <span class="temperature">{{ weatherNow.temperature }}°</span>
          <span class="weather-text">{{ weatherDay.dayText }}</span>
        </div>
      </div>
      <p class="weather-desc">今天白天{{
          weatherDay.dayText
        }}，夜晚{{ weatherDay.nightText }}，现在{{ weatherNow.temperature }}°，{{ weatherDesc() }}</p>
    </div>
    <div class="weather-alarm" v-show="alarms !== null && alarms.length > 0">
      <div v-for="alarm in alarms" :key="alarm.id">
        <span>{{ alarm.signaltype }}</span>
        <!--<span>承德市气象台发布雷电黄色预警[Ⅲ级/较重]</span>-->
        <img :src="'./other/'+alarm.severity.toLowerCase()+'_warning.png'" alt="">
      </div>
    </div>
    <div class="weather-other">
      <div class="wind">
        <p class="windScale">{{ weatherNow.windScale }}</p>
        <p class="windDirection">{{ weatherNow.windDirection }}</p>
      </div>
      <div class="humidity">
        <p>{{ weatherNow.humidity }}%</p>
        <p>相对湿度</p>
      </div>
      <div class="precipitation">
        <p>{{ weatherNow.precipitation.toFixed(1) }}mm</p>
        <p>降水量</p>
      </div>
      <div class="pressure">
        <p>{{ weatherNow.pressure }}hPa</p>
        <p>大气压</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#weather-card {
  width: 85%;
  min-width: 400px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 20px;
  /*background: linear-gradient(160deg, #B2D8FF 0%, #D4E8FF 33%, #EBF5FF 100%);*/
}

#weather-card > div {
  width: 100%;
}

#weather-card > .card-head {
  position: relative;
}

#weather-card > .card-head > .current-position {
  min-width: 100px;
  position: absolute;
  display: flex;
  align-items: center;
}

#weather-card > .card-head > .current-position > img {
  width: 40px;
}

#weather-card > .card-head > .current-position > span {
  padding: 0 4px;
  font-size: 20px;
}

#weather-card > .card-head > .update-time {
  display: block;
  position: absolute;
  right: 10px;
}

#weather-card > .card-head > .weather-img {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

#weather-card > .card-head > .weather-img > img {
  width: 140px;
}

#weather-card > .card-head > .weather-img > div {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}

#weather-card > .card-head > .weather-img > div > .temperature {
  font-size: 45px;
  font-weight: 500;
}

#weather-card > .card-head > .weather-img > div > .weather-text {
  font-size: 20px;
}

#weather-card > .card-head > .weather-desc {
  text-align: center;
}

#weather-card > .weather-alarm {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

#weather-card > .weather-alarm > div {
  /*background: rgba(255, 255, 255, 0.15);*/
  background: rgba(0, 0, 0, 0.03);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  cursor: pointer;
  padding: 0 20px;
  /*border: 1px solid rgba(255, 255, 255, 0.25);*/
}

/*#weather-card > .weather-alarm > div > span {*/
/*    padding-left: 20px;*/
/*}*/

#weather-card > .weather-alarm > div > img {
  height: 30px;
  /*padding-right: 20px;*/
}

#weather-card > .weather-other {
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 15px;
  justify-content: space-between;
}

#weather-card > .weather-other > div {
  width: 25%;
  box-sizing: border-box;
  border-left: 1px solid rgba(0, 0, 0, 0.035);
  border-right: 1px solid rgba(0, 0, 0, 0.035);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

#weather-card > .weather-other > div > p {
  cursor: pointer;
}

#weather-card > .weather-other > .wind {
  border-radius: 15px 0 0 15px;
  border-left: none;
}

#weather-card > .weather-other > .pressure {
  border-radius: 0 15px 15px 0;
  border-right: none;
}

#weather-card > .weather-other > div > p:nth-of-type(1) {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

#weather-card > .weather-other > div > p:nth-of-type(2) {
  color: #666666;
}
</style>