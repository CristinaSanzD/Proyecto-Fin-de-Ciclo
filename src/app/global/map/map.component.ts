import { Component, OnInit, Input, Output,  SimpleChanges, EventEmitter } from '@angular/core';
import ol from 'openlayers';
import { AppstateService } from '../../services/appstate.service';




@Component({
  selector: 'app-map',
  template: `<div id="map"></div>`
})
export class MapComponent implements OnInit {
  private map: ol.Map;

  constructor(private appStateService: AppstateService) {
  }

  ngOnInit() {
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
      ],
      target: document.getElementById('map'),
      view: new ol.View({
        center: ol.proj.transform([-3.669035099999999 , 40.3898296], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17
      })
    });
    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([-3.669035099999999, 40.3898296]))
                })
          ]
      })
  });
    this.map.addLayer(layer);
  }

}
