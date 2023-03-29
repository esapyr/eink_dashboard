<script>
  import { miscIcons, daytimeWeatherIcons, nighttimeWeatherIcons } from '../data';
  import { Col, Row, Container, Card, CardHeader, CardBody, CardFooter, CardTitle, Icon } from 'sveltestrap';

  /**@type {import('./$types').PageData} */
  export let data;

  class Icons {
    constructor(nightIcons, dayIcons, miscIcons){
      this.icons = {
        n: nightIcons,
        d: dayIcons,
        misc: miscIcons
      }
    }

    for(partOfDay, weatherID) {
      return this.icons[partOfDay][weatherID.toString()];
    }

    get sunset() {
      return this.icons.misc.sunrise;
    }

    get sunrise() {
      return this.icons.misc.sunrise;
    }
  }


  class Weather {
    constructor(apiData, icons) {
      this.icons = icons;
      this.weather = apiData.weather[0];
      this.main = apiData.main;

      this.sunset = new Date(apiData.sys.sunset * 1000);
      this.sunrise = new Date(apiData.sys.sunrise * 1000);
      this.timestamp = new Date(apiData.dt * 1000);

      this.stringDate = this.timestamp.toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'}) 
    }

    get icon() {
      return this.icons.for(this.pod(), this.weather.id);
    }

    get description() {
      return this.weather?.description;
    }

    get temperature() {
      return Math.round(this.main.temp);
    }

    displayFeelsLike() {
      return Math.round(this.main.feels_like);
    }

    get humidity() {
      return this.main.humidity;
    }

    get pressure() {
      return this.main.pressure;
    }

    displaySunrise(){
      return this.sunrise.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
    }

    displaySunset(){
      return this.sunset.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
    }

    get dayOfWeek() {
      return this.stringDate.split(',')[0];
    }

    get date() {
      return this.stringDate.split(',')[1];
    }
    
    pod() {
      if(this.timestamp >= this.sunset) {
        return "n";
      } else {
        return "d";
      }
    }
  }

  class Forecast {
    constructor(apiData, icons) {
      this.icons = icons;
      this.pod = apiData.sys.pod;
      this.main = apiData.main;
      this.weather = apiData.weather[0];
      this.timestamp = new Date(apiData.dt * 1000);
    }

    get description() {
      return this.weather.description;
    }

    get temperature() {
      return Math.round(this.main.temp);
    }

    get hour() {
      return this.timestamp.toLocaleTimeString('en-US', {hour: '2-digit'});
    }

    get icon() {
      return this.icons.for(this.pod, this.weather.id); 
    }
  }

  const icons = new Icons(nighttimeWeatherIcons, daytimeWeatherIcons);
  const weather = new Weather(data.weather, icons);
  const forecasts = data.forecast.list.map(f => new Forecast(f, icons));
</script>

<Container class="p-0 eink_dashboard" style="width:800px; height:480px;">
  <Card style="height: 480px;">

    <CardHeader class="bg-white" style="border-style: none;">
      <CardTitle>
        <Row style="color: rgb({data.colors.black.join(',')});">
          <Col xs="3">
            <h1>{weather.date}</h1>
          </Col>
          <Col xs="5" style="text-align: center;">
            <i class="wi wi-sunrise" /> {weather.displaySunrise()} | <i class="wi wi-sunset" /> {weather.displaySunset()}
          </Col>
          <Col xs="4" style="text-align: right;">
            <h1>{weather.dayOfWeek}</h1>
          </Col>
        </Row>
      </CardTitle>
    </CardHeader>

    <CardBody class="pt-0 pb-0">
      <Row class="mt-4" style="color: rgb({data.colors.black.join(',')});">
        <Col xs="3"></Col>
        <Col xs="5" style="text-align: center; font-size: 5rem;">
          <b><i class="wi wi-{weather.icon}"/> {weather.temperature}<i class="wi wi-fahrenheit" /> </b>
        </Col>
        <Col xs="4"></Col>
      </Row>
      <Row style="margin-top: -25px; color: rgb({data.colors.black.join(',')});">
        <Col xs="3"></Col>
        <Col xs="5" style="text-align: center; font-size: 3rem;">
          <i><b>{weather.description} </b></i>
        </Col>
        <Col xs="4"></Col>
      </Row>
    </CardBody>

    <CardFooter style="font-size: 2.5rem" class="p-0 bg-white">
      <Row>
        {#each forecasts as forecast}
          <Col>
            <Row style="text-align: center">
              <span class="mb-2" style="font-size: 1rem">{forecast.hour}</span>
            </Row>
            <Row style="text-align: center">
              <i class="wi wi-{forecast.icon}" />
              <span>{Math.round(forecast.temperature)}</span>
            </Row>
          </Col>
        {/each}
      </Row>
    </CardFooter>
  </Card>
</Container>
