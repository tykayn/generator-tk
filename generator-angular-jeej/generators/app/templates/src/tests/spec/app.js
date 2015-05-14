/**
 * Created by tykayn on 14/05/15.
 */
console.log(' ============== test for app.js');
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});

'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('myApp'));

    var MainCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should have a scope existing', function() {
        expect(scope).toExist(); // 7 with a start from 0
    });

});