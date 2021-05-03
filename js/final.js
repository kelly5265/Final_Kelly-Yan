/* =====================
  Global Variables
===================== */
var housing_data
var parsedData
var parsedzip
var mapBoundary
var built_yr_0
var built_yr_1
var bedroom_num
var bathroom_num
var sale_jan = total_jan = 0
var sale_feb = total_feb = 0
var sale_mar = total_mar = 0
var sale_apr = total_apr = 0
var sale_may = total_may = 0
var sale_jun = total_jun = 0
var sale_jul = total_jul = 0
var sale_aug = total_aug = 0
var sale_sep = total_sep = 0
var sale_oct = total_oct = 0
var sale_nov = total_nov = 0
var sale_dec = total_dec = 0
var sale_yr1 = sqft_yr1 = 0
var sale_yr2 = sqft_yr2 = 0
var sale_yr3 = sqft_yr3 = 0
var sale_yr4 = sqft_yr4 = 0
var sale_yr5 = sqft_yr5 = 0

/* =====================
  Map Setup
===================== */
var mapOpts = {
  center: [42.327458477871, -71.08308792114258],
  zoom: 12
};
var map = L.map('map', mapOpts);

var tileOpts = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
};
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);


var zipcode = $.ajax('https://raw.githubusercontent.com/kelly5265/Final_Kelly-Yan/main/ZIP_Codes.json').done(function(raw){
  parsedzip = JSON.parse(raw)
})

// Price Style
var Style_price = function (feature) {
  return {
    radius: 0.000005 * feature.properties.SalePrice,
    fillOpacity: 0.8,
    color: "#cab227",
    weight: 0.6,
  }
}

// Construct Chart1 - # of transaction & total sale price by month
var constr_Chart1 = function () {
  var ctx_char1 = document.getElementById('Chart1').getContext('2d');
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Jan"}),function(e) {sale_jan=sale_jan+1,total_jan=total_jan+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Feb"}),function(e) {sale_feb=sale_feb+1,total_feb=total_feb+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Mar"}),function(e) {sale_mar=sale_mar+1,total_mar=total_mar+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Apr"}),function(e) {sale_apr=sale_apr+1,total_apr=total_apr+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "May"}),function(e) {sale_may=sale_may+1,total_may=total_may+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Jun"}),function(e) {sale_jun=sale_jun+1,total_jun=total_jun+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Jul"}),function(e) {sale_jul=sale_jul+1,total_jul=total_jul+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Aug"}),function(e) {sale_aug=sale_aug+1,total_aug=total_aug+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Sep"}),function(e) {sale_sep=sale_sep+1,total_sep=total_sep+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Oct"}),function(e) {sale_oct=sale_oct+1,total_oct=total_oct+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Nov"}),function(e) {sale_nov=sale_nov+1,total_nov=total_nov+e.feature.properties.SalePrice})
  _.each(_.filter(housing_data._layers, function (layer) {return layer.feature.properties.Sale_Mo === "Dec"}),function(e) {sale_dec=sale_dec+1,total_dec=total_dec+e.feature.properties.SalePrice})
  Chart1 = new Chart(ctx_char1, {
      data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
              type:'bar',
              label: 'Number of Transactions by Month',
              data: [sale_jan,sale_feb,sale_mar,sale_apr,sale_may,sale_jun,sale_jul,sale_aug,sale_sep,sale_oct,sale_nov,sale_dec],
              backgroundColor: [
                  'rgba(75,59,64,0.4)',
                  'rgba(130,115,92,0.4)',
                  'rgba(157,177,124,0.4)',
                  'rgba(156,222,159,0.4)',
                  'rgba(209,245,190,0.4)',
                  'rgba(245,277,224,0.4)',
                  'rgba(232,180,188,0.4)',
                  'rgba(210,130,166,0.4)',
                  'rgba(201,140,167,0.4)',
                  'rgba(231,109,131,0.4)',
                  'rgba(75, 192, 192, 0.4)',
                  'rgba(255, 206, 86, 0.4)'
              ],
              order: 2
          },{
            type:'line',
            label: 'Average Sale Price (10k) by Month',
            data: [total_jan/sale_jan/10000,total_feb/sale_feb/10000,total_mar/sale_mar/10000,total_apr/sale_apr/10000,total_may/sale_may/10000,total_jun/sale_jun/10000,total_jul/sale_jul/10000,total_aug/sale_aug/10000,total_sep/sale_sep/10000,total_oct/sale_oct/10000,total_nov/sale_nov/10000,total_dec/sale_dec/10000],
            order: 1
        }]
      }
  });
}

