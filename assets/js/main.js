(function() {

	"use strict";

	var app = {
		page: 0,
		scrollSpeed: 1000,
		scrollDelay: 750,
		propertyType: null,
		roofType: null,
		electricityBill: null,
		address: null,
		addressSelected: false,
		name: null,
		email: null,
		phone: null,
		loadingScreen: false,
		init: function() {
			this.cacheDOM();
			this.fireEvents();
			this.initSliders();
			this.render();
		},
		cacheDOM: function() {
			this.electricitySlider = document.getElementById("electricity-slider");
			this.calculateSavingsBtn = $("#btn-0");
			this.menuCollapseButton = $(".menu button");
			this.menuCollapse = $(".menu-collapse");

			// Pages
			this.page0 = $("#page-0");

			// Error Message
			this.errorMessage = $(".page .error");

			// Page 1
			this.page1 = $("#page-1"); // Main element
			this.page1Submit = $("#page-1 button.select-btn"); // Submit Button

			// Page 2 - Property Type
			this.page2 = $("#page-2"); // Main Element
			this.page2Submit = $("#page-2 button.select-btn"); // Submit Button
			this.propertyType0 = $("#page-2 #option-house");
			this.propertyType1 = $("#page-2 #option-commercial");
			this.propertyType2 = $("#page-2 #option-institutional");

			// Page 3 - Roof Type
			this.page3 = $("#page-3"); // Main Element
			this.page3Submit = $("#page-3 button.select-btn"); // Submit Button
			this.roofType0 = $("#page-3 #option-composition");
			this.roofType1 = $("#page-3 #option-tile");
			this.roofType2 = $("#page-3 #option-clay");
			this.roofType3 = $("#page-3 #option-flat");

			// Page 4 - Address
			this.page4 = $("#page-4"); // Main Element
			this.page4Submit = $("#page-4 button.select-btn"); // Submit Button
			this.addressInput = $("#autocomplete");
		
			// Page 5 - Phone NUmber / Email
			this.page5 = $("#page-5");
			this.page5Submit = $("#page-5 button.select-btn");
			this.page5phoneNumber = $("#page-5 .phone-number");
			this.page5email = $("#page-5 .email");

			// Page 6 - name
			this.page6 = $("#page-6");
			this.page6Submit = $("#page-6 button.select-btn");
			this.page6name = $("#page-6 .name");
			this.page6loadingScreen = $("#page-6 .wrapper .loading-screen");

			// Page 7 - Thank you
			this.page7 = $("#page-7");
			this.page7Footer = $("#page-7 .footer");
		},
		initSliders: function() {
			var eSlider = noUiSlider.create(this.electricitySlider, {
				start: [250],
				connect: [true, false],
				range: {
					"min": 1,
					"max": 500
				}/*
				pips: {
					mode: "count",
					values: 5
				}*/
			});

			$(".noUi-handle").html("<div class='amount'>$<span></span><div class='arrow'></div></div>");

			this.electricityAmount = $("#electricity-slider .amount span");

			eSlider.on("update", (values, handles) => {
				this.electricityAmount.html(Math.round(values));
				this.electricityBill = Math.round(values);
			});
		},
		fireEvents: function() {
			this.menuCollapseButton.on("click", () => {
				if (! this.menuCollapse.hasClass("active")) {
					this.menuCollapse.addClass("active");
				} else {
					this.menuCollapse.removeClass("active");
				}
			});

			// Page 0 - Home
			// Calculate Savings Button
			this.calculateSavingsBtn.on("click", () => {
				this.animate("bounce", this.calculateSavingsBtn).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			// Page 1 - Electricity Bill
			// Submit Button
			this.page1Submit.on("click", () => {
				this.animate("bounce", this.page1Submit).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			// Page 2 - Property Type
			// Submit Button
			this.page2Submit.on("click", () => {
				if (this.propertyType) {
					this.animate("bounce", this.page2Submit).makeInvisible($(".page"));
					this.page++;
					this.render(true);
				} else {
					this.animate("shake", this.page2);
					this.displayError();
				}
			});

			this.propertyType0.on("click", () => {
				this.unactify("property-type");
				this.propertyType0.addClass("active");
				this.propertyType = "house";
				this.animate("bounce", this.propertyType0).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.propertyType1.on("click", () => {
				this.unactify("property-type");
				this.propertyType1.addClass("active");
				this.propertyType = "commercial";
				this.animate("bounce", this.propertyType1).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.propertyType2.on("click", () => {
				this.unactify("property-type");
				this.propertyType2.addClass("active");
				this.propertyType = "intitutional";
				this.animate("bounce", this.propertyType2).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			// Page 3 - Roof Type
			// Submit Button
			this.page3Submit.on("click", () => {
				this.animate("bounce", this.page3Submit).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.roofType0.on("click", () => {
				this.unactify("roof-type");
				this.roofType0.addClass("active");
				this.roofType = "composition";
				this.animate("bounce", this.roofType0).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.roofType1.on("click", () => {
				this.unactify("roof-type");
				this.roofType1.addClass("active");
				this.roofType = "tile";
				this.animate("bounce", this.roofType1).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.roofType2.on("click", () => {
				this.unactify("roof-type");
				this.roofType2.addClass("active");
				this.roofType = "clay";
				this.animate("bounce", this.roofType2).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			this.roofType3.on("click", () => {
				this.unactify("roof-type");
				this.roofType3.addClass("active");
				this.roofType = "flat";
				this.animate("bounce", this.roofType3).makeInvisible($(".page"));
				this.page++;
				this.render(true);
			});

			// Page 4 - Address 
			this.page4Submit.on("click", (e) => {
				e.preventDefault();
				if (this.validate()) {
					this.animate("bounce", this.page4Submit).makeInvisible($(".page"));
					this.page++;
					this.render(true);
				} else {
					this.animate("shake", this.page4);
					$("#page-4 input").addClass("focus");
					this.displayError();
				}
			});

			// Page 5 - Phone Number / Email
			this.page5Submit.on("click", (e) => {
				e.preventDefault();
				if (this.validate()) {
					this.animate("bounce", this.page5Submit).makeInvisible($(".page"));
					this.page++;
					this.phone = this.page5phoneNumber.val();
					this.email = this.page5email.val();
					this.render(true);
				} else {
					this.animate("shake", this.page5);
					$("#page-5 input").addClass("focus");
					this.displayError();
				}
			});

			// Page 6 - Name
			this.page6Submit.on("click", (e) => {
				e.preventDefault();
				if (this.validate()) {
					this.animate("bounce", this.page6Submit);
					this.page++;
					// this.toggleLoadingScreen();
					this.name = this.page6name.val();
					this.page6loadingScreen.addClass("active");
					setTimeout(() => {
						this.makeInvisible($(".page"));
						this.render(true);
						this.sendInfo();
					}, 2500);
				} else {
					this.animate("shake", this.page6);
					$("#page-6 input").addClass("focus");
					this.displayError();
				}
			});
		},
		render: function(delay) {
			if (delay) {
				setTimeout(() => {
					switch (this.page) {
						case 0:
							this.switchPage(this.page0);
						break;
						case 1:
							this.switchPage(this.page1);
						break;
						case 2: 
							this.switchPage(this.page2);
						break;
						case 3:
							this.switchPage(this.page3);
						break;
						case 4: 
							this.switchPage(this.page4);
						break;
						case 5: 
							this.switchPage(this.page5);
						break;
						case 6:
							this.switchPage(this.page6);
						break;
						case 7:
							this.switchPage(this.page7);
							setTimeout(() => {
								this.animate("actify", this.page7Footer);
							}, 1500);
						break;
					}
				}, this.scrollDelay * 1.5);
			} else {
				switch (this.page) {
					case 0:
						this.switchPage(this.page0);
					break;
					case 1:
						this.switchPage(this.page1);
					break;
					case 2: 
						this.switchPage(this.page2);
					break;
					case 3:
						this.switchPage(this.page3);
					break;
					case 4: 
						this.switchPage(this.page4);
					break;
					case 5: 
						this.switchPage(this.page5);
					break;
					case 6:
						this.switchPage(this.page6);
					break;
					case 7:
						this.switchPage(this.page7);
						setTimeout(() => {
							this.animate("actify", this.page7Footer);
						}, 1500);
					break;
				}
			}
		},
		makeInvisible: function(page) {
			setTimeout(() => {
				page.removeClass("visible");
				console.log("page invisible.");
			}, this.scrollDelay);
		},
		unactify: function(section) {
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
				case "shake":
					element.addClass("animated shake");
					setTimeout(function() {
						element.removeClass("animated shake");
					}, 2000);
				break
				case "actify":
					element.addClass("active");
				break;
			}

			return this;
		},
		switchPage: function(page) {
			this.hideAllScreens();
			page.addClass("active");
			setTimeout(() => {
				page.addClass("visible");
			}, this.scrollDelay / 2);
		},
		validate: function() {
			switch (this.page) {
				// Address
				case 4: 
					if (this.addressSelected) {
						return true;
					} else {
						return false;
					}
				break;
				// Phone Number
				case 5:
					if (this.validatePhone() && this.validateEmail()) {
						return true;
					} else {
						return false;
					}
				break;
				// Name
				case 6:
					if ($("#page-6 input").val() === "") {
						return false;
					} else {
						return true;
					}
				break;
			}
		},
		validatePhone: function() {
			var input = this.page5phoneNumber.val();
			input = input.replace(/\D/g,'');
			// input = input.match(/\d+/);
			console.log("Phone: " + input);

			if (input === "" || input.length <= 9) {
				return false;
			} else {
				return true;
			}
		},
		validateEmail: function() {
			var input = this.page5email.val();
			console.log(input);

		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    console.log(re.test(String(input).toLowerCase()));
		    return re.test(String(input).toLowerCase());
		},
		displayError: function() {
			console.log("Error!");
			this.errorMessage.addClass("active");
			setTimeout(() => {
				this.errorMessage.removeClass("active");
			}, this.scrollDelay * 3);
		},
		getAddress: function() {
			app.address = app.addressInput.val();
			app.addressSelected = true;
		},
		toggleLoadingScreen: function() {
			switch (this.page) {
				case 6: 
					if (! this.loadingScreen) {
						this.loadingScreen = true;
						this.page6loadingScreen.addClass("active");
					} else {
						this.loadingScreen = false;
					}
				break;
			}
		},
		sendInfo: function() {
			console.log(this.name);
			console.log(this.phone);
			console.log(this.email);
			console.log(this.address);
			console.log(this.electricityBill);
			console.log("Property: " + this.propertyType);
			console.log("Roof: " + this.roofType);
			$.ajax({
				type: "POST",
				url: "catch-info.php",
				data: {
					name: this.name,
					phone: this.phone,
					email: this.email,
					address: this.address,
					electricityBill: this.electricityBill,
					propertyType: this.propertyType,
					roofType: this.roofType
				},
				success: function() {
					console.log("Success.");
				}
			})
		}
	}

	app.init();

	window.getAddress = app.getAddress;

}());