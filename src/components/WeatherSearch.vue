<script>
export default {
  name: "WeatherSearch",
  data: function () {
    return {
      data: ["54511|北京|Beijing|中国",
        "53698-sjz|石家庄|Shijiazhuang|中国",
        "58238|南京|Nanjing|中国",
        "59287|广州|Guangzhou|中国",
        "S1003|成都|Chengdu|中国"],
      timer: null,
      isExpand: false
    }
  },
  methods: {
    searchCity(event) {
      if (this.timer != null) {
        clearTimeout(this.timer);
      }
      let q = encodeURIComponent(encodeURIComponent(event.target.value))
      if (q === '' || q === undefined || q == null) {
        this.data = [
          "54511|北京|Beijing|中国",
          "53698-sjz|石家庄|Shijiazhuang|中国",
          "58238|南京|Nanjing|中国",
          "59287|广州|Guangzhou|中国",
          "S1003|成都|Chengdu|中国"
        ]
        return
      }
      if (q.length < 2) {
        return
      }
      this.timer = setTimeout(() => {
        this.$jsonp(`https://weather.cma.cn/api/autocomplete?q=${q}&limit=10`).then((response) => {
          if (response.data.length > 5) {
            this.data = response.data.slice(0, 5)
            return
          }
          this.data = response.data
        }).catch(() => {
          alert('貌似出了点小毛病！！！');
        })
      }, 400)

    },
    checkGetWeather() {
      this.$refs["city-input"].blur()
      let keyword = this.$refs["city-input"].value
      if (keyword.trim() === "") {
        alert('请正确输入您要搜索的城市！')
        return
      }
      if (this.data.length > 0) {
        const split = this.data[0].split('|');
        this.$refs["city-input"].value = split[1];
        this.$bus.$emit('getWeatherData', split[0], split[3])
      } else {
        alert('不妨搜搜城市的区县哟！')
      }
    },
    clickli(stationid, country, city) {
      this.$refs["city-input"].value = city;
      this.$bus.$emit('getWeatherData', stationid, country)
    },
    // 收缩
    listRetract() {
      setTimeout(() => {
        if (this.isExpand) {
          this.isExpand = false
          this.$refs["weather-search"].style.paddingBottom = '20px';
          this.$refs["weather-search"].style.height = '45px';
          this.$refs["search-list"].style.display = 'none';
        }
      }, 200)
    },
    // 展开
    listExpand() {
      if (this.isExpand) {
        return
      }
      this.isExpand = true
      this.$refs["weather-search"].style.paddingBottom = '0';
      this.$refs["weather-search"].style.height = '290px';
      this.$refs["search-list"].style.display = 'block';
    }
  }
}
</script>

<template>
  <div id="weather-search" ref="weather-search">
    <div class="search-input">
      <div>
        <input type="text" placeholder="请输入需要查找的城市" @keyup="searchCity" @keyup.enter="checkGetWeather"
               ref="city-input" maxlength="20" @focus="listExpand" @blur="listRetract">
      </div>
      <img src="@/assets/other/search.png" alt="" @click="checkGetWeather">
    </div>
    <div class="search-list" ref="search-list">
      <ul v-show="data != null && data.length > 0">
        <li v-for="city in data" :key="city.split('|')[0]"
            @click="clickli(city.split('|')[0],city.split('|')[3],city.split('|')[1])">
          <span class="city">{{ city.split('|')[1] }}</span>
          <div>
            <img src="@/assets/other/locate.png" alt="">
            <span class="country">{{ city.split('|')[3] }} - {{ city.split('|')[1] }} </span>
          </div>
        </li>
      </ul>
      <ul v-if="data.length === 0" style="height:215px">
        <li id="no-found">
          没有找到你输入的城市
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#weather-search {
  margin-top: 2vh;
  background: lightblue;
  width: 85%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8bbd0, #e1f5fe); /* 浅粉到浅蓝渐变 */
  /*padding-top: 20px;*/
  padding: 20px 0;
  height: 45px;
  transition: all .3s linear;
}

/*
#weather-search:hover {
  padding-bottom: 0;
  height: 290px;
}
*/

#weather-search > .search-input {
  width: 80%;
  display: flex;
}

#weather-search > .search-input > div {
  width: 100%;
  margin-right: 10px;
}

#weather-search > .search-input > div > input {
  height: 45px;
  width: 100%;
  border-radius: 30px;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0 15px;
}

#weather-search > .search-input > img {
  width: 45px;
  height: 45px;
  cursor: pointer;
}

#weather-search > .search-input > img:active {
  transform: translateY(2px) scale(0.98);
}

#weather-search > .search-list {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
  /*border-radius: 15px;*/
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  display: none;
  transition: all .3s ease-in-out;
  box-sizing: border-box;
}

/*
#weather-search:hover > .search-list {
  display: block;
  position: relative;
}
*/
#weather-search > .search-list > ul {
  list-style: none;
  width: 80%;
  margin: 10px auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}


#weather-search > .search-list > ul > li {
  width: 100%;
  height: 35px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 15px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 8px;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

#weather-search > .search-list > ul > li:active {
  transform: translateY(1px) scale(0.99)
}

#weather-search > .search-list > ul > li:hover {
  background: rgba(0, 0, 0, 0.1);
}

#weather-search > .search-list > ul > li:hover > span {
  color: rgba(255, 255, 255, 0.6);
  /*text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), !* 基础光晕 *! 0 0 2px rgba(255, 255, 255, 0.5); !* 锐利边缘光 *!*/
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3), /* 基础光晕 */ 0 0 2px rgba(153, 102, 204, 0.17); /* 锐利边缘光 */
}

#weather-search > .search-list > ul > li > span {
  text-align: center;
  font-size: 18px;
  color: #555555;
}

#weather-search > .search-list > ul > li > div {
  /*width: 150px;*/
  display: flex;
  justify-content: flex-start;
}

#weather-search > .search-list > ul > li > div > img {
  width: 30px;
  height: 30px;
}

#weather-search > .search-list > ul > li > div > span {
  font-size: 12px;
  min-width: 90px;
}

#weather-search > .search-list > ul > li > #no-found {
  text-align: center;
  font-size: 14px;
  color: #666666;
}
</style>