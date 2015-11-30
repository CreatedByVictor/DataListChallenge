(function() {
    'use strict';

    angular
        .module('core')
        .directive('sortLabel', sortLabel);

    sortLabel.$inject = [];

    /* @ngInject */
    function sortLabel() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            templateUrl:'app/core/directive-templates/sort-label.html',
            controller: sortLabelController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                isReversed:"=isReversed",
                isSelected:"=isSelected",
                
                isAlpha:"=isAlpha",
                isAmmount:"=isAmmount",
                isNumeric:"=isNumeric",

                text:"=text",
                inverted:"=inverted",

                regText:"=regularText",
                revText:"=reverseText",
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	scope.text 			= attrs.text;
        	scope.inverted 		= attrs.inverted;

            scope.Alpha         = attrs.isAlpha;
            scope.Ammount       = attrs.isAmmount;
            scope.Numeric       = attrs.isNumeric;

        	scope.isSelected 	= attrs.isSelected;
        	scope.isReversed 	= attrs.isReversed;
        	scope.clickAction 	= attrs.clickAction;

            scope.regText   = attrs.regularText;
            scope.revText   = attrs.reverseText
        }
    }

    /* @ngInject */
    function sortLabelController() {
    	var vm = this;

    	vm.clickAction 	= this.clickAction;
    	//vm.reverse 		= inversionHandler(this.inverted);
    	vm.selected 	= selected;
        vm.reversed     = reversed;
    	//vm.text 		= this.text;
        vm.isAlpha      = isAlpha;
        vm.isNumeric    = isNumeric;
        vm.isAmmount    = isAmmount;
        vm.reverseText  = this.regText;
        vm.regularText  = this.revText;

    	function inversionHandler(isInverted){
    		if(angular.isUndefined(isInverted)){
    			isInverted = false;
    		}
    		if (isInverted == true){
    			return !vm.isReversed;
    		}else{
    			return vm.isReversed;
    		}
    	}
        function reversed(){
            //return this.isReversed;
            return inversionHandler(this.inverted);
        };
        function selected(){
            return this.isSelected;
        };
        function isAlpha(){
            return this.Alpha;
        };
        function isAmmount(){
            return this.Ammount;
        };
        function isNumeric(){
            return this.Numeric;
        };

    }

})();