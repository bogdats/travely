;(function() {
	"use strict";

	let bestSlider = $('#best');
	bestSlider.slick({
		slide: '.ba-offer',
		nextArrow: bestSlider.find('[data-next]'),
		prevArrow: bestSlider.find('[data-prev]'),
		infinite: false
	});

	//change number of slide
	let currentSlideEl = $('[data-current-offer]');
	let totalSlideEl = $('[data-current-total]');

	let slidesCount = $('.ba-offer').length;

	slidesCount = slidesCount < 10 ? '0' + slidesCount : slidesCount;

	totalSlideEl.text(slidesCount); //set totall slidesCount

	bestSlider.on('beforeChange', (event, slick, curretSlide, nextSlide) => {
		nextSlide++;
		nextSlide = nextSlide < 10 ? '0' + nextSlide : nextSlide;
		currentSlideEl.text(nextSlide);
		
		// console.log('curentSlide');
		
	})

	//Mob nav toggle
	const menuToggleBtn = $('.ba-menu-toggle, .ba-overlay');
	const mobNav = $('.ba-mob-nav');

	menuToggleBtn.on('click', () => mobNav.toggleClass('ba-open'));

	var map;
	function baMap() {

	

		let mapCenter = {
			lat: 41.902782,
			lng: 12.496365
		};

	  let baMap = new google.maps.Map(document.getElementById('ba-map'), {
		center: mapCenter,
		zoom: 6,
		styles: [
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e9e9e9"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					},
					{
						"lightness": 29
					},
					{
						"weight": 0.2
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					},
					{
						"lightness": 18
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ffffff"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f5f5"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dedede"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#ffffff"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"saturation": 36
					},
					{
						"color": "#333333"
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f2f2f2"
					},
					{
						"lightness": 19
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#fefefe"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#fefefe"
					},
					{
						"lightness": 17
					},
					{
						"weight": 1.2
					}
				]
			}
		]
	  });
	  // The marker
	  let cities = {
		  rome: {lat: 41.902782, lng: 12.496365},
		  leon: {lat: 42.598724, lng: -5.567096},
		  cuenca: {lat: -2.900129, lng: -79.005898},
		  kiev: {lat:50.450100, lng: 30.523399}
	  }

	  var directionsService = new google.maps.DirectionsService;
	  var directionsDisplay = new google.maps.DirectionsRenderer;


	  

	  let mapMarkers = [];

	  for(let key in cities){
		console.log(cities[key]);

		var marker = new google.maps.Marker({
			position: cities[key], 
			map: baMap,
			icon: 'img/marker.svg',
			animation: google.maps.Animation.DROP			
		  });

		  var infowindow = new google.maps.InfoWindow({
			content: '<b>' + key + '</b>'
		  }); 
		  infowindow.open(baMap,marker);

		  mapMarkers[key] = marker;
	  }

	//on select city-sity
	$('#city-select').on('change', function (e) {
		console.log(this.value);

		baMap.panTo(cities[this.value]);
	})  



	directionsDisplay.setMap(baMap);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('city-select').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('city-select').value,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });





	}//function baMAp

	$(document).ready(function (e) {
		baMap();
	});



})();