// Construct Chart2 - # of transaction & price per sqft by built year
var constr_Chart2 = function () {
  var ctx_char2 = document.getElementById('Chart2').getContext('2d');
  _.each(_.filter(housing_data._layers, function (layer) { if (layer.feature.properties.YR_REMOD != 0) {return layer.feature.properties.YR_REMOD < 1900} else {return layer.feature.properties.YR_BUILT < 1900}}),function(e) {sale_yr1=sale_yr1+1,sqft_yr1=sqft_yr1+e.feature.properties.PricePerSq})
  _.each(_.filter(housing_data._layers, function (layer) { if (layer.feature.properties.YR_REMOD != 0) {return layer.feature.properties.YR_REMOD >= 1900 && layer.feature.properties.YR_REMOD < 1950} else {return layer.feature.properties.YR_BUILT >= 1900 && layer.feature.properties.YR_BUILT < 1950}}),function(e) {sale_yr2=sale_yr2+1,sqft_yr2=sqft_yr2+e.feature.properties.PricePerSq})
  _.each(_.filter(housing_data._layers, function (layer) { if (layer.feature.properties.YR_REMOD != 0) {return layer.feature.properties.YR_REMOD >= 1950 && layer.feature.properties.YR_REMOD < 2000} else {return layer.feature.properties.YR_BUILT >= 1950 && layer.feature.properties.YR_BUILT < 2000}}),function(e) {sale_yr3=sale_yr3+1,sqft_yr3=sqft_yr3+e.feature.properties.PricePerSq})
  _.each(_.filter(housing_data._layers, function (layer) { if (layer.feature.properties.YR_REMOD != 0) {return layer.feature.properties.YR_REMOD >= 2000 && layer.feature.properties.YR_REMOD < 2010} else {return layer.feature.properties.YR_BUILT >= 2000 && layer.feature.properties.YR_BUILT < 2010}}),function(e) {sale_yr4=sale_yr4+1,sqft_yr4=sqft_yr4+e.feature.properties.PricePerSq})
  _.each(_.filter(housing_data._layers, function (layer) { if (layer.feature.properties.YR_REMOD != 0) {return layer.feature.properties.YR_REMOD >= 2010} else {return layer.feature.properties.YR_BUILT >= 2010}}),function(e) {sale_yr5=sale_yr5+1,sqft_yr5=sqft_yr5+e.feature.properties.PricePerSq})
  Chart2 = new Chart(ctx_char2, {
      data: {
          labels: ['<1990','1990-1950','1950-2000','2000-2010','>2010'],
          datasets: [{
              type:'bar',
              label: 'Number of Transactions by Built/Modification year',
              data: [sale_yr1,sale_yr2,sale_yr3,sale_yr4,sale_yr5],
              backgroundColor: [
                'rgba(75,59,64,0.4)',
                'rgba(157,177,124,0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(210,130,166,0.4)',
                'rgba(231,109,131,0.4)',
              ],
              order: 2
          },{
            type:'line',
            label: 'Average Sale Price/sqft by Built/Modification year',
            data: [sqft_yr1/sale_yr1,sqft_yr2/sale_yr2,sqft_yr3/sale_yr3,sqft_yr4/sale_yr4,sqft_yr5/sale_yr5],
            order: 1
        }]
      }
  });
}


// This function filters our data and plots it
var filterAndPlot = function() {
  var filterPredicate = function(layer) {
    var conditionStatus = true;
    built_yr_0 = $('#year_built_0').val()
    built_yr_1 = $('#year_built_1').val()
    bedroom_num = $('#sel_bd_num').val() 
    bathroom_num = $('#sel_ba_num').val()
    if (bathroom_num != "All") {
       conditionStatus = conditionStatus && Number (bathroom_num) === layer.feature.properties.R_FULL_BTH; 
      }
    if (bedroom_num !== "All") {
       conditionStatus = conditionStatus && Number (bedroom_num) === layer.feature.properties.R_BDRMS;
      }
    if (Number (built_yr_0) !== 0) {
      conditionStatus = conditionStatus && Number (built_yr_0) < layer.feature.properties.YR_BUILT 
    }
    if (Number (built_yr_1) !== 0) {
      conditionStatus = conditionStatus && Number (built_yr_1) > layer.feature.properties.YR_BUILT 
    }
    return conditionStatus
  };
  var filtered = _.filter(housing_data._layers, filterPredicate)
  map.eachLayer(function (layer) {
    if (layer != Stamen_TonerLite)
    {map.removeLayer(layer)}
  });
  _.each(filtered,function (e) {map.addLayer(e)})
}

// Search Function
$('#search').click(filterAndPlot)

