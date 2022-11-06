<script lang="ts">
  import { onDestroy, onMount } from "svelte";
import Chart from "./lib/Chart.svelte";
import type{ MyChart}  from "./lib/data";
import heart from "./img/heart.png";
import timer from "./img/timer.png";
    import { HtmlTag } from "svelte/internal";


  let req;
  const start = Date.now();

  let seco = 0,
    minu = 0,
    hour = 0;

  const measureTime = () => {
    const elapsed = Date.now() - start;
    req = requestAnimationFrame(measureTime);// 있어보이는 단어
    seco = Math.floor(elapsed / 1000);
    if (seco >= 60) {//분 구하기
      minu = Math.floor(seco / 60);
      seco = seco % 60;
    }
    if (minu >= 60) {//시 구하기
      hour = Math.floor(minu / 60);
      minu = minu % 60;
    }
  };
  measureTime();
  //-----------------s

  let interval;
  onMount(() => {//차트 업데이트 함수 실행
    interval = setInterval(updata, 10000);
  });

  onDestroy(() => {
    cancelAnimationFrame(req);
    clearInterval(interval);
  });

  let bpm = 70;
  let lowBpm = null;
  let highBpm = null;
  let meanBpm;
  let count = 0;
  let aggBpm = 0;
  let IR ;
  let minute = 0;
  let data = 0;
  let number = 0;


  let chart: MyChart | null
  const updata = () => {//차트 업데이트 함수
   // bpm = Math.floor(Math.random()*10)
    
    IR = Number(data)
    bpm = Math.round(IR / 1317);


    if ((lowBpm === null) || (bpm < lowBpm)) lowBpm = bpm;
    if(highBpm === null || bpm > highBpm) highBpm = bpm;

    number++;
    count++;
    aggBpm += bpm
    meanBpm = Math.floor(aggBpm / count)
    
    if(chart === null) return
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(bpm)
      chart.data.labels.push(String(minute))
      minute ++
    })

    if(minute > 30){
    chart.data.datasets.forEach(dataset => {
      dataset.data.shift();
      chart.data.labels.shift();
    })}
    
    chart.update()}



  const update = async () => {//서버에 bpm값 요청
    const response = await fetch('http://192.168.21.155/');
    const json = await response.json();
    data = json.data;
    console.log(data);
  }
  onMount(() => {
    interval = setInterval(update, 10000);
  });

</script>

<main >
  <div id="good">
    <div id="time">
      <img src="{timer}" alt="" id="timer">
      <div class="intime">측정 시간</div>
      <div class="intime">{hour}:{minu}:{seco}</div>
    </div>
    <div class="containNumber">
      <img src={heart} alt="" id="heart"><span id="bpmNumber">{bpm}</span><span class="bpm">bpm</span>
    </div>
    <Chart bind:chart={chart} />
    <div id="minute">시간(분)</div>
    <br />
    <div class="include">
      <span class="barText">최저</span> <span class="barBpm">{lowBpm}bpm</span>
    </div>
    <div class="barGraph"><div style="width :{lowBpm}px" id="lowest" /></div>

    <div class="include">
      <span class="barText">최고</span> <span class="barBpm">{highBpm}bpm</span>
    </div>
    <div class="barGraph"><div style="width:{highBpm}px" id="average" /></div>

    <div class="include">
      <span class="barText">평균</span> <span class="barBpm">{meanBpm}bpm</span>
    </div>
    <div class="barGraph"><div style="width:{meanBpm}px" id="highest" /></div> 
  </div>

</main>

<style>
  #heart{
width: 4vh;
height: 4vh;
font-size: 3vh;
text-align: center;
word-spacing: -2px;
margin-left: 13%;
  }  
  #timer{
    padding-top: 0px;
    width: 5.5vh;
    height: 5vh;
    font-size: 3vh;
    text-align: center;
  }
  :global(body) {
    background-color: white;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #good {
    background-color: white;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  main {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
  }
  #time {
    font-size: 231%;
    display: inline-block;
    width: 100%;
    height: 15%;
  }
  .intime {
    font-size: 45%;
    margin-left: 2%;
    width: 50%;
  }
  .containNumber {
    background-color: #eaeaea;
    width: 40%;
    height: 4%;
    border-radius: 50px;
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 4%;
    padding-top: 2%;
    padding-bottom: 3%;
    display: flex;
  }
  #bpmNumber {
    font-size: 3vh;
    text-align: center;
    word-spacing: -2px;
    margin-left: 7%;
  }
  .bpm {
    font-size: 1.5vh;
    color: #959595;
    margin-top: 7%;
    margin-left: 2%;
  }
  #minute {
    text-align: right;
    font-size: 70%;
    color: #959595;
    margin-right: 7%;
  background-color: s;
  }
  .include {
    width: 95%;
    height: 3%;
    margin-left: 4%;
    padding-top: 3%;
  }
  .barGraph {
    display: block;
    width: 90%;
    height: 14px;
    z-index: 1;
    background-color: #eaeaea;
    margin-left: 4%;
  }
  #lowest {
    background-color: #ffeb36;
    width: 100px;
    height: 14px;
    z-index: 10;
    padding-left: 37px;
  }
  #average {
    background-color: #ff6262;
    width: 200px;
    height: 14px;
    z-index: 10;
    padding-left: 37px;
  }
  #highest {
    background-color: #ffb55f;
    width: 150px;
    height: 14px;
    z-index: 10;
    padding-left: 37px;
  }
  .barBpm {
    font-size: 70%;
    color: #959595;
    margin-top: 1.5%;
    padding-left: 75%;
  }
  .barText {
    font-size: 70%;
    color: #959595;
    margin-top: 1.5%;
  }
  br {
    height: 10px;
  }
</style>

