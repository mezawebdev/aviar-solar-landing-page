(function() {

	"use strict";

	var app = {
		propertyType: null,
		roofType: null,
		electricityBill: null,
		init: function() {
			this.cacheDOM();
			this.render();
			this.fireEvents();
		},
		cacheDOM: function() {
			this.electricitySlider = document.getElementById("electricity-slider");
			this.calculateSavingsBtn = $("#btn-0");

			// Property Type Buttons
			this.propertyType0 = $("#property-type-0");
			this.propertyType1 = $("#property-type-1");
			this.propertyType2 = $("#property-type-2");

			// Roof Type Buttons
			this.roofType0 = $("#roof-type-0");
			this.roofType1 = $("#roof-type-1");
			this.roofType2 = $("#roof-type-2");
			this.roofType3 = $("#roof-type-3");
		},
		render: function() {
			var eSlider = noUiSlider.create(this.electricitySlider, {
				start: [250],
				connect: [true, false],
				range: {
					"min": 1,
					"max": 500
				},
				pips: {
					mode: "count",
					values: 5
				}
			});

			$(".noUi-handle").html("<div class='amount'>$<span></span><div class='arrow'></div></div>");

			this.electricityAmount = $("#electricity-slider .amount span");

			eSlider.on("update", (values, handles) => {
				this.electricityAmount.html(Math.round(values));
				this.electricityBill = Math.round(values);
			});
		},
		fireEvents: function() {
			// Caculate Savings Btn Handler 1
			this.calculateSavingsBtn.on("click", () => {
				$("html, body").animate({
					scrollTop: $("#section-1").offset().top
				}, 1000);
			});

			// Property Type Handlers
			// 0. House
			this.propertyType0.on("click", () => {
				this.unactify("property-type");
				this.propertyType0.addClass("active");
				this.animate("bounce", this.propertyType0);
				this.propertyType = "house";
			});

			// 1. Commercial
			this.propertyType1.on("click", () => {
				this.unactify("property-type");
				this.propertyType1.addClass("active");
				this.animate("bounce", this.propertyType1);
				this.propertyType = "commercial";
			});

			// 3. Institutional
			this.propertyType2.on("click", () => {
				this.unactify("property-type");
				this.propertyType2.addClass("active");
				this.animate("bounce", this.propertyType2);
				this.propertyType = "institutional";
			});

			// Root Type Handlers
			// 0. Tile
			this.roofType0.on("click", () => {
				this.unactify("roof-type");
				this.roofType0.addClass("active");
				this.animate("bounce", this.roofType0);
				this.roofType = "tile";
			});

			// 1. Composition
			this.roofType1.on("click", () => {
				this.unactify("roof-type");
				this.roofType1.addClass("active");
				this.animate("bounce", this.roofType1);
				this.roofType = "composition";
			});

			// 2. Other
			this.roofType2.on("click", () => {
				this.unactify("roof-type");
				this.roofType2.addClass("active");
				this.animate("bounce", this.roofType2);
				this.roofType = "other";
			});

			// 3. Clay
			this.roofType3.on("click", () => {
				this.unactify("roof-type");
				this.roofType3.addClass("active");
				this.animate("bounce", this.roofType3);
				this.roofType = "clay";
			});
		},
		unactify: function(section, type) {
			switch (section) {
				case "property-type":
					this.propertyType0.removeClass("active");
					this.propertyType1.removeClass("active");
					this.propertyType2.removeClass("active");
				break;
				case "roof-type":
					this.roofType0.removeClass("active");
					this.roofType1.removeClass("active");
					this.roofType2.removeClass("active");
					this.roofType3.removeClass("active");
				break;
			}
		},
		animate: function(animation, element) {
			switch (animation) {
				case "bounce": 
					element.addClass("animated bounce");
					setTimeout(function() {
						element.removeClass("animated bounce");
					}, 2000);
				break;
			}
		}
	}

	app.init();

}());