//Individual Popup
var eachFeaturePopup = function(layer) {
  layer.on('click', function (event) {
      $('.address').text(layer.feature.properties.full_addre)
      $('.zip_ind').text(layer.feature.properties.ZIPCODE.toString())
      $('.pri').text(layer.feature.properties.SalePrice.toString())
      $('.sale_mo').text(layer.feature.properties.Sale_Mo)
      $('.sale_da').text(layer.feature.properties.Sale_Date)
      $('.sale_yr').text(layer.feature.properties.Sale_Yr.toString())
      $('.floor_num').text(layer.feature.properties.NUM_FLOORS.toString())
      $('.ba').text(layer.feature.properties.R_BDRMS.toString())
      $('.bd').text((layer.feature.properties.R_FULL_BTH+layer.feature.properties.R_HALF_BTH).toString())
      $('.liv_area').text(layer.feature.properties.LivingArea.toString())
      if (layer.feature.properties.YR_BUILT === 0) {
        $('.bui_yr').text("N/A")
      } else {
        $('.bui_yr').text(layer.feature.properties.YR_BUILT.toString())
      }
      if (layer.feature.properties.YR_REMOD === "0") {
        $('.remo_yr').text("N/A")
      } else {
        $('.remo_yr').text(layer.feature.properties.YR_REMOD.toString())
      }
      if (layer.feature.properties.OWN_OCC === "Y") {
        $('.owner').text("Yes")
      } else {
        $('.owner').text("No")
      }
      $('#single_result').show();
      $('#greeting').hide();
      var bounds = event.target.getBounds()
      map.fitBounds (bounds)
  });
};

// Change Map Status
// Individual
var map_single = function () {
  $('#zip_result').hide();
  $('#single_result').hide();
  map.eachLayer(function (layer) {
    if (layer != Stamen_TonerLite)
    {map.removeLayer(layer)}
  });
  housing_data = L.geoJson (parsedData, {
    pointToLayer: function (feature,latlng) {
    return L.circleMarker (latlng, Style_price(feature))
    }
  }).addTo(map)
  housing_data.eachLayer(eachFeaturePopup)
  $('#single_view').prop("disabled",true)
  $('#cluster_view').prop("disabled",false)
  $('#greeting').show();
}
// By Zipcode
var map_cluster = function () {
  $('#zip_result').hide();
  $('#single_result').hide();
  map.eachLayer(function (layer) {
    if (layer != Stamen_TonerLite)
    {map.removeLayer(layer)}
  });
  mappedGrid = L.geoJson(turf.count(parsedzip, parsedData, 'captured'), {
    style: function(feature) {
      return {
        color:'black',
        weight: 0.7,
        fillColor: '#cab227',
        fillOpacity: (feature.properties.captured * 0.008)
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("# of Housing Transactions in Zipcode (" + feature.properties.ZIP5 + "): " + feature.properties.captured, {closeButton: false, offset: L.point(0, -20)});
      layer.on ('click',function (e) {
        var target_zip = Number (e.target.feature.properties.ZIP5)
        var total_bd = 0
        var total_ba = 0
        var total_pri = 0
        var avg_pri = 0
        var total_gro = 0
        var total_liv = 0
        var count = 0
        _.each(housing_data._layers,function (layer) {
          if (layer.feature.properties.ZIPCODE == target_zip) {
            total_bd = total_bd + layer.feature.properties.R_BDRMS
            total_ba = total_ba + layer.feature.properties.R_FULL_BTH + 0.5 * layer.feature.properties.R_HALF_BTH
            total_pri = total_pri + layer.feature.properties.SalePrice
            avg_pri = avg_pri + layer.feature.properties.PricePerSq
            total_gro = total_gro + layer.feature.properties.GROSS_AREA
            total_liv = total_liv + layer.feature.properties.LivingArea
            count = count + 1
          }
        })
        $('.zip').text((target_zip).toString())
        $('.avg_bd_num').text((total_bd/count).toFixed(2).toString())
        $('.avg_ba_num').text((total_ba/count).toFixed(2).toString())
        $('.avg_sale').text((total_pri/count).toFixed(2).toString())
        $('.avg_sale_unit').text((avg_pri/count).toFixed(2).toString())
        $('.gross_area').text((total_gro/count).toFixed(2).toString())
        $('.living_area').text((total_liv/count).toFixed(2).toString())
        $('#zip_result').show();
        $('#greeting').hide();
        var bounds = e.target.getBounds()
        map.fitBounds (bounds)
      })
    }
  }).addTo(map);
  $('#cluster_view').prop("disabled",true)
  $('#single_view').prop("disabled",false)
  $('#greeting').show();
}

$('#single_view').click(map_single)
$('#cluster_view').click(map_cluster)
$('#clear').click(map_single)

/* ====================
  Application execution
===================== */
// main function
$(document).ready(function() {
  $.ajax('https://raw.githubusercontent.com/kelly5265/Final_Kelly-Yan/main/bostonHousePriceData.geojson').done(function(raw){
    parsedData = JSON.parse(raw)
    map_single()
    constr_Chart1()
    constr_Chart2()
  })
});