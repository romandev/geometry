var DOMMatrixPolyfill = function() {
  this._matrix = new Float64Array(
      [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);
  this._is2D = true;
};

DOMMatrixPolyfill.prototype.translateSelf = function(tx, ty, tz) {
  var argc = arguments.length;

  if (argc != 2 && argc != 3)
    return this;

  this._matrix[12] += tx * this._matrix[0] + ty * this._matrix[4];
  this._matrix[13] += tx * this._matrix[1] + ty * this._matrix[5];

  if (tz != undefined) {
    this._matrix[12] += tz * this._matrix[8];
    this._matrix[13] += tz * this._matrix[9];
    this._matrix[14] += tx * this._matrix[2] +
        ty * this._matrix[6] + tz * this._matrix[10];
    this._matrix[15] += tx * this._matrix[3] +
        ty * this._matrix[7] + tz * this._matrix[11];
    this._is2D = false;
  }

  return this;
};

DOMMatrixPolyfill.prototype.scaleNonUniformSelf = function(sx, sy, sz, ox, oy, oz) {
  this._matrix[0] *= sx;
  this._matrix[1] *= sx;
  this._matrix[2] *= sx;
  this._matrix[3] *= sx;

  this._matrix[4] *= sy;
  this._matrix[5] *= sy;
  this._matrix[6] *= sy;
  this._matrix[7] *= sy;

  this._matrix[8] *= sz;
  this._matrix[9] *= sz;
  this._matrix[10] *= sz;
  this._matrix[11] *= sz;
};

Object.defineProperty(DOMMatrixPolyfill.prototype, "a", {
  get : function() { return this.m11; },
  set : function(value) { this.m11 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "b", {
  get : function() { return this.m12; },
  set : function(value) { this.m12 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "c", {
  get : function() { return this.m21; },
  set : function(value) { this.m21 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "d", {
  get : function() { return this.m22; },
  set : function(value) { this.m22 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "e", {
  get : function() { return this.m41; },
  set : function(value) { this.m41 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "f", {
  get : function() { return this.m42; },
  set : function(value) { this.m42 = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m11", {
  get : function() { return this._matrix[0]; },
  set : function(value) { this._matrix[0] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m12", {
  get : function() { return this._matrix[1]; },
  set : function(value) { this._matrix[1] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m13", {
  get : function() { return this._matrix[2]; },
  set : function(value) { this._matrix[2] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m14", {
  get : function() { return this._matrix[3]; },
  set : function(value) { this._matrix[3] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m21", {
  get : function() { return this._matrix[4]; },
  set : function(value) { this._matrix[4] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m22", {
  get : function() { return this._matrix[5]; },
  set : function(value) { this._matrix[5] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m23", {
  get : function() { return this._matrix[6]; },
  set : function(value) { this._matrix[6] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m24", {
  get : function() { return this._matrix[7]; },
  set : function(value) { this._matrix[7] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m31", {
  get : function() { return this._matrix[8]; },
  set : function(value) { this._matrix[8] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m32", {
  get : function() { return this._matrix[9]; },
  set : function(value) { this._matrix[9] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m33", {
  get : function() { return this._matrix[10]; },
  set : function(value) { this._matrix[10] = value; this._is2D = value != 1; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m34", {
  get : function() { return this._matrix[11]; },
  set : function(value) { this._matrix[11] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m41", {
  get : function() { return this._matrix[12]; },
  set : function(value) { this._matrix[12] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m42", {
  get : function() { return this._matrix[13]; },
  set : function(value) { this._matrix[13] = value; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m43", {
  get : function() { return this._matrix[14]; },
  set : function(value) { this._matrix[14] = value; this._is2D = value != 0; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "m44", {
  get : function() { return this._matrix[15]; },
  set : function(value) { this._matrix[15] = value; this._is2D = value != 1; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "is2D", {
  get : function() { return this._is2D; }
});

Object.defineProperty(DOMMatrixPolyfill.prototype, "isIdentity", {
  get : function() {
    var expected = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
    for (var i = 0; i < this._matrix.length; i++)
      if (this._matrix[i] != expected[i])
        return false;
    return true;
  }
});
