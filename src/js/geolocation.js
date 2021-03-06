export default {
  dev: false,
  lat: "",
  lng: "",
  latlng: "",
  key: "",
  // urlJson: "https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_2",
  urlJson: "http://nominatim.openstreetmap.org/reverse?format=json",
  cidade: "São Paulo",
  geolocation: null,
  log(object) {
    if (this.dev) console.log(object);
  },
  start() {
    const promiseCallback = (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.preencherDados(position)
              .then(() => {
                resolve(this.cidade);
              })
              .catch(reject);
          },
          function (error) {
            // callback de erro
            //alert('Erro ao obter localização!');
            console.log("Erro ao obter localização.", error);
          }
        );
      } else {
        throw new Error("Erro");
      }
    };
    return new Promise(promiseCallback);
  },
  doGet(url) {
    const promiseCallback = (resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Erro ao executar requisição, Status: $(response.status)");
          return response.json();
        })
        .then(resolve)
        .catch(reject);
    };
    return new Promise(promiseCallback);
  },
  preencherDados(position) {
    return new Promise((resolve, reject) => {
      var lt = position.coords.latitude;
      var lg = position.coords.longitude;
      this.lat = `${lt}`;
      this.lng = `${lg}`;
      this.latlng = `${lt},${lg}`;
      // this.lat = position.coords.latitude;
      // this.lng = position.coords.longitude;
      this.pegarCidade().then(resolve).catch(reject);
    });
  },
  pegarCidade() {
    return new Promise((resolve, rej) => {
      let url = `${this.urlJson}&lat=${this.lat}&lon=${this.lng}`;
      this.log(url);
      this.doGet(url)
        .then((response) => {
          this.log(response);
          if (!response.error) {
            // this.cidade = response.results[0].address_components[0].long_name; //GoogleAPI
            this.cidade = response.address.city;
          } else {
            this.cidade = "São Paulo";
          }
          resolve(this.cidade);
        })
        .catch((reject) => {
          rej;
        });
    });
  },
};
