'use strict';

import L from "leaflet";

import "leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"

import 'leaflet/dist/leaflet.css';

const map = L.map('map', {
  center: L.latLng(49.2125578, 16.62662018),
  zoom: 14,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
  var type = e.layerType,
    layer = e.layer;
  drawnItems.addLayer(layer);
});

L.Edit.Rectangle.include({
  _createMoveMarker: function () {
    var bounds = this._shape.getBounds(),
      center = bounds.getCenter();
    console.warn("_createMoveMarker ----->>")
    this._moveMarker = this._createMarker(center, this.options.moveIcon);
  },
})