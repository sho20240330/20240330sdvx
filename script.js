document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.getElementById('calculateButton');
    var vfInput = document.getElementById('vfInput');
    var scoreInput = document.getElementById('scoreInput');
    var goalScoreInput = document.getElementById('goalScoreInput');
  
    vfInput.addEventListener('input', function() {
      toggleButtonState();
    });
    scoreInput.addEventListener('input', function() {
        formatNumberInput(scoreInput, 8);
        toggleButtonState();
    });
    
    goalScoreInput.addEventListener('input', function() {
        formatNumberInput(goalScoreInput, 8);
        toggleButtonState();
    });
  
    function toggleButtonState() {
        var vfValue = vfInput.value.trim().replace(/,/g, '');
        var scoreValue = scoreInput.value.trim().replace(/,/g, '');
        var goalScoreValue = goalScoreInput.value.trim().replace(/,/g, '');
    
        if (isValidNumber(vfValue) && isValidNumber(scoreValue) && isValidNumber(goalScoreValue)) {
            calculateButton.removeAttribute('disabled');
        } else {
            calculateButton.setAttribute('disabled', 'disabled');
        }
    }
  
    document.getElementById('scoreForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      var vf = parseFloat(vfInput.value);
      var score = parseInt(scoreInput.value.replace(/,/g, ''));
      var goalScore = parseInt(goalScoreInput.value.replace(/,/g, ''));

      if (score >= goalScore) {
        score = goalScore;
      }
  
      var handicap = getHandicapByVF(vf);
      var deductionScore = (goalScore - score) * (vf / 10) + handicap;
      var actualScore = score - deductionScore;
  
      document.getElementById('result').innerHTML = "<p class='result-message'>獲得スコア: " + numberWithCommas(Math.round(actualScore));
    });
  
    function getHandicapByVF(vf) {
      if (vf >= 0 && vf < 17) return 0;
      else if (vf >= 17 && vf < 18) return 5000;
      else if (vf >= 18 && vf < 18.5) return 10000;
      else if (vf >= 18.5 && vf < 19) return 20000;
      else if (vf >= 19 && vf < 19.5) return 30000;
      else if (vf >= 19.5 && vf < 20) return 40000;
      else if (vf >= 20 && vf < 20.5) return 50000;
      else if (vf >= 20.5 && vf < 21) return 75000;
      else return 90000;
    }
  
    function formatNumberInput(input, maxDigits) {
        var value = input.value.replace(/,/g, '');
        if (value.length > maxDigits) {
            value = value.substring(0, maxDigits);
        }
        var formattedValue = numberWithCommas(value);
        input.value = formattedValue;
    }
  
    function isValidNumber(value) {
      return !isNaN(value) && value !== '';
    }
  
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });
  