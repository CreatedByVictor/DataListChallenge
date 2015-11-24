(function() {
    'use strict';

    angular
        .module('core')
        .factory('utilityService', utilityService);

    utilityService.$inject = ['$document', '$window'];

    /* @ngInject */
    function utilityService($document, $window) {
        var docWidth = $window.innerWidth || $document.documentElement.clientWidth || $document.body.clientWidth;
        var docHeight = $window.innerHeight || $document.documentElement.clientHeight || $document.body.clientHeight;

        var service = {
            addZeroPadding: addZeroPadding, // (input, total digits) > output
            docWidth:docWidth,
            docHeight:docHeight,
            formatDateObjectToText: formatDateObjectToText, // (Date() object) > 'November 26, 1986 22:26:03'
            pushIfUnique:pushIfUnique, // (inputArray, testItem) > Input Array with or without testItem
            isMobilePortraitMode:isWindowWidthOrSmaller(320),
            isMobileLandscapeMode:isWindowWidthOrSmaller(480),
        };
        return service;

        ////////////////

        function addZeroPadding(input, digits) {
            if (!digits) {
                digits = 2;
            }
            var output = input.toString();
            for (var i = 0; output.length < digits; i++) {
                output = "0" + output;
            };
            return output;
        };
        function formatDateObjectToText(dateObject) {
            var output;
            var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            if (typeof dateObject.getMonth === "function") {
                var month = monthArray[dateObject.getMonth()];
                var day = addZeroPadding(dateObject.getDate());
                var year = dateObject.getFullYear();
                var hour = addZeroPadding(dateObject.getHours());
                var minute = addZeroPadding(dateObject.getMinutes());
                var second = addZeroPadding(dateObject.getSeconds());
                output = month + " " + day + ", " + year + " " + hour + ":" + minute + ":" + second;
            } else {
                console.error("formatDateObjectToText() Error: Requires a DateObject to be passed in.");
            }
            return output;
        };
        function pushIfUnique(array, testThing) {
            var outputArray = array;
            var isUnique = true;
            if (Array.isArray(outputArray)) {
                for (var i = 0; i < outputArray.length; i++) {
                    if (outputArray[i] == testThing) {
                        isUnique = false;
                    }
                }
                if (isUnique) {
                    outputArray.push(testThing);
                }
            } else {
                console.error("pushIfUnique() Error: First Argument must be an array.");
            }
            return outputArray;
        };
        function formatDateTo(dateObject, cssTagString){
            var formatObject = {};
            
        };

        function isWindowWidthOrSmaller(testWidth){
            return docWidth <= testWidth;
        };

    }
})();