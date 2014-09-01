"use strict";

(function () {

    var moduleName = 'net.bitflower.angular.input';

    angular.module(moduleName, []);

    // bfInputModeller directive
    // bf-prepend-text: Add text to the beginning of the value
    // bf-prevent-space: true = no space allowed
    // bf-upper-case: true = typed chars are trandformed to upper case
    angular.module(moduleName).directive('bfInputModeller', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                // Prepend text
                if (attrs.bfPrependText != undefined && attrs.bfPrependText != '') {
                    element.val(attrs.bfPrependText);
                }

                // modelCtrl = ngModel !
                modelCtrl.$parsers.push(function (inputValue) {

                    if (inputValue == undefined) {
                        return;
                    }

                    var transformedInput = inputValue;

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

                    //console.log(attrs);
                    //if (attrs.ngMaxlength != undefined && attrs.ngMaxlength != '' && transformedInput.length > parseInt(attrs.ngMaxlength)) {
                    //    transformedInput = transformedInput.substring(0, attrs.ngMaxlength);
                    //}

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