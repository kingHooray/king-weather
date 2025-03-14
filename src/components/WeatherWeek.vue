<script>
export default {
  name: "WeatherWeek",
  props: ['weatherWeek'],
  data() {
    return {
      active: 'active'
    }
  },
  methods: {
    dayOfWeek(date) {
      if (this.isToday(date)) {
        return '今天'
      }
      const d = new Date(date)
      const dayName = d.toLocaleDateString("zh-CN", {weekday: "long", timeZone: 'Asia/Shanghai'})
      return dayName
    },
    isToday(date) {
      // 1. 解析输入字符串为 Date 对象
      const inputDate = new Date(date)
      // 2. 检查日期是否有效
      if (isNaN(inputDate)) return false
      // 3. 获取当前日期的年、月、日（本地时区）
      const today = new Date()
      // 4. 比较年、月、日
      return (
          inputDate.getFullYear() === today.getFullYear() &&
          inputDate.getMonth() === today.getMonth() &&
          inputDate.getDate() === today.getDate()
      )
    },
    weatherPng(day) {
      const weatherText = day.dayText
      if (weatherText.includes('多云')) {
        return './weather/cloudy.png'
      } else if (weatherText.includes('晴')) {
        return './weather/sunny.png'
      } else if (weatherText.includes('阴')) {
        return './weather/overcast.png'
      } else if (weatherText.includes('大到暴雨')) {
        return './weather/heavy_rainstorm.png'
      } else if (weatherText.includes('暴雨')) {
        return './weather/rainstorm.png'
      } else if (weatherText.includes('雨夹雪')) {
        return './weather/sleet.png'
      } else if (weatherText.includes('冰雹')) {
        return './weather/thunderstorm_with_hail.png'
      } else if (weatherText.includes('雷阵雨')) {
        return './weather/thunderstorm.png'
      } else if (weatherText.includes('阵雨')) {
        return './weather/shower_rain.png'
      } else if (weatherText.includes('小雨')) {
        return './weather/light_rain.png'
      } else if (weatherText.includes('中雨')) {
        return './weather/moderate_rain.png'
      } else if (weatherText.includes('大雨')) {
        return './weather/heavy_rain.png'
      } else if (weatherText.includes('小雪')) {
        return './weather/light_snow.png'
      } else if (weatherText.includes('阵雪')) {
        return './weather/shower_snow.png'
      } else if (weatherText.includes('中雪')) {
        return './weather/moderate_snow.png'
      } else if (weatherText.includes('大雪')) {
        return './weather/heavy_snow.png'
      } else if (weatherText.includes('暴雪')) {
        return './weather/snowstorm.png'
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
  }
}
</script>

<template>
  <div id="weather-more">
    <div class="weather-more-title">
      <h2>七天天气</h2>
    </div>
    <div class="weather-week">
      <div v-for="(day) in weatherWeek" :key="day.date" :class={active:isToday(day.date)}>
        <p class="day-of-week">{{ dayOfWeek(day.date) }}</p>
        <p class="date">{{ day.date.split('/')[1] }}/{{ day.date.split('/')[2] }}</p>
        <img :src="weatherPng(day)" alt="">
        <p class="more-weather-text">{{ day.dayText }}</p>
        <p class="temperature-range">{{ day.low }}°C ~ {{ day.high }}°C</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#weather-more {
  width: 85%;
  min-width: 400px;
  /*background: linear-gradient(to right, #a8ff78, #78ffd6);*/
  /*background: linear-gradient(to right, #2bc0e4, #eaecc6);*/
  /*background: linear-gradient(145deg, #fff0f5, #ffeef9);*/
  /*background: rgba(255, 255, 255, 0.3);*/
  /*background: #f7f8f9;*/
  background: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  display: flex;
  margin: 20px;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
}

#weather-more > .weather-more-title {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

#weather-more > .weather-more-title > h2 {
  text-align: center;
  font-size: 20px;
}

#weather-more > .weather-week {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

#weather-more > .weather-week > div {
  width: 14.2%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 10px;
  transition: all .3s ease-in-out;
  cursor: pointer;
}

#weather-more > .weather-week > div > p {
  width: 100%;
  color: #333;
}

#weather-more > .weather-week > div > img {
  width: 65px;
  margin: 0 auto;
}

#weather-more > .weather-week > div > p:nth-of-type(2) {
  color: #999;
  font-size: 14px;
}

#weather-more > .weather-week > div > p:nth-of-type(3),
#weather-more > .weather-week > div > p:nth-of-type(4) {
  text-align: center;
}

.active,
#weather-more > .weather-week > div:hover {
  background: rgba(0, 0, 0, 0.04);
}

.active > p:nth-of-type(1),
#weather-more > .weather-week > div:hover > p:nth-of-type(1) {
  color: #000;
  font-weight: bold;
}

@media (max-width: 1000px) {
  #weather-more > .weather-week {
    /*增加这个*/
    flex-wrap: wrap;
    /*增加*/
    gap: 10px;
  }

  #weather-more > .weather-week > div {
    /*width: 14.2%;*/
    width: 100%;
    /*增加下面那行*/
    flex-direction: row;
    /*增加下面那行*/
    position: relative;
  }


  /*增加*/
  #weather-more > .weather-week > div > p:nth-of-type(1) {
    flex: 2;
  }

  /*增加*/
  #weather-more > .weather-week > div > img {
    width: 40px;
    min-width: 40px;
    height: 40px;
  }

  #weather-more > .weather-week > div > p:nth-of-type(2) {
    /*增加*/
    position: absolute;
    /*增加*/
    top: 30px;
  }

  #weather-more > .weather-week > div > p:nth-of-type(3),
  #weather-more > .weather-week > div > p:nth-of-type(4) {
    /*增加*/
    line-height: 40px;
    flex: 1.5;
  }

  #weather-more > .weather-week > div > p:nth-of-type(3) {
    flex: 1;
  }
}
</style>