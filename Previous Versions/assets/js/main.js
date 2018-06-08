(function() {

	"use strict";

	var app = {
		page: 0,
		scrollSpeed: 1000,
		scrollDelay: 1000,
		propertyType: null,
		roofType: null,
		electricityBill: null,
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.initSliders();
			this.render();
		},
		cacheDOM: function() {
			this.electricitySlider = document.getElementById("electricity-slider");
			this.calculateSavingsBtn = $("#btn-0");

			// Pages
			this.page0 = $("#page-0");
			this.page1 = $("#page-1");

			// Main Sections 
			this.section0 = $("#section-0");
			this.section1 = $("#section-1");
			this.section2 = $("#section-2");
			this.section3 = $("#section-3");
			this.section4 = $("#section-4");

			// Property Type Buttons
			this.propertyType0 = $("#property-type-0");
			this.propertyType1 = $("#property-type-1");
			this.propertyType2 = $("#property-type-2");

			// Roof Type Buttons
			this.roofType0 = $("#roof-type-0");
			this.roofType1 = $("#roof-type-1");
			this.roofType2 = $("#roof-type-2");
			this.roofType3 = $("#roof-type-3");

			// Buttons
			this.caculateSavingsBtn1 = $("#calculate-savings-btn");
		},
		initSliders: function() {
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
				this.scrollTo(this.section2);
			});

			// 1. Commercial
			this.propertyType1.on("click", () => {
				this.unactify("property-type");
				this.propertyType1.addClass("active");
				this.animate("bounce", this.propertyType1);
				this.propertyType = "commercial";
				this.scrollTo(this.section2);
			});

			// 3. Institutional
			this.propertyType2.on("click", () => {
				this.unactify("property-type");
				this.propertyType2.addClass("active");
				this.animate("bounce", this.propertyType2);
				this.propertyType = "institutional";
				this.scrollTo(this.section2);
			});

			// Root Type Handlers
			// 0. Tile
			this.roofType0.on("click", () => {
				this.unactify("roof-type");
				this.roofType0.addClass("active");
				this.animate("bounce", this.roofType0);
				this.roofType = "tile";
				this.scrollTo(this.section3);
			});

			// 1. Composition
			this.roofType1.on("click", () => {
				this.unactify("roof-type");
				this.roofType1.addClass("active");
				this.animate("bounce", this.roofType1);
				this.roofType = "composition";
				this.scrollTo(this.section3);
			});

			// 2. Other
			this.roofType2.on("click", () => {
				this.unactify("roof-type");
				this.roofType2.addClass("active");
				this.animate("bounce", this.roofType2);
				this.roofType = "other";
				this.scrollTo(this.section3);
			});

			// 3. Clay
			this.roofType3.on("click", () => {
				this.unactify("roof-type");
				this.roofType3.addClass("active");
				this.animate("bounce", this.roofType3);
				this.roofType = "clay";
				this.scrollTo(this.section3);
			});

			//  Caculate Savings Button
			this.caculateSavingsBtn1.on("click", () => {
				this.page = 1;
				this.animate("bounce", this.caculateSavingsBtn1).makeInvisible(this.page0);
				this.scrollTo(this.section1);
				setTimeout(() => {
					this.render();
				}, this.scrollDelay * 2);
			});
		},
		render: function() {
			switch (this.page) {
				case 0:
					this.hideAllScreens();
					this.page0.addClass("active");
					setTimeout(() => {
						this.page0.addClass("visible");
					}, this.scrollDelay / 2);
				break;
				case 1:
					this.hideAllScreens();
					this.page1.addClass("active");
					setTimeout(() => {
						this.page1.addClass("visible");
					}, this.scrollDelay / 2);
				break;
			}
		},
		makeInvisible: function(page) {
			setTimeout(() => {
				page.removeClass("visible");
			}, this.scrollDelay);
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
		hideAllScreens: function() {
			$(".page").removeClass("active");
			$(".page").removeClass("visible");
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

			return this;
		},
		scrollTo: function(target) {
			setTimeout(() => {
				$("html, body").animate({
					scrollTop: target.offset().top
				}, this.scrollSpeed);
			}, this.scrollDelay);

			return this;
		}
	}

	app.init();

}());