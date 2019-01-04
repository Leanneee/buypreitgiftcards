

(function () {

    var OperationsController = function ($http, $scope, $log, $location, $timeout) {

        var counter = 0;

        $scope.$on('threeShow', function (e) {
            $scope.threeShow();
        });

        $scope.scrollToTop = function () {
            window.scrollTo(0, 0);
        }

        $scope.keypressCallback = function ($event) {
            $event.target.blur();
        };

        $scope.tab1 = function () {
            $('#oneTab').addClass('visited');
            $('#twoTab').removeClass('visited');
            $('#threeTab').removeClass('visited');
            $('#oneTabBorder').addClass('activated');
            $('#twoTabBorder').removeClass('activated');
            $('#threeTabBorder').removeClass('activated');
        }
        $scope.tab2 = function () {
            $('#oneTab').addClass('visited');
            $('#twoTab').addClass('visited');
            $('#threeTab').removeClass('visited');
            $('#oneTabBorder').addClass('activated');
            $('#twoTabBorder').addClass('activated');
            $('#threeTabBorder').removeClass('activated');
        }
        $scope.tab3 = function () {
            $('#oneTab').addClass('visited');
            $('#twoTab').addClass('visited');
            $('#threeTab').addClass('visited');
            $('#oneTabBorder').addClass('activated');
            $('#twoTabBorder').addClass('activated');
            $('#threeTabBorder').addClass('activated');
        }
        $scope.oneShow = function () {
            $('#firstTab').removeClass('hidden');
            $('#secondTab').addClass('hidden');
            $('#thirdTab').addClass('hidden');
            $timeout(function () {
                var carousel = $('.jcarousel'),
                    width = carousel.innerWidth();

                var counter = carousel[0].firstElementChild.children.length;

                if (width >= 600 && counter > 2) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }
                
                for (var i = 0; i < carousel[0].firstElementChild.children.length; i++) {
                    carousel[0].firstElementChild.children[i].style.width = Math.ceil(width) + 'px';
                }
            })
            $scope.tab1();
        }
        $scope.twoShow = function () {
            $('#secondTab').removeClass('hidden');
            $('#firstTab').addClass('hidden');
            $('#thirdTab').addClass('hidden');
            $scope.tab2();
        }
        $scope.twoShowAdd = function () {
            if ($scope.UserInfo.UserName) {
                $scope.threeShow()
            } else {
                $scope.twoShow()
            }
        }
        $scope.threeShow = function () {
            $('#thirdTab').removeClass('hidden');
            $('#secondTab').addClass('hidden');
            $('#firstTab').addClass('hidden');
            $scope.tab3();
        }

        $scope.promoModal = function () {
            var path = $location.path();
            if (path == "/order/thankyou") {
                setTimeout(function () {
                    $('#myModal3').appendTo("body").modal('show');
                }, 4000);
            }
        }
        
        $scope.purchaseIt = function () {

            //$.validator.addMethod("regx", function (value, element, regexpr) {
            //    return !regexpr.test(value);
            //}, "PO Box is not allowed.");  

            $("#signupForm").validate({
                rules: {
                    firstname: "required",
                    lastname: "required",
                    city: "required",
                    address: {
                        required: true
                        //regx: /^ *((#\d+)|((box|bin)[-. \/\\]?\d+)|(.*p[ \.]? ?(o|0)[-. \/\\]? *-?((box|bin)|b|(#|num)?\d+))|(p(ost)? *(o(ff(ice)?)?)? *((box|bin)|b)? *\d+)|(p *-?\/?(o)? *-?box)|post office box|((box|bin)|b) *(number|num|#)? *\d+|(num|number|#) *\d+)/i
                    },
                    fullname: "required",
                    expYear: { required: true },
                    state: { required: true },
                    Bstate: { required: true },
                    expMonth: { required: true },
                    Pnumber: {
                        phoneUS: true
                    },
                    //credit: {
                    //    required: true,
                    //    creditcard: true
                    //},
                    //cvc: {
                    //    required: true,
                    //    digits: true,
                    //    minlength: 3,
                    //    maxlength: 4,
                    //},
                    zipcode: {
                        required: true,
                        digits: true,
                        minlength: 5,
                        maxlength: 5,
                    },
                    Bfirstname: "required",
                    Blastname: "required",
                    Bcity: "required",
                    Baddress: {
                        required: true
                        //regx: /^ *((#\d+)|((box|bin)[-. \/\\]?\d+)|(.*p[ \.]? ?(o|0)[-. \/\\]? *-?((box|bin)|b|(#|num)?\d+))|(p(ost)? *(o(ff(ice)?)?)? *((box|bin)|b)? *\d+)|(p *-?\/?(o)? *-?box)|post office box|((box|bin)|b) *(number|num|#)? *\d+|(num|number|#) *\d+)/i
                    },
                    Bzipcode: {
                        required: true,
                        digits: true,
                        minlength: 5,
                        maxlength: 5,
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    emails: {
                        required: true,
                        email: true
                    },
                    agree: "required"
                },
                messages: {
                    emails: {
                        required: "Required",
                        email: "Please enter a valid email address"
                    },
                    email: {
                        required: "Required",
                        email: "Please enter a valid email address"
                    },
                    SPnumber: {
                        required: "Required"
                    },
                    Pnumber: {
                        required: "Required"
                    },
                    firstname: "Required",
                    lastname: "Required",
                    city: "Required",
                    address: {
                        required: "Required"
                    },
                    state: {
                        required: "Required"
                    },
                    expYear: {
                        required: "Required"
                    },
                    expMonth: {
                        required: "Required"
                    },
                    //credit: {
                    //    required: "Required",
                    //    creditcard: "Invalid Number"
                    //},
                    fullname: "Required",
                    //cvc: {
                    //    required: "Required",
                    //    minlength: "Invalid",
                    //    maxlength: "Invalid",
                    //    digits: "Invalid"
                    //},
                    zipcode: {
                        required: "Required",
                        minlength: "Invalid",
                        maxlength: "Invalid",
                        digits: "Invalid"
                    },
                    Bfirstname: "Required",
                    Blastname: "Required",
                    Bcity: "Required",
                    Baddress: {
                        required: "Required"
                    },
                    Bstate: {
                        required: "Required"
                    },
                    Bzipcode: {
                        required: "Required",
                        minlength: "Invalid",
                        maxlength: "Invalid",
                        digits: "Invalid"
                    },
                    agree: "Please accept our policy"
                },
                focusInvalid: false,
                invalidHandler: function (form, validator) {

                    if (!validator.numberOfInvalids())
                        return;

                    $('#scrollbody').scrollTop($('#scrollbody').scrollTop() - $('#scrollbody').offset().top + $($(validator.errorList[0].element)).offset().top - 200);
                }
            });

            if ($("#signupForm").valid() && $scope.checkoutTotals.Success) {
                PaymentSession.updateSessionFromForm('card');
            };
        }

        $scope.createIt = function (emailIn, nameIn, lastIn, passwordIn, companyIn, phoneIn) {
            $("#createAcc").validate({
                rules: {
                    Fname: "required",
                    Lname: "required",
                    EmailM: {
                        required: true,
                        email: true
                    },
                    EmailM2: {
                        equalTo: "#EmailM"
                    },
                    password1: {
                        required: true,
                        minlength: 5,
                    },
                    password2: {
                        equalTo: "#password1"
                    },
                    phoneM: {
                        required: true,
                        phoneUS: true
                    }
                },
                messages: {
                    Fname: "Required",
                    Lname: "Required",
                    EmailM: {
                        required: "Required",
                        email: "Please enter a valid email address"
                    },
                    EmailM2: {
                        required: "Required"
                    },
                    password1: {
                        required: "Required",
                        minlength: "Password minimum length of 8"
                    },
                    password2: {
                        required: "Required"
                    },
                    phoneM: {
                        required: "Required"
                    }
                }
            });
            if ($("#createAcc").valid()) {
                $scope.CreateAccount(emailIn, nameIn, lastIn, passwordIn, companyIn, phoneIn);
            };
        }

        if ($location.search().target) {
            if ($scope.inner.length > 0)
                $scope.threeShow();
        }

        PaymentSession.configure({
            fields: {
                card: {
                    number: "#credit",
                    securityCode: "#cvc",
                    expiryMonth: "#expMonth",
                    expiryYear: "#expYear"
                }
            },
            frameEmbeddingMitigation: ["javascript"],
            formatCard: true,
            callbacks: {
                formSessionUpdate: function (response) {
                    $scope.ccError.CCV = "";
                    $scope.ccError.Card = "";
                    var sessionid = "";
                    if (response.status) {
                        if ("ok" == response.status) {
                            sessionid = response.session.id;

                            if (!response.sourceOfFunds.provided.card.securityCode) {
                                $scope.ccError.CCV = "Security code is missing.";
                            }

                        } else if ("fields_in_error" == response.status) {
                            var lblExpire = "";
                            if (response.errors.cardNumber) {
                                $scope.ccError.Card = "Card number invalid or missing.";
                            }
                            if (response.errors.securityCode) {
                                $scope.ccError.CCV = "Security code invalid.";
                            }
                        } else if ("request_timeout" == response.status) {
                            console.log("Session update failed with request timeout: " + response.errors.message);
                        } else if ("system_error" == response.status) {
                            console.log("Session update failed with system error: " + response.errors.message);
                        }
                    } else {
                        console.log("Session update failed: " + response);
                    }
                    $scope.$apply();

                    if (sessionid
                        && !$scope.ccError.Card
                        && !$scope.ccError.CCV) {
                        $scope.Purchase(sessionid);
                    }
                }
            }
        });
    }
    var app = angular.module("mainApp");
    app.controller("OperationsController", OperationsController);
}());