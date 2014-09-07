// Copyright (c) 2014 All Right Reserved, http://bitflower.net/
//
// </copyright>
// <author>Matthias Max</author>
// <email>touch@bitflower.net</email>
// <date>2014-09-01</date>
// <version>0.0.2</version>

"use strict";

(function () {

    var moduleName = 'net.bitflower.angular.input';

    angular.module(moduleName, []);

    // bfInputModeller directive
    // bf-prepend-text:         Add non-deleteable text to the beginning of the value
    // bf-prevent-space:        true = no space allowed
    // bf-upper-case:           true = typed chars are transformed to upper case
    // bf-lower-case:           true = typed chars are transformed to lower case
    // bf-max-length:           number = only allow a certain number of chars to be entered
    // bf-min-length:           number = invalidates form is input char count is lower
    angular.module(moduleName).directive('bfInputModeller', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                // Prepend text
                if (attrs.bfPrependText != undefined && attrs.bfPrependText != '' && attrs.ngModel != undefined && scope[attrs.ngModel] == '') {
                    scope[attrs.ngModel] = attrs.bfPrependText;
                }

                // modelCtrl = ngModel !
                modelCtrl.$parsers.push(function (inputValue) {

                    if (inputValue == undefined) {
                        return;
                    }

                    var transformedInput = inputValue;

                    // Max length
                    if (attrs.bfMaxLength != undefined && attrs.bfMaxLength != '' && transformedInput.length > parseInt(attrs.bfMaxLength)) {
                        transformedInput = transformedInput.substring(0, attrs.bfMaxLength);
                    }

                    // Min length
                    if (attrs.bfMinLength != undefined && attrs.bfMinLength != '' && transformedInput.length < parseInt(attrs.bfMinLength)) {
                        modelCtrl.$setValidity("bf-min-length", false);
                    } else {
                        modelCtrl.$setValidity("bf-min-length", true);
                    }

                    // Prepend text
                    if (attrs.bfPrependText != undefined && attrs.bfPrependText != '') {
                        var prependText = attrs.bfPrependText;
                        // Remove prependText before adding
                        if (transformedInput != '') {
                            if (transformedInput.length > prependText.length) {
                                if (transformedInput.substring(0, prependText.length) !== prependText) {
                                    transformedInput = prependText + transformedInput;
                                }
                                modelCtrl.$setValidity("bf-prepend-text", true);
                            } else {

                                transformedInput = prependText;

                                modelCtrl.$setValidity("bf-prepend-text", false);

                            }
                        } else {
                            transformedInput = prependText;
                            modelCtrl.$setValidity("bf-prepend-text", false);
                        }
                    }

                    // Remove space with RegEx
                    if (attrs.bfPreventSpace != undefined && attrs.bfPreventSpace != '') {
                        transformedInput = transformedInput.replace(/ /g, '');
                    }

                    // Upper case
                    if (attrs.bfUpperCase != undefined && attrs.bfUpperCase != '') {
                        transformedInput = transformedInput.toUpperCase();
                    }

                    // Lower case
                    if (attrs.bfLowerCase != undefined && attrs.bfLowerCase != '') {
                        transformedInput = transformedInput.toLowerCase();
                    }

                    // No numbers
                    if (attrs.bfNoNumbers != undefined && attrs.bfNoNumbers != '') {
                        transformedInput = transformedInput.replace(/\d+/g, '');
                    }

                    // Remove Sonderzeichen, except Underscore
                    if (attrs.bfAlphaUnderscore != undefined && attrs.bfAlphaUnderscore != '') {
                        transformedInput = transformedInput.replace(/[^a-zA-Z0-9_]/gi, '');
                    }

                    // Apply to model only when chars where prevented
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });

})();