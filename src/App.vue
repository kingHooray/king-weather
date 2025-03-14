<script>
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherWeek from "@/components/WeatherWeek.vue";

export default {
  name: "App",
  components: {
    WeatherSearch,
    WeatherCard,
    WeatherWeek
  },
  data() {
    return {
      // weatherWeek: null,
      // weatherNow: null,
      // lastUpdateTime: '',
      // location: null,
      // alarm: null

      weatherWeek: [
        {
          "date": "2025/03/13",
          "high": 17,
          "dayText": "多云",
          "dayCode": 1,
          "dayWindDirection": "东风",
          "dayWindScale": "3~4级",
          "low": 5,
          "nightText": "阴",
          "nightCode": 2,
          "nightWindDirection": "东北风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/14",
          "high": 8,
          "dayText": "阴",
          "dayCode": 2,
          "dayWindDirection": "东风",
          "dayWindScale": "微风",
          "low": 2,
          "nightText": "阴",
          "nightCode": 2,
          "nightWindDirection": "东风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/15",
          "high": 6,
          "dayText": "小雨",
          "dayCode": 7,
          "dayWindDirection": "东风",
          "dayWindScale": "微风",
          "low": -1,
          "nightText": "多云",
          "nightCode": 1,
          "nightWindDirection": "北风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/16",
          "high": 8,
          "dayText": "晴",
          "dayCode": 0,
          "dayWindDirection": "西北风",
          "dayWindScale": "微风",
          "low": 0,
          "nightText": "多云",
          "nightCode": 1,
          "nightWindDirection": "西北风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/17",
          "high": 9,
          "dayText": "多云",
          "dayCode": 1,
          "dayWindDirection": "北风",
          "dayWindScale": "4~5级",
          "low": 1,
          "nightText": "多云",
          "nightCode": 1,
          "nightWindDirection": "北风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/18",
          "high": 11,
          "dayText": "多云",
          "dayCode": 1,
          "dayWindDirection": "北风",
          "dayWindScale": "微风",
          "low": 0,
          "nightText": "晴",
          "nightCode": 0,
          "nightWindDirection": "西南风",
          "nightWindScale": "微风"
        },
        {
          "date": "2025/03/19",
          "high": 16,
          "dayText": "晴",
          "dayCode": 0,
          "dayWindDirection": "西南风",
          "dayWindScale": "微风",
          "low": 4,
          "nightText": "晴",
          "nightCode": 0,
          "nightWindDirection": "北风",
          "nightWindScale": "微风"
        }
      ],
      weatherNow: {
        "precipitation": 0,
        "temperature": 18.8,
        "pressure": 1014,
        "humidity": 24,
        "windDirection": "东南风",
        "windDirectionDegree": 110,
        "windSpeed": 1.8,
        "windScale": "微风"
      },
      lastUpdateTime: "2025/03/13 15:50",
      location: {
        "id": "54511",
        "name": "北京",
        "path": "中国, 北京, 北京",
        "longitude": 116.47,
        "latitude": 39.81,
        "timezone": 8
      },
      alarm: [
        {
          "id": "36080041600000_20250313143727",
          "title": "吉安市气象台发布大雾橙色预警信号[II级/严重]",
          "signaltype": "大雾",
          "signallevel": "橙色",
          "effective": "2025/03/13 14:35",
          "eventType": "11B17",
          "severity": "ORANGE",
          "type": "p0005002"
        },
        {
          "id": "36080041600000_20250313104315",
          "title": "吉安市气象台发布冰雹橙色预警信号[II级/严重]",
          "signaltype": "冰雹",
          "signallevel": "橙色",
          "effective": "2025/03/13 10:40",
          "eventType": "11B15",
          "severity": "ORANGE",
          "type": "p0009002"
        },
        {
          "id": "36080041600000_20250313092928",
          "title": "吉安市气象台更新雷电黄色预警信号[III级/较重]",
          "signaltype": "雷电",
          "signallevel": "黄色",
          "effective": "2025/03/13 09:26",
          "eventType": "11B14",
          "severity": "YELLOW",
          "type": "p0012003"
        }
      ],
      showCard: true
    }
  },
  methods: {
    getWeatherData(stationId, country) {
      if (!stationId) {
        stationId = '54511'
        country = '中国'
      }
      let suffix = ''
      if (country.includes('中国')) {
        this.showCard = true
        suffix = `view?stationid=${stationId}`
      } else {
        this.showCard = false
        suffix = `${stationId}`
      }
      this.$jsonp(`https://weather.cma.cn/api/weather/${suffix}`,).then(res => {
        this.weatherNow = res.data['now'];
        this.lastUpdateTime = res.data.lastUpdate;
        this.location = res.data.location;
        this.alarm = res.data.alarm;
        this.weatherWeek = res.data.daily
      }).catch(() => {
        alert('貌似出现了异常！！！')
      })
    }
  },
  beforeMount: function () {
    this.getWeatherData()
  },
  mounted() {
    this.$bus.$on('getWeatherData', this.getWeatherData);
  }
}
</script>

<template>
  <div>
    <WeatherSearch></WeatherSearch>
    <WeatherCard v-if="showCard" :weatherDay="weatherWeek[0]" :weatherNow="weatherNow"
                 :lastUpdateTime="lastUpdateTime"
                 :location="location" :alarms="alarm"></WeatherCard>
    <WeatherWeek :weatherWeek="weatherWeek"></WeatherWeek>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  /* 点击突出颜色显示设置为透明 */
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

body {
  background: rgba(255, 255, 255, 0.27);
}

body > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*background: linear-gradient(135deg, #E6F4FF, #B8D8F5);*/
  /*background: linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%);*/
}
</style>