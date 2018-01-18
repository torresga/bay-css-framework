//#### src/js/bayada-findanoffice-app.js
/* global Modernizr: true, Bayada: true */

$(document).ready(function() {
    var viewModel = new Bayada.FindAnOfficeModel();

    ko.applyBindings(viewModel, $('[data-bayada-class="find-an-office"]').get(0));

    // Need to set some values based on if this is loaded on a Mobile Device vs. a Desktop so we can set some defaults
    var updateModel = function() {

        if( Modernizr.mq( 'screen and ( max-width: 650px )' ) ) {
            viewModel.searchCriteria.shownFilters(false);
        } else {
            viewModel.searchCriteria.shownFilters(false);
        }

    };

    $(window).resize(_.throttle( function(){
        updateModel();
    }, 100));

    updateModel();

});


//#### src/js/utils/bayada-enableTooltip.js
/* global qtip: true */

// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.enableTooltip = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

			var value = valueAccessor();
			var valueUnwrapped = ko.unwrap(value);

			if (valueUnwrapped) {

				$(element).qtip({
					style: {
						classes: 'bayada-tooltip'
					},
					content: {
						text: valueUnwrapped
					},
					position: {
						my: 'bottom center',  // Position my top left...
						at: 'top center' // at the bottom right of...
					},
					show: {
						solo: true,
						delay: 500
					},
					hide: {
						fixed: true,
						delay: 200
					}
				});
			}
        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));


//#### src/js/utils/bayada-fixToTop.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.fixToTop = {
        init: function(element, valueAccessor, allBindings, bindingContext) {
            var $element       = $(element),
                elementOffset  = $element.offset(),
                elementY       = elementOffset.top,
                width, paddingLeft, paddingRight;

            var calculateWidth = function(){
                // In order to let this flex, we need a wrapper around the bound element
                // and use that width to update the inner width.
                var parentWidth    = $element.parent().outerWidth(),
                    elementPadding = paddingLeft + paddingRight;

                paddingLeft  = parseInt($element.css('paddingLeft'), 0);
                paddingRight = parseInt($element.css('paddingRight'), 0);
                width        = parentWidth - elementPadding;

            };

            var setWidth = function(){
                calculateWidth();
                $element.css({ width: width, paddingLeft: paddingLeft, paddingRight: paddingRight });
            };

            var resetElement = function(){
                $element.removeClass('bayada-state-fixed').removeAttr('style');
            };

            var resizeElement = function(){
                setWidth();
                if( Modernizr.mq('screen and ( max-width: 650px )') ){
                    resetElement();
                }
            };

            var isFixed = function(){

                if( !Modernizr.mq('screen and ( max-width: 650px )') ){

                    var windowY = $(window).scrollTop();

                    if( windowY >= elementY ){
                        calculateWidth();
                        $element.addClass('bayada-state-fixed').css({ width: width, paddingLeft: paddingLeft, paddingRight: paddingRight });
                    } else {
                        resetElement();
                    }

                } else {
                    resetElement();
                }

            };

            // Shouldn't be setting widths in js but google maps need this and
            // so the element doesn't change widths when made position: fixed...
            calculateWidth();
            $element.css({ width: width });

            isFixed();

            $(window).scroll(_.throttle(isFixed, 100)).resize(_.throttle(setWidth, 100));

        }

    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-googleAutocomplete.js
/* global place: true */

// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.googleAutocomplete = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var googleAutocomplete,
                options = {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: 'us'
                    }
                };

            googleAutocomplete = new google.maps.places.Autocomplete(element, options);

            google.maps.event.addListener(googleAutocomplete, 'place_changed', function(){
                var place   = googleAutocomplete.getPlace(),
                    lat     = place.geometry.location.d,
                    lng     = place.geometry.location.e,
                    address = place.formatted_address;

                bindingContext.$root.searchCriteria.latitude(lat);
                bindingContext.$root.searchCriteria.longitude(lng);
                bindingContext.$root.searchCriteria.locationName(address);
            });

            // Initialize the autocomplete
            $( element ).data("autocomplete", googleAutocomplete);

        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-googleMap.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    var searchLocationMarkerImage = {
        url: 'images/bayada-map-current-location-marker.png',
        size: new google.maps.Size(26,31),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13,15)
    };

    var officeLocationMarkerImage = {
        url: 'images/bayada-map-office-location-marker.png',
        size: new google.maps.Size(18,23),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(9,23)
    };

    var markers = [];

    ko.bindingHandlers.googleMap = {

        init: function(element, valueAccessor) {
            var $element   = $(element),
                map,
                center     = ko.unwrap( valueAccessor().center ).split(','),
                mapCenter  = new google.maps.LatLng( center[0], center[1] ),
                mapOptions = {
                    zoom: 12,
                    center: mapCenter,
                    scrollwheel: false,
                    panControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };

            map = new google.maps.Map(element, mapOptions);

            // Initialize the map
            $element.data("googleMap", map);

            var resizeMap = function(){
                google.maps.event.trigger(map, 'resize');
            };

            $(window).resize(_.throttle(resizeMap, 100));

        },
        update: function(element, valueAccessor) {

            var mapview = valueAccessor().mapview,
                map     = $(element).data().googleMap;

            if (mapview === true) {
                google.maps.event.trigger(map, 'resize');
            }

            var setMarkers = function(map) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                }
            };

            var deleteMarkers = function() {
                setMarkers(null);
                markers = [];
            };

            var updateCenter = function() {

                deleteMarkers();

                var center    = ko.unwrap( valueAccessor().center ).split(','),
                    mapCenter = new google.maps.LatLng( center[0], center[1] );

                var searchLocationMarker = new google.maps.Marker({
                    map: map,
                    position: mapCenter,
                    icon: searchLocationMarkerImage
                });
                markers.push(searchLocationMarker);

                map.setCenter(mapCenter);

            };

            updateCenter();

        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-googleMapDetail.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    var officeLocationMarkerImage = {
        url: 'images/bayada-map-office-location-marker.png',
        size: new google.maps.Size(18,23),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(9,23)
    };

    var detailMarkers = [];

    ko.bindingHandlers.googleMapDetail = {

        init: function(element, valueAccessor) {
            var $element   = $(element),
                map,
                center     = ko.unwrap( valueAccessor().center ).split(','),
                mapCenter  = new google.maps.LatLng( center[0], center[1] ),
                mapOptions = {
                    zoom: 12,
                    center: mapCenter,
                    scrollwheel: false,
                    panControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };

            map = new google.maps.Map(element, mapOptions);

            // Initialize the map
            $element.data("googleMap", map);

            var resizeMap = function(){
                google.maps.event.trigger(map, 'resize');
            };

            $(window).resize(_.throttle(resizeMap, 100));

        },
        update: function(element, valueAccessor) {

            var map = $(element).data().googleMap;

            var setMarkers = function(map) {
                for (var i = 0; i < detailMarkers.length; i++) {
                    detailMarkers[i].setMap(map);
                }
            };

            var deleteMarkers = function() {
                setMarkers(null);
                detailMarkers = [];
            };

            var updateCenter = function() {

                deleteMarkers();

                var center    = ko.unwrap( valueAccessor().center ).split(','),
                    mapCenter = new google.maps.LatLng( center[0], center[1] );

                var locationMarker = new google.maps.Marker({
                    map: map,
                    position: mapCenter,
                    icon: officeLocationMarkerImage
                });
                detailMarkers.push(locationMarker);

                map.setCenter(mapCenter);
                map.setZoom(12);

            };

            updateCenter();

        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-googleMapSearchResults.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    var searchLocationMarkerImage = {
        url: 'images/bayada-map-current-location-marker.png',
        size: new google.maps.Size(26,31),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13,15)
    };

    var officeLocationMarkerImage = {
        url: 'images/bayada-map-office-location-marker.png',
        size: new google.maps.Size(18,23),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(9,23)
    };

    var searchLocationMarkers = [],
        officeLocationMarkers = [];

    ko.bindingHandlers.googleMapSearchResults = {

        init: function(element, valueAccessor) {
            var $element   = $(element),
                map,
                center     = ko.unwrap( valueAccessor().center ).split(','),
                mapCenter  = new google.maps.LatLng( center[0], center[1] ),
                mapOptions = {
                    zoom: 12,
                    center: mapCenter,
                    scrollwheel: false,
                    panControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };

            map = new google.maps.Map(element, mapOptions);

            // Initialize the map
            $element.data("googleMap", map);

            var resizeMap = function(){
                google.maps.event.trigger(map, 'resize');
            };

            $(window).resize(_.throttle(resizeMap, 100));

        },
        update: function(element, valueAccessor) {

            var offices = valueAccessor().offices(),
                mapview = valueAccessor().mapview,
                map     = $(element).data().googleMap;

            if (mapview === true) {
                google.maps.event.trigger(map, 'resize');
            }

            var addMarker = function(position, icon, animation, array) {

                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    icon: icon
                });

                if ( animation !== false ) {
                    marker.setAnimation(google.maps.Animation.DROP);
                } else {
                    marker.setAnimation(null);
                }

                array.push(marker);
            };

            var setMarkers = function(map, array) {
                for (var i = 0; i < array.length; i++) {
                    array[i].setMap(map);
                }
            };

            var deleteMarkers = function() {
                setMarkers(null, searchLocationMarkers);
                searchLocationMarkers = [];
                setMarkers(null, officeLocationMarkers);
                officeLocationMarkers = [];
            };

            var updateCenter = function() {

                deleteMarkers();

                var center    = ko.unwrap( valueAccessor().center ).split(','),
                    mapCenter = new google.maps.LatLng( center[0], center[1] ),
                    bounds    = new google.maps.LatLngBounds();

                addMarker( mapCenter, searchLocationMarkerImage, false, searchLocationMarkers );

                for ( var index = 0; index < offices.length; ++index ) {
                    var location = new google.maps.LatLng( offices[index].MailingAddressLatitude(), offices[index].MailingAddressLongitude() );
                    addMarker( location, officeLocationMarkerImage, false, officeLocationMarkers );
                    bounds.extend( location );
                }

                setMarkers(map, officeLocationMarkers);
                map.setCenter(mapCenter);
                map.fitBounds(bounds);

            };

            updateCenter();

        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-loadingAnimation.js
/* global place: true */

// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.loadingAnimation = {
        update: function(element, valueAccessor, allBindings) {
            var $element = $(element);
            var isLoading = valueAccessor();

            if (!Modernizr.cssanimations) {
                if (isLoading === false) {
                    $element.delay(800).hide();
                } else {
                    $element.show();
                }
            }
        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-phoneNumberLink.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.phoneNumberLink = {
        init: function(element, valueAccessor, allBindings, bindingContext) {
            var number = valueAccessor();
            $(element).attr( 'href', 'tel:+' + number() );
        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/utils/bayada-proxy.js
$.ajaxPrefilter("json", function(options, originalOptions) {
    if (options.url.match(/odata/)) {
        options.url = '/app/ba-simple-proxy.php?mode=native&url=' + encodeURIComponent("http://54.236.246.206:8989" + options.url + "?" + options.data);
        options.data = null;
    }
});


//#### src/js/utils/bayada-serviceClassName.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    ko.bindingHandlers.serviceClassName = {
        init: function(element, valueAccessor, allBindings, bindingContext) {
            var service = ko.unwrap( valueAccessor() ).toString();
            $(element).addClass( "bayada-service-type-" + service.replace(/\s+/g, '-').toLowerCase() );
        }
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/models/bayada-Office.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    Bayada.Office = function(data) {
        if (data) {
            ko.mapping.fromJS(data, {}, this);
        }

        var self = this;

        this.selected = ko.observable(false);

        this.formattedAddress = ko.computed(function(){
            return data.MailingAddress1 + ', ' + data.MailingAddressCity + ', ' + data.MailingAddressState + ' ' + data.MailingAddressZipCode;
        });

        this.formattedCityStateZip = ko.computed(function(){
            return data.MailingAddressCity + ', ' + data.MailingAddressState + ' ' + data.MailingAddressZipCode;
        });

        this.formattedDirector = ko.computed(function(){
            return data.DirectorName + ', Director';
        });

        var formatContactNumber = function(number) {
            return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        };

        this.formattedPhoneNumber = ko.computed(function(){
            var number = data.Phone;
            if (number !== null) {
                return formatContactNumber(number);
            }
        });

        this.formattedFaxNumber = ko.computed(function(){
            var number = data.Fax;
            if (number !== null) {
                return formatContactNumber(number);
            }
        });

        this.emailLink = ko.computed(function(){
            return "mailto:" + data.EmailAddress;
        });

        this.distanceFromSearch = ko.computed(function(){
            return data.Distance.toFixed(1) + " miles";
        });

        this.directionsLink = ko.computed(function(){
            var googleMapsURL = "https://www.google.com/maps/preview/dir//",
                address       = data.MailingAddress1 + ', ' + data.MailingAddressCity + ', ' + data.MailingAddressState + ', ' + data.MailingAddressZipCode,
                query         = address.replace(/\s+/g, '+');
            return googleMapsURL + query;
        });

        this.location = ko.computed(function(){
            return data.MailingAddressLatitude + ',' + data.MailingAddressLongitude;
        }).extend({ throttle: 100 });

        this.showShareLocationDialog = ko.observable(false);
        this.openShareLocationDialog = function() {
            self.showShareLocationDialog(true);
        };

        this.closeShareLocationDialog = function() {
            self.showShareLocationDialog(false);
        };

    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/models/bayada-SearchCriteria-W3.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    Bayada.SearchCriteria = function() {
        var self = this;

        this.search = ko.observable();

        this.resultLimit = ko.observable(10);

        this.latitude = ko.observable(null);
        this.longitude = ko.observable(null);
        this.locationName = ko.observable(null);

        // W3 current location with MaxMind fallback
        var geocoder = new google.maps.Geocoder();

        function fallbackToDefaultLocation() {
            self.latitude("39.9675948");
            self.longitude("-74.988900");
            self.locationName("Moorestown, NJ, United States");
        }

        function getAddressFromGoogle(lat, lng) {
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    //console.log(results);
                    if (results[1]) {
                        //formatted address
                        self.locationName(results[0].formatted_address);
                    } else {
                        window.alert("No results found");
                        fallbackToDefaultLocation();
                    }
                } else {
                    window.alert("Failed to determine your location due to: " + status);
                        fallbackToDefaultLocation();
                }
            });
        }


        function successW3Geocode(position) {
            // Get current coordinates from
            var lat = position.coords.latitude,
                lng = position.coords.longitude;
            self.latitude(lat);
            self.longitude(lng);
            getAddressFromGoogle(lat, lng);
        }

        function errorW3Geocode() {
            fallbackToDefaultLocation();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successW3Geocode, errorW3Geocode);
        } else {
            // Get current location from MaxMind API
            this.onMaxMindSuccess = function(location){
                var lat = JSON.stringify(location.location.latitude, undefined, 4),
                    lng = JSON.stringify(location.location.longitude, undefined, 4),
                    city = JSON.stringify(location.city.names.en, undefined, 4).replace(/"/g, ""),
                    st = JSON.stringify(location.subdivisions[0].iso_code, undefined, 4).replace(/"/g, ""),
                    country = JSON.stringify(location.registered_country.names.en, undefined, 4).replace(/"/g, "");

                self.latitude(lat);
                self.longitude(lng);
                self.locationName(city + ', ' + st + ', ' + country);
            };
            this.onMaxMindError = function(error){
                window.alert( "Error:\n\n" + JSON.stringify(error, undefined, 4) );
            };
            geoip2.city(this.onMaxMindSuccess, this.onMaxMindError);
        }

        this.location = ko.computed(function(){
            return self.latitude() + ',' + self.longitude();
        }).extend({ throttle: 100 });



        this.specialities = ko.observableArray([
            new Bayada.Specialty({
                id:        0,
                name:      "Home Health",
				tooltip:	"Short-term nursing, rehabilitative, therapeutic, and personal home care services provided to adults and seniors recovering after a hospital or facility stay.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Home Health</h1>" +
								"<p>Short-term nursing, rehabilitative, therapeutic, and personal home care services provided to adults and seniors recovering after a hospital or facility stay.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/services_hhc_homehealth.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        1,
                name:      "Adult Nursing",
				tooltip:	"In home nursing care services provided by registered nurse (RN) or licensed practical nurse (LPN) for adults and seniors with illness, injury, or disability.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Adult Nursing</h1>" +
								"<p>In home nursing care services provided by registered nurse (RN) or licensed practical nurse (LPN) for adults and seniors with illness, injury, or disability.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/services_hhc_nursing.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        2,
                name:      "Hospice",
				tooltip: "End-of-life medical, social, emotional, and spiritual care that supports patients with a life-expectancy prognosis of six months or less and their families.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Hospice</h1>" +
								"<p>End-of-life medical, social, emotional, and spiritual care that supports patients with a life-expectancy prognosis of six months or less and their families.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/hospice_services.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        3,
                name:      "Assistive Care",
				tooltip:	"Non-medical assistance, provided by a home health aide, to help adults and seniors with activities of daily living, including self-care and household support.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Assistive Care</h1>" +
								"<p>Non-medical assistance, provided by a home health aide, to help adults and seniors with activities of daily living, including self-care and household support.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/services_hhc_assistive_care.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        4,
                name:      "Pediatric Home Care",
				tooltip:	"Nursing, therapeutic, and personal home health care services for children under the age of 18 who require complex, high-tech medical care.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Pediatric Home Care</h1>" +
								"<p>Nursing, therapeutic, and personal home health care services for children under the age of 18 who require complex, high-tech medical care.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/services_pediatrics.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        5,
                name:      "Habilitation",
				tooltip:	"Education and support for clients with intellectual or developmental disabilities that improve skills to support independent living at home and the community.",
				tooltipContent: "<h1 class='bayada-tooltip-title'>Habilitation</h1>" +
								"<p>Education and support for clients with intellectual or developmental disabilities that improve skills to support independent living at home and the community.</p>" +
								"<a class='bayada-link' href='http://www.bayada.com/services_habilitation.asp'>Learn More</a>"
            }),
            new Bayada.Specialty({
                id:        6,
                name:      "Staffing",
				tooltip:	"",
				tooltipContent: "Tooltip Content"
            })
        ]);


        this.selectSpecialty = function(specialty) {
            if ( self.areAllSpecialtiesSelected() === true ){
                self.deselectAllSpecialties();
            }
            specialty.selected(!specialty.selected());
        };


        this.selectAllSpecialties = function() {
            ko.utils.arrayForEach(self.specialities(), function(specialty) {
                specialty.selected(true);
            });
        };

        this.deselectAllSpecialties = function() {
            ko.utils.arrayForEach(self.specialities(), function(specialty) {
                specialty.selected(false);
            });
        };

        this.areAllSpecialtiesSelected = ko.computed(function() {
            return ko.utils.arrayFilter(self.specialities(), function(specialty) {
                return specialty.selected() === true;
            }).length === self.specialities().length;
        });

        this.selectedSpecialties = ko.computed(function() {
            return ko.utils.arrayFilter(self.specialities(), function(specialty) {
                return specialty.selected();
            });
        });

        this.showServiceTypeDialog = ko.observable(false);
        this.openServiceTypeDialog = function() {
            self.showServiceTypeDialog(true);
        };

        this.closeServiceTypeDialog = function() {
            self.showServiceTypeDialog(false);
        };

        this.shownFilters = ko.observable(false);
        this.toggleFilters = function(){
            self.shownFilters(!self.shownFilters());
        };
        this.resetFilters = function(){
            this.distance(25);
            this.selectAllSpecialties();
            this.toggleFilters();
        };

        this.distances = ko.observableArray([10,25,50,100]);
        this.distance = ko.observable(25);
        this.distanceChanged = ko.observable(false);
        this.selectDistance = function(distance) {
            self.resultLimit(10);
            self.distance(distance);
            self.distanceChanged(true);
        };

        this.loadMore = function() {
            self.resultLimit(self.resultLimit() + 10);
        };

        this.searchParams = ko.computed(function() {
            return {
                $orderby: "Distance asc",
                $top:     self.resultLimit(),
                location: self.location(),
                distance: self.distance() + " mi",
            };
        });
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/models/bayada-Specialty.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    Bayada.Specialty = function(data) {
        if (data) {
            ko.mapping.fromJS(data, {}, this);
        }

        var self = this;

        this.selected = ko.observable(true);

    };

    Bayada.Specialty.prototype.toJSON = function() {
        return ko.utils.unwrapObservable(this.name);
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));



//#### src/js/views/bayada-FindAnOffice.js
// Create the namespace for Bayada
(function( Bayada, $, _ ) {

    Bayada.FindAnOfficeModel = function() {
        var self = this;
        this.offices = ko.observableArray();

        this.searchCriteria = new Bayada.SearchCriteria();

        this.officeDetail = ko.computed(function() {
            return ko.utils.arrayFirst(self.offices(), function(office){
                return office.selected() === true;
            });
        });

        this.previousOfficeCount = ko.observable(null);
        this.loadMoreDisabled = ko.observable(false);

        this.selectedOffice = ko.observable(false);
        this.selectOffice = function(office) {
            ko.utils.arrayForEach(self.offices(), function(o) {
                self.selectedOffice(true);
                o.selected(office === o);
            });
        };

        this.updatingOffices = ko.observable(true);
        this.searchExecuted = ko.observable(false);

        this.mapView = ko.observable();
        this.toggleView = function() {
            self.mapView(!self.mapView());
        };

        this.closeOfficeDetail = function() {
            self.selectedOffice(false);
            ko.utils.arrayForEach(self.offices(), function(office) {
                office.selected(false);
            });
        };

        var loadOffices = function() {

            //console.log("params", self.searchCriteria.searchParams());

            $.ajax({
                url: "/odata/Offices",
                data: self.searchCriteria.searchParams(),
                dataType: "json",
                beforeSend: function() {
                    self.updatingOffices(true);
                },
                success: function(data) {

                    var offices = data.value;

                    //console.log("offices", offices, "Number of offices: " + offices.length);

                    self.previousOfficeCount(self.offices().length);

                    // Push the results into an array first
                    var officeModels = [];
                    self.offices.removeAll();

                    ko.utils.arrayForEach(offices, function(office) {
                        officeModels.push(new Bayada.Office(office));
                    });

                    // Then update the observable with the results array
                    self.offices.push.apply(self.offices, officeModels);

                    self.loadMoreDisabled(
                        !self.searchCriteria.distanceChanged() && self.previousOfficeCount() && ( (self.previousOfficeCount() >= self.offices().length) || (self.offices().length % 10 !== 0) )
                    );

                    self.searchCriteria.distanceChanged(false);
                },
                complete: function() {
                    self.updatingOffices(false);
                    self.searchExecuted(true);
                }
            });
        };

        this.searchCriteria.searchParams.subscribe(function() {
            loadOffices();
        });

        this.filteredOffices = ko.computed(function() {
            //Get selectedSpecialties
            var selectedSpecialties = self.searchCriteria.selectedSpecialties();

            return ko.utils.arrayFilter(self.offices(), function(office) {
                //Check if all Specialties are selected
                if (self.searchCriteria.areAllSpecialtiesSelected()) {
                    return true;
                } else {
                    //Get names of selectedSpecialties
                    var selectedSpecialtyNames = [];
                    ko.utils.arrayForEach(selectedSpecialties, function(specialty) {
                        selectedSpecialtyNames.push(specialty.name());
                    });

                    //Compare selectedSpecialtyNames to office.specialties
                    var comparedSpecialties = ko.utils.compareArrays(office.Specialties(), selectedSpecialtyNames);

                    //Build array of matches
                    var matches = [];
                    ko.utils.arrayForEach(comparedSpecialties, function(comparedSpecialty) {
                        if (comparedSpecialty.status === "retained") {
                            matches.push(comparedSpecialty.value);
                        }
                    });

                    //Return true if any matches are found
                    if (matches.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        });

        this.containsFilteredResults = ko.computed(function() {
            return self.filteredOffices().length > 0;
        });

        // Initialize
        // loadOffices();
    };

}(window.Bayada = window.Bayada || {}, jQuery, _));

