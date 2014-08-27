var __blank = "";

var printMatrix = function(matrix) {
  console.log(__blank + matrix.m11 + "\t" + matrix.m21 + "\t" +
      matrix.m31 + "\t" + matrix.m41 + "\n" + __blank +
      matrix.m12 + "\t" + matrix.m22 + "\t" +
      matrix.m32 + "\t" + matrix.m42 + "\n" + __blank +
      matrix.m13 + "\t" + matrix.m23 + "\t" +
      matrix.m33 + "\t" + matrix.m43 + "\n" + __blank +
      matrix.m14 + "\t" + matrix.m24 + "\t" +
      matrix.m34 + "\t" + matrix.m44);
};

var __queue = [];
var __lock = false;

var measurePerformance = function(parameters) {

  if (parameters.matrix == undefined) {
    console.error("You should set target matrix.");
    return;
  }
  if (parameters.test == undefined) {
    console.error("You should set test function.");
    return;
  }
  if (parameters.repeatCount == undefined) {
    parameters.repeatCount = 1000;
  }
  if (parameters.description == undefined) {
    parameters.description = "Unknown test";
  }

  __queue.push(parameters);
  if (__lock)
    return;

  var measure = function() {
    if (picker != null) {
      clearTimeout(picker);
      picker = null;
    }

    if (__queue.length == 0) {
      __lock = false;
      return;
    }

    __lock = true;
    var parameters = __queue.shift();

    var matrix = parameters.matrix;
    var repeatCount = parameters.repeatCount;

    console.log(parameters.description);
    console.log("Before:");
    __blank = "\t";
    printMatrix(matrix);
    var startTime = performance.now();

    for (var tryCount = 0; tryCount < repeatCount; tryCount++) 
      parameters.test(matrix, tryCount);

    var endTime = performance.now();
    console.log("After:");
    printMatrix(matrix);
    __blank = "";
    console.log("Result: " + (endTime - startTime));
    console.log("");

    setTimeout(measure, 1000);
  };

  var picker = setTimeout(measure, 0);
};
