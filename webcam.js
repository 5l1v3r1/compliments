// Generated by CoffeeScript 1.7.1
(function() {
  var lastMotion, motionDetected, playCompliment;

  window.addEventListener('DOMContentLoaded', function() {
    return navigator.webkitGetUserMedia({
      video: true,
      audio: false
    }, function(stream) {
      var url, v;
      url = window.URL;
      v = document.getElementById('video');
      v.src = url != null ? url.createObjectURL(stream) : stream;
      v.play();
      return v.addEventListener('canplay', function() {
        var canvas, context, func, h, lastData, w;
        canvas = document.createElement('canvas');
        w = v.videoWidth, h = v.videoHeight;
        console.log('width', w, 'height', h);
        canvas.width = w;
        canvas.height = h;
        context = canvas.getContext('2d');
        lastData = null;
        func = function() {
          var data, difference, i, num, percent, _i, _len;
          if (v.paused || v.ended) {
            return;
          }
          context.clearRect(0, 0, w, h);
          context.drawImage(v, 0, 0, w, h);
          difference = 0;
          data = context.getImageData(0, 0, w, h).data;
          if (lastData != null) {
            for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
              num = data[i];
              difference += Math.abs(num - lastData[i]) / 256;
            }
          }
          lastData = data;
          percent = difference / data.length;
          if (percent > 0.07) {
            motionDetected();
          }
        };
        return setInterval(func, 33);
      });
    }, function(error) {
      return alert('K, there was an error' + error);
    });
  });

  lastMotion = null;

  motionDetected = function() {
    var now;
    if (lastMotion == null) {
      lastMotion = new Date();
      return playCompliment();
    } else {
      now = new Date();
      if (Math.abs(lastMotion.getTime() - now.getTime()) > 2000) {
        playCompliment();
        return lastMotion = now;
      }
    }
  };

  playCompliment = function() {
    var audio;
    audio = new Audio('test.wav');
    return audio.play();
  };

}).call(this);
