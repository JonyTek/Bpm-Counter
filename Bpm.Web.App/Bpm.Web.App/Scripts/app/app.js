(function() {
    'use strict';

    angular
        .module('app', []);

    angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = [];

    function MainCtrl() {
        var vm = this;
        
        vm.reset = reset;
        vm.calculateBpm = calculateBpm;
        vm.savedTracks = [];
        vm.saveTrack = saveTrack;
        vm.removeTrack = removeTrack;
        vm.modifyTrack = modifyTrack;
        vm.moveUp = moveUp;
        vm.moveDown = moveDown;

        var lastClick = null;
        var timeBetweenClicks = [];

        function averageTime() {
            var sum = timeBetweenClicks.reduce(function(a, b) {
                 return a + b;
            });

            return sum / timeBetweenClicks.length;
        }

        function calculateBpm() {
            var clickedAt = new Date();

            if (!lastClick) {
                lastClick = clickedAt;

                return;
            }

            timeBetweenClicks.push(clickedAt - lastClick);

            vm.currentTrack.bpm = Math.floor(1000 / averageTime() * 60);

            lastClick = clickedAt;
        }

        function reset() {
            vm.currentTrack = {
                bpm: '---',
                name: ''
            };

            lastClick = null;
            timeBetweenClicks = [];
        }

        function saveTrack() {
            if (vm.currentTrack.id) {
                for (var i = 0; i < vm.savedTracks.length; i++) {
                    if (vm.savedTracks[i].id === vm.currentTrack.id) {
                        vm.savedTracks[i] = vm.currentTrack;
                        break;
                    }
                }
            } else {
                vm.currentTrack.id = vm.savedTracks.length + 1;
                vm.savedTracks.push(vm.currentTrack);
            }
           
            reset();
        }

        function removeTrack(id) {
            for (var i = 0; i < vm.savedTracks.length; i++) {
                if (vm.savedTracks[i].id === id) {
                    vm.savedTracks.splice(i, 1);
                    return;
                }
            }
        }

        function modifyTrack(track) {
            vm.currentTrack = angular.copy(track);
        }

        function moveUp(track) {
            var index = vm.savedTracks.indexOf(track);

            if (index === 0) return;

            vm.savedTracks.splice(index - 1, 0, vm.savedTracks.splice(index, 1)[0]);
        }

        function moveDown(track) {
            var index = vm.savedTracks.indexOf(track);

            if (index === vm.savedTracks.length - 1) return;

            vm.savedTracks.splice(index + 1, 0, vm.savedTracks.splice(index, 1)[0]);
        }

        reset();
    }
})()