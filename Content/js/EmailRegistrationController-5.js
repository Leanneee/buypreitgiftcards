

(function () {

    var EmailRegistrationController = function ($http, $scope, $log, $location, $timeout) {
        var counter = 0;
        $scope.GetQuestionaireByType(1);
        $scope.SendEmail = function (FullName, phone, companyName, email, address, taxid, qty, denomination, date, legal, Questionnaire) {
            $('#registrationSignUpForm').validate({
                rules: {
                    BFullName: "required",
                    Pnumber: "required",
                    BcompanyName: "required",
                    Bemail: {
                        requried: true,
                        email: true
                    },
                    Baddress: "required",
                    BtaxId: "required",
                    Bcity: "required",
                    Bstate: "required",
                    legal: "required"

                }
            });
            if ($('#registrationSignUpForm').valid()) {
                $scope.SendEmailRegistration(FullName, phone, companyName, email, address, taxid, qty, denomination, date, Questionnaire);
            }
        };
    }
        
        var app = angular.module("mainApp");
        app.controller("EmailRegistrationController", EmailRegistrationController);
    }());