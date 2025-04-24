const socket = io();
// console.log("Socket connected on client");

if (navigator.geolocation) {
  //position watch krta h,Watchposition 3rdThing uski setting vi pas kr stkeHai
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0, //koi saved data nhii, caching nhi hogi, jbhi data need ho at the time data lena-cache me save mt krna
      timeout: 5000, //har 5 sec pe req check krega/jayega
    }
  );
}
// LeafLet
// Location.map();
var map = L.map("map").setView([0, 0], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Aditiii",
}).addTo(map);

const markers = {};

socket.on("Receive-Location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 17);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.");
  }
});

socket.on("User-Disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
