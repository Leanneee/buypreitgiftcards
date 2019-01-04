(function () {

    var PageController = function ($http, $scope, $log, $cookies, $cookieStore, $location, $window) {

        var inObj = new Object();
        inObj.clientID = 93;
        $scope.client = 93;
        $scope.cardID = 23;
        $scope.UserID = 0;
        $scope.LoadCart = false;
        $scope.selectedValue = 50;
        $scope.CardCarrierEnabled = false;
        $scope.Quantity = "1";
        $scope.QuantityLimit = 5;
        $scope.DollarLimit = 1500;
        $scope.index = 0;
        $scope.a = { 'Email': '', 'PhoneNumber': '' };
        $scope.newsletter = { 'ClientID': $scope.client, 'Email': '' };
        $scope.newsletterMessage = '';
        $scope.resetPassQ = $('#q').val();
        $scope.resetPasswordObj = { 'ClientID': $scope.client, 'Password': '', 'Password2': '', 'Query': $scope.resetPassQ };
        $scope.resetPasswordError = '';
        $scope.inEmail = '';
        $scope.signEmail = '';
        $scope.signPassword = '';
        $scope.cardQuantity = 1;
        $scope.emailIn = '';
        $scope.nameIn = '';
        $scope.lastIn = '';
        $scope.passwordIn = '';
        $scope.companyIn = '';
        $scope.phoneIn = '';
        $scope.cardImageName = "";
        $scope.selectedCardImageName = "";
        $cookies.put('CheckoutSessionID', '');
        $scope.options = { "value": { "ShippingCode": 201, "AmountLimit": null, "CardQuantityEnd": null } };
        $scope.bi = { "passedBalanceInquiry": false, "card": '', "pin": '' };
        $scope.showBIWhenPassed = false;
        $scope.shippingError = "";
        $scope.precheckData = {
            'RequirePIN': true,
            'RequireCaptcha': true,
            'VelocityCheck': true,
            'AllowInquiry': false,
            'Errors': []
        };

        $scope.balanceData = {
            'Balance': -1,
            'RequirePIN': false,
            'Errors': []
        };
        $scope.maskedCC = 'X';
        $scope.setBIDataFromRequest = function (data, maskedCard) {
            $scope.balanceData = data;
            $scope.maskedCC = maskedCard;
        }

        $scope.newCard = {
            "prop": [],
            "quant": [],
            "Denomination": "50",
            "Quantity": "1",
            "total": "50",
            "IncludeCarrier": $scope.CardCarrierEnabled,
            "CardLogoUrl": "ShellCard.png",
            "CardDescription": "Shell Refillable Card",
            "CarrierCost": 0,
            "carrier": {
                "To": "",
                "From": "",
                "Message": ""
            }
        }
        $scope.cardIsSelected = false;
        $scope.invalidOtherValue = "";
        $scope.addCardErrorMessage = "";
        $scope.allowOtherDenomination = false;

        $scope.SetInnerCookie = function () {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $cookies.putObject("CartItems", $scope.inner, { 'expires': expireDate });
        };

        if ($cookies.getObject("CartItems"))
            $scope.inner = $cookies.getObject("CartItems");
        else {
            $scope.inner = [];
            $scope.SetInnerCookie();
        }

        $scope.subTotal = $scope.Quantity * $scope.selectedValue;
        $scope.allCurrentCards = [];
        $scope.allCurrentShippings = { "ShippingOptions": [{ "DisplayName": "", "ShippingCode": "", "AmountLimit": null, "CardQuantityEnd": null }] };
        $scope.checkoutTotals = [];
        $scope.shipping = {
            FirstName: '',
            LastName: '',
            StreetAddress1: '',
            StreetAddress2: '',
            City: '',
            State: '',
            ZipCode: '',
            Phone: '',
            Email: '',
        }

        $scope.billing = {
            FirstName: '',
            LastName: '',
            StreetAddress1: '',
            StreetAddress2: '',
            City: '',
            State: '',
            ZipCode: '',
            Phone: '',
        }

        $scope.cardCarrierInfo = {
            To: '',
            From: '',
            PersonalMessage: ''
        }

        $scope.purchaseInfo = {
            CreditCardNumber: "",
            SecurityCode: "",
            ExpirationMonth: "",
            ExpirationYear: "",
            PromoCode: "",
            NameOnCard: ""
        }

        $scope.shippingChequed = false;

        $scope.options = {
            value: 201,
            code: 201
        };

        $scope.ccError = {
            CCV: '',
            Card: ''
        }

        if ($cookies.getObject("User")) {
            $scope.UserInfo = $cookies.getObject("User");
            $scope.a.Email = $scope.UserInfo.Email;
            $scope.a.PhoneNumber = $scope.UserInfo.PhoneNumber;
            $scope.billing.Email = $scope.UserInfo.Email;
            $scope.billing.Phone = $scope.UserInfo.PhoneNumber;
            $scope.billing.FirstName = $scope.UserInfo.FirstName;
            $scope.billing.LastName = $scope.UserInfo.LastName;
        }
        else {
            $scope.UserInfo = { UserName: '', UserID: 0  };
        }

        var endpoint = $('#endpoint1').val();
        var endpoint2 = $('#endpoint2').val();
        var endpoint3 = $('#endpoint3').val();
        var endpoint4 = $('#endpoint4').val();
        var endpoint5 = $('#endpoint5').val();
        var endpoint6 = $('#endpoint6').val();
        var endpoint7 = $('#endpoint7').val();
        var endpoint8 = $('#endpoint8').val();
        var endpoint9 = $('#endpoint9').val();
        var endpoint10 = $('#endpoint10').val();
        var endpoint11 = $('#endpoint11').val();
        var endpoint18 = $('#endpoint18').val();
        var endpoint19 = $('#endpoint19').val();


        var security = null;
        $scope.ClientCards = $scope.allCurrentCards;

        $http.defaults.useXDomain = true;


        $scope.getCardsForClient = function (endpoint, inObj) {
            $http.post(endpoint, inObj).then(function (response) {
                $log.info("Get All Cards for Client = " + JSON.stringify(response.data));
                $scope.allCurrentCards = response.data;

                if ($scope.onlyOneCard()) {
                    $scope.selectCardNew($scope.allCurrentCards.cards[0]);
                }
            });
        };

        $scope.onlyOneCard = function () {
            if ($scope.allCurrentCards != null && $scope.allCurrentCards.cards != null) {
                if ($scope.allCurrentCards.cards.length == 1) {
                    return true;
                }
            }
            return false;
        }

        $scope.getTransactionLimit = function () {
            var endpoint21 = $('#endpoint21').val();
            $http.post(endpoint21, inObj).then(function (response) {
                $log.info("Get TransactionLimit for Client = " + JSON.stringify(response.data));
                if (response.data != null) {
                    if (response.data.TransactionLimit != null)
                        $scope.DollarLimit = response.data.TransactionLimit;
                    if (response.data.BillingSameAsShippingLimit != null)
                        $scope.BillingSameAsShippingLimit = response.data.BillingSameAsShippingLimit;
                }

                $scope.feeMath();

            }, function (errorResponse) {
                $scope.feeMath();
                $('#loadingModal').modal('hide');
            });
        };

        $scope.getShippingOptions = function (endpoint2, inObj) {
            $http.post(endpoint2, inObj).then(function (response) {
                $log.info("Get All shipping options = " + JSON.stringify(response.data));
                $scope.allCurrentShippings = response.data;
            });
        };

        $scope.GetCheckoutTotals = function (endpoint3, inObj) {
            $http.post(endpoint3, inObj).then(function (response) {
                $log.info("Get All checkout totals = " + JSON.stringify(response.data));
                $scope.checkoutTotals = response.data;
            });
        };

        $scope.GetQuestions = function (inObj) {
            $http.post(endpoint18, inObj).then(function (response) {
                $log.info("GetQuestions = " + JSON.stringify(response.data));
                $scope.Questionnaire = response.data;
            })
        }

        $scope.GetStates = function (endpoint7, inObj) {
            $http.post(endpoint7, inObj).then(function (response) {
                $log.info("GetStates = " + JSON.stringify(response.data));
                $scope.states = { 'States': [] };
				$scope.states.States = response.data.States.filter(function(x) { return x.Name !== 'HI' && x.Name !== 'VT'; });
            });
        };

        $scope.ForgotPassword = function (endpoint, inObj) {
            $http.post(endpoint, inObj).then(function (response) {
                $log.info("Get Password Info = " + JSON.stringify(response.data));
                $scope.forgotmyPassword = response.data;
                if ($scope.forgotmyPassword.Error == null) {
                    $('#myModal2').modal('hide');
                    $('#passwordSuccessModal').appendTo("body").modal('show');
                }
            });
        };

        $scope.subscribe = function (endpoint, inObj) {
            $('#loadingModal').appendTo("body").modal({ backdrop: 'static', keyboard: false });
            $http.post(endpoint, inObj).then(function (response) {
                $('#loadingModal').modal('hide');
                $log.info("SubscribeNewsletter Info = " + JSON.stringify(response.data));
                if (response.data && response.data.Success) {
                    $scope.newsletterMessage = 'Newsletter successfully subscribed';
                } else {
                    $scope.newsletterMessage = response.data.Error.ErrorMessage;
                }
            }, function (errorResponse) {
                $('#loadingModal').modal('hide');
                $scope.newsletterMessage = 'Newsletter subscription failed';
            });
        };

        $scope.resetPass = function (endpoint, inObj) {
            $http.post(endpoint, inObj).then(function (response) {
                $log.info("resetPass Info = " + JSON.stringify(response.data));
                if (response.data && response.data.Success) {
                    $('#resetSuccessfulModal').appendTo("body").modal({ backdrop: 'static', keyboard: false });
                } else {
                    $scope.resetPasswordError = response.data.Error.ErrorMessage;
                }
            }, function (errorResponse) {
                $scope.resetPasswordError = "Request could not be completed at this time. Please try again later.";
            });
        }

        $scope.SendRegistration = function (endpoint,inObj) {
            $http.post(endpoint,inObj).then(function (response) {
                $log.info("Send Info = " + JSON.stringify(response.data));
                $scope.SendEmail = response.data;
                if ($scope.SendEmail.Success) {
                    $('#registrationSignUpForm').submit();
                } else {

                }
            }, function (errorResponse) {
                $('#loadingModal').modal('hide');
            });
        };

        $scope.CreateUserAccount = function (endpoint, inObj) {
            $('#loadingModal').appendTo("body").modal({ backdrop: 'static', keyboard: false });
            $http.post(endpoint, inObj).then(function (response) {
                $('#loadingModal').modal('hide');
                $log.info("Get Customer Info = " + JSON.stringify(response.data));
                $scope.CreateAnAccount = response.data;
                if ($scope.CreateAnAccount.Success) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    $cookies.putObject('User', $scope.CreateAnAccount, { 'expires': expireDate });
                    $scope.UserInfo = $cookies.getObject('User');
                    $scope.a.Email = $scope.UserInfo.Email;
                    $scope.a.PhoneNumber = $scope.UserInfo.PhoneNumber;
                    $scope.billing.Email = $scope.UserInfo.Email;
                    $scope.billing.Phone = $scope.UserInfo.PhoneNumber;
                    $scope.billing.FirstName = $scope.UserInfo.FirstName;
                    $scope.billing.LastName = $scope.UserInfo.LastName;
                    $('#myModal').modal('hide');
                    $scope.$broadcast('threeShow');
                } else {
                }
            }, function (errorResponse) {
                $('#loadingModal').modal('hide');
            });
        };

        $scope.signIn = function (endpoint, inObj) {
            $http.post(endpoint, inObj).then(function (response) {
                $log.info("Get login Info = " + JSON.stringify(response.data));
                $scope.logIn = response.data;
                $scope.UserInformation();
            });
        };


        $scope.GetQuestionaireByType = function (type) {
            inObj = { "ClientID": $scope.client, "Type": type };
            $scope.GetQuestions(inObj);
        };

        $scope.RedirectToRoute = function (route) {
            $window.location.href = route;
        };

        $scope.OpenWindow = function (route) {
            $window.open(route, "_blank");
        };

        $scope.Purchase = function (SessionID) {
            if ($scope.invalidOtherValue == '')
            {
                inObj = {
                    "UserID": $scope.UserID,
                    "Email": $scope.billing.Email,
                    "PhoneNumber": $scope.billing.Phone,
                    "ClientID": $scope.client,
                    "ShippingAddress": $scope.shipping,
                    "BillingAddress": $scope.billing,
                    "Cards": $scope.inner,
                    "ShippingCode": $scope.options.value.ShippingCode,
                    "PurchaseInfo": $scope.purchaseInfo,
                    "SessionID": SessionID,
                    "InAuthSession": $('#InAuthSession').val(),
                    "SalesChannel": "B2C",
                    "CheckoutSessionID": $cookies.get("CheckoutSessionID")
                }

                $('#loadingModal').appendTo("body").modal({ backdrop: 'static', keyboard: false });
                $http.post(endpoint8, inObj).then(function (response) {
                    $('#loadingModal').modal('hide');
                    $log.info("Get Purchase = " + JSON.stringify(response.data));
                    $scope.purchaseTransaction = response.data;
                    if ($scope.purchaseTransaction.Success) {
                        $scope.SendOrderToGoogle();
                        $scope.inner = [];
                        $scope.SetInnerCookie();
                        $('#orderNumber').val($scope.purchaseTransaction.OrderID);
                        $('#orderNumberForm').submit();
                    }
                    else if ($scope.purchaseTransaction.OrderStatus == 5)
                    {
                        for (var i = 0; i < response.data.Errors.length; i++) {
                            $('#errormessage').val(response.data.Errors[i].ErrorMessage);
                        }
                        $scope.inner = [];
                        $scope.SetInnerCookie();
                        $('#Error').submit();
                    }
                    else {
                        var expireDate = new Date();
                        expireDate.setTime(expireDate.getTime() + 15 * 60000);
                        $cookies.put('CheckoutSessionID', $scope.purchaseTransaction.CheckoutSessionID, { 'expires': expireDate });
                        $('#myModalError').appendTo("body").modal('show');
                    }
                }, function (errorResponse) {
                    $('#loadingModal').modal('hide');
                    $('#myModalError').appendTo("body").modal('show');
                });
            }
        };

        $scope.UserInformation = function () {
            if ($scope.logIn.Success) {
                $scope.UserInfo.UserName = $scope.logIn.FirstName;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.putObject('User', $scope.logIn, { 'expires': expireDate });
                $scope.UserInfo = $cookies.getObject('User');
                $scope.a.Email = $scope.UserInfo.Email;
                $scope.a.PhoneNumber = $scope.UserInfo.PhoneNumber;
                $scope.billing.Email = $scope.UserInfo.Email;
                $scope.billing.Phone = $scope.UserInfo.PhoneNumber;
                $scope.billing.FirstName = $scope.UserInfo.FirstName;
                $scope.billing.LastName = $scope.UserInfo.LastName;
                $scope.$broadcast('threeShow');
            }
        };

        $scope.CreateAccount = function (mail, name, last, password, company, phone, promotion) {
            inObj = { "ClientID": $scope.client, "FirstName": name, "LastName": last, "Password": password, "Email": mail, "PhoneNumber": phone, "Company": company, "Promotion": false };
            $scope.CreateUserAccount(endpoint5, inObj);
        };
        $scope.SendEmailRegistration = function (FullName, phone, companyName, email, address, taxid, qty, denomination, date, Questionnaire) {
            inObj = {"ClientId":$scope.client, "Name": FullName, "PhoneNumber": phone, "Company": companyName, "Email": email, "Address": address, "TaxId": taxid, "Qty": qty, "Denomination": denomination, "Date": date, "Questionnaire": Questionnaire };
            $scope.SendRegistration(endpoint19, inObj);
        };

        $scope.signingIn = function (mail, password) {
            inObj = { "ClientID": $scope.client, "Email": mail, "Password": password };
            $scope.signIn(endpoint6, inObj);
        };


        $scope.passwordRecovery = function (mail) {
            inObj = { "Email": mail, "ClientID": $scope.client };
            $scope.ForgotPassword(endpoint4, inObj);
        };

        $scope.subscribeNewsletter = function () {
            inObj = $scope.newsletter;
            $scope.subscribe(endpoint9, inObj);
        };

        $scope.resetPassword = function () {
            $scope.resetPasswordError = "";
            /* passwords must be atleast 6 characters */
            if ($scope.resetPasswordObj.Password.length < 6 || $scope.resetPasswordObj.Password2.length < 6)
            {
                $scope.resetPasswordError += "Passwords must be at least 6 characters. ";
            }
            /* passwords must contain one Upper case letter */
            if (/[A-Z]/.test($scope.resetPasswordObj.Password))
            {
            }
            else
            {
                $scope.resetPasswordError += "Passwords must contain at least one upper case character. ";
            }

            /* passwords must contain one lower case letter */
            if (/[a-z]/.test($scope.resetPasswordObj.Password))
            {
            }
            else
            {
                $scope.resetPasswordError += "Passwords must contain at least one lower case character. ";
            }
            

            /* passwords must contain one lower case letter */
            if (!$scope.resetPasswordObj.Password.match(/[^a-zA-Z]+$/)) {
                $scope.resetPasswordError += "Passwords must contain at least one non letter. ";
            }

            /*passwords must match */
            if ($scope.resetPasswordObj.Password != $scope.resetPasswordObj.Password2)
            {
                $scope.resetPasswordError += "Passwords do not match, please re-enter passwords. ";
            }
            
            if( $scope.resetPasswordError.length == 0)
            {
                $scope.resetPasswordError = "";
                inObj = $scope.resetPasswordObj;
                $scope.resetPass(endpoint10, inObj);
            }
            
        };

        $scope.feeMath = function () {            
            var sum = 0;
            var cardcount = Number(0);
            for (var i = 0; i < $scope.inner.length; i++) {
                $scope.inner[i].total = $scope.inner[i].Quantity * $scope.inner[i].Denomination;
                var tot = $scope.inner[i].total;
                if ($scope.inner[i].IncludeCarrier) {
                    tot += $scope.inner[i].CarrierCost;
                }
                cardcount += Number($scope.inner[i].Quantity);
                sum += parseInt(tot);
                $scope.inner[i].total = tot;
                $scope.bigTotal = sum;
            }
            $scope.shippingError = "";

            if ($scope.options.value != null && $scope.options.value.AmountLimit != null && $scope.options.value.AmountLimit < sum) {
                $scope.shippingError = "Shipping Item " + $scope.options.value.DisplayName + " has a cart limit of $" + $scope.options.value.AmountLimit.toString() + ".";
                $scope.options = { "value": { "ShippingCode": 201, "AmountLimit": null, "CardQuantityEnd": null } };
            }
            else if ($scope.options.value != null && $scope.options.value.CardQuantityEnd != null && $scope.options.value.CardQuantityEnd < cardcount) {
                $scope.shippingError = "Shipping Item " + $scope.options.value.DisplayName + " has a card limit of " + $scope.options.value.CardQuantityEnd.toString() + ".";
                $scope.options = { "value": { "ShippingCode": 201, "AmountLimit": null, "CardQuantityEnd": null } };
            }
            else {
                $scope.options.code = $scope.options.value.ShippingCode;
            }
            inObj = { "clientID": $scope.client, "cards":$scope.inner, "shippingCode": $scope.options.code };
            $scope.GetCheckoutTotals(endpoint3, inObj);

            if ($scope.BillingSameAsShippingLimit != null) {
                var total = $scope.Cart.Total;
                if (total > $scope.BillingSameAsShippingLimit) {
                    $scope.shippingChequed = false;
                    $scope.shippingSameBilling();
                }
            }
        }

        $scope.appendStep1 = function () {

            $scope.addCardErrorMessage = "";
            $scope.invalidOtherValue = "";

            if ($scope.newCard.Denomination.displayValue == 'Other') {
                if (!$scope.newCard.Denomination.otherValue || $scope.newCard.Denomination.otherValue > 200 || $scope.newCard.Denomination.otherValue < 10) {
                    $scope.invalidOtherValue = "Please enter a value from $10.00 to $200.00.";
                    return false;
                }
            }
            addCardToCart($scope.newCard);
            $scope.feeMath();
        }

        $scope.toggleCarrier = function (showOrHide) {
            if ($scope.CardCarrierEnabled)
                $scope.newCard.IncludeCarrier = showOrHide;
        };

        $scope.quantityChange = function () {
            if ($scope.newCard.Quantity > 1) {
                $scope.newCard.IncludeCarrier = false;
            }
        }

        $scope.denominationChange = function () {
            if ($scope.newCard.Denomination.value == "0") {
                $scope.allowOtherDenomination = true;
            }
            else {
                $scope.allowOtherDenomination = false;
            }
        }

        $scope.selectCardNew = function (cardIn) {
            $scope.cardIsSelected = true;
            $scope.allowOtherDenomination = false;
            var fiftyexists = false;
            var denominations = [];
            for (var i = 0; i < cardIn.Denominations.length; i++) {
                var newDenominationObject = new Object();
                if (cardIn.Denominations[i] == 0) {
                    newDenominationObject.displayValue = "Other";
                } else {
                    newDenominationObject.displayValue = cardIn.Denominations[i];
                }

                newDenominationObject.value = cardIn.Denominations[i];

                if (newDenominationObject.value == "50" && $scope.newCard.Denomination.value == undefined) //default ddls to 50
                    $scope.newCard.Denomination = newDenominationObject;

                newDenominationObject.id = i;
                denominations.push(newDenominationObject);
            }

            if ($scope.newCard.Denomination == undefined)
                $scope.newCard.Denomination = denominations[0];


            $scope.newCard.CardDescription = cardIn.CardDescription;
            $scope.newCard.prop = denominations;
            $scope.newCard.quant = cardIn.Quantities;
            $scope.newCard.CardID = cardIn.CardID;
            $scope.selectedCardImageName = cardIn.CardLogoUrl;
            $scope.newCard.CarrierCost = cardIn.CarrierCost;
        };

        $scope.showConfirmOrderModal = function () {
            if ($scope.invalidOtherValue == '' && $scope.addCardErrorMessage == '') {
                $('#myModalConfirmOrder').appendTo("body").modal('show');
            }
        }

        $scope.showRemoveCardModal = function () {
            $('#removeCardModal').appendTo("body").modal('show');
        }
        $scope.showSecurityModal = function () {
            $('#securityCodeModal').appendTo("body").modal('show');
        }
        $scope.showModal = function (modalname) {
            $('#' + modalname).appendTo("body").modal('show');
        }
        $scope.showPinModal = function () {
            $('#pinModal').appendTo("body").modal('show');
        }

        $scope.removeIndex = -1;
        $scope.setRemoveIndex = function (index) {
            $scope.removeIndex = index;
        }
        $scope.removeCard = function () {
            $scope.inner.splice($scope.removeIndex, 1);
            $scope.SetInnerCookie();
            $scope.feeMath();
        }

        $scope.promoGarbage = false;
        $scope.applyPromo = function(){
            $scope.promoGarbage = true;
        }

        $scope.logOut = function () {
            $cookies.remove("User");
            $cookies.remove("UserID");
            $scope.UserInfo.UserName = '';
        }

        $scope.shippingSameBilling = function () {
            $scope.shippingChequed = !$scope.shippingChequed;
            if ($scope.shippingChequed) {
                $scope.shipping = $scope.billing;
            } else {
                $scope.shipping = {
                    FirstName: '',
                    LastName: '',
                    StreetAddress1: '',
                    StreetAddress2: '',
                    City: '',
                    State: '',
                    ZipCode: '',
                    Phone: '',
                    Email: '',
                }
            }
        }

        $scope.SendOrderToGoogle = function () {
            if (ga != null) {
                try {
                    ga('ecommerce:addTransaction', {
                        'id': $scope.purchaseTransaction.OrderID,                     // Transaction ID. Required.
                        'revenue': $scope.checkoutTotals.GrandTotal,               // Grand Total.
                    });

                    for (var i = 0; i < $scope.inner.length; i++) {
                        ga('ecommerce:addItem', {
                            'id': $scope.purchaseTransaction.OrderID,                     // Transaction ID. Required.
                            'name': $scope.inner[i].CardDescription,    // Product name. Required.
                            'price': $scope.inner[i].Denomination,                 // Unit price.
                            'quantity': $scope.inner[i].Quantity                   // Quantity.
                        });
                    }

                    ga('ecommerce:send');
                }
                catch (e) {
                    ga('ecommerce:clear');
                }
            }
        }

        inObj = { "clientID": $scope.client, "cards": $scope.inner, "shippingCode": $scope.options.code };
        $scope.getCardsForClient(endpoint, inObj);
      
        $scope.getShippingOptions(endpoint2, inObj);
        $scope.getTransactionLimit();
        $scope.GetStates(endpoint7, { "clientID": $scope.client });

        function addCardToCart(cardIn) {
            var cardCost = Number(0);
            var newObject = new Object();
            if (cardIn.Denomination.displayValue == 'Other') {
                newObject.Denomination = cardIn.Denomination.otherValue;
            } else {
                newObject.Denomination = cardIn.Denomination.value;
            }
            newObject.Quantity = cardIn.Quantity;
            newObject.total = cardIn.total;
            newObject.CardDescription = cardIn.CardDescription;
            newObject.CardID = cardIn.CardID;

            cardCost += (newObject.Denomination * newObject.Quantity);

            newObject.IncludeCarrier = cardIn.IncludeCarrier;
            for (var i = 0; i < $scope.allCurrentCards.cards.length; i++) {
                if ($scope.allCurrentCards.cards[i].CardID == cardIn.CardID) {
                    newObject.possibleDenominations = $scope.allCurrentCards.cards[i].Denominations;
                    newObject.possibleQuantities = $scope.allCurrentCards.cards[i].Quantities;
                }
            }
            newObject.CardLogoUrl = $scope.selectedCardImageName;
            newObject.CarrierCost = 0;
            if (cardIn.IncludeCarrier) {
                newObject.CarrierCost = cardIn.CarrierCost;
                newObject.carrier = new Object();
                newObject.carrier.To = cardIn.carrier.To;
                newObject.carrier.From = cardIn.carrier.From;
                newObject.carrier.Message = cardIn.carrier.Message;

                cardCost += (cardIn.CarrierCost);
            }

            if (($scope.Cart.Total + cardCost) > $scope.DollarLimit) {
                $scope.addCardErrorMessage = "Cart balance would exceed the $" + $scope.DollarLimit.toString() + " transaction limit.";
                return false;
            }

            if ($scope.Cart.Count == $scope.QuantityLimit || ($scope.Cart.Count + Number(newObject.Quantity)) > $scope.QuantityLimit) {
                $scope.addCardErrorMessage = "Cart quantity would exceed the " + $scope.QuantityLimit.toString() + " card limit.";
                return false;
            }

            $scope.inner.push(newObject);

            $scope.SetInnerCookie();

            if (!$scope.onlyOneCard()) {
                $scope.cardIsSelected = false;
            }
        }

        $scope.Cart = {
            get Count() {
                var sum = Number(0);
                for (var i = 0; i < $scope.inner.length; i++) {
                    sum = sum + Number($scope.inner[i].Quantity);
                }
                return sum;
            },
            get Total() {
                var sum = Number(0);
                for (var i = 0; i < $scope.inner.length; i++) {
                    $scope.inner[i].total = $scope.inner[i].Quantity * $scope.inner[i].Denomination;
                    var tot = $scope.inner[i].total;
                    if ($scope.inner[i].IncludeCarrier) {
                        tot += $scope.inner[i].CarrierCost;
                    }
                    sum += parseInt(tot);
                    $scope.inner[i].total = tot;
                    $scope.bigTotal = sum;
                }
                return sum;
            }

        }
        $scope.IsShippingEnabled = function (shipping) {
            if (shipping.AmountLimit != null) {
                var total = $scope.Cart.Total;
                if (total > shipping.AmountLimit) {
                    return true;
                }
            }

            if (shipping.CardQuantityEnd != null) {
                var total = $scope.Cart.Count;
                if (total > shipping.CardQuantityEnd) {
                    return true;
                }
            }

            return false;
        }

        $scope.IsShippingSameAsBillingDisabled = function () {
            if ($scope.BillingSameAsShippingLimit != null) {
                var total = $scope.Cart.Total;
                if (total > $scope.BillingSameAsShippingLimit) {
                    return true;
                }
            }

            return false;
        }

        $scope.QuantityFilter = function () {
            return function (item) {
                return item <= ($scope.QuantityLimit);
            }
        }

        $scope.sortDenominations = function (item) {
            return parseInt(item.value);
        };

        $scope.sortShipping = function (item) {
            return parseFloat(item.Cost);
        };
              
    }
    var app = angular.module("mainApp");
    app.controller("PageController", PageController);

    app.filter('giftcardMask', function () {
        return function (input, num) {
            if (isNaN(num) || num < 0) {
                return String(input).replace(/./g, ' ');
            }
            var mask = RegExp('(.{1,' + num + '}$)|.', 'g');
            return String(input).replace(mask, function (hide, show) {
                return show || 'x';
            });
        };
    });

    app.filter('price', function () {
        return function (num) {
            return isNaN(num) ? num : '$' + num;
        };
    });    

    app.directive('dollars', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        }
    })
    /* may use later
    app.directive('dateInput', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                var listener = function () {
                    var value = $element.val();
                };
                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function () {
                    $browser.defer(listener);
                });

            }
        };
    });
    */
    app.directive('phoneInput', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                var listener = function () {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('tel')(value, false));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function () {
                    $browser.defer(listener);
                });
            }

        };
    });
    app.filter('tel', function () {
        return function (tel) {
            console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }

            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                }
                else {
                    number = number;
                }

                return ("(" + city + ") " + number).trim();
            }
            else {
                return "(" + city;
            }

        };
    });
}());


