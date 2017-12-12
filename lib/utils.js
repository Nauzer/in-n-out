class Utils {
  vectorCrossProduct(p1, p2) {
      return p1[0] * p2[1] - p1[1] * p2[0];
  }

  vectorDifference(p1, p2) {
      return [p1[0] - p2[0], p1[1] - p2[1]];
  }

  segmentsIntersect(s1p1, s1p2, s2p1, s2p2) {
      // Based on http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
      var p = s1p1;
      var r = this.vectorDifference(s1p2, s1p1);
      var q = s2p1;
      var s = this.vectorDifference(s2p2, s2p1);

      var rCrossS = this.vectorCrossProduct(r, s);
      var qMinusP = this.vectorDifference(q, p);

      if (rCrossS === 0) {
          if (this.vectorCrossProduct(qMinusP, r) === 0) { // collinear segments
              return true;
          } else {
              return false;
          }
      }

      var t = this.vectorCrossProduct(qMinusP, s) / rCrossS;
      var u = this.vectorCrossProduct(qMinusP, r) / rCrossS;

      return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }

  haveIntersectingEdges(poly1, poly2) {
      for (var idx1 = 0; idx1 < poly1.length - 1; idx1++){
          for (var idx2 = 0; idx2 < poly2.length - 1; idx2++) {
              if (this.segmentsIntersect(poly1[idx1], poly1[idx1 + 1], poly2[idx2], poly2[idx2 + 1])) {
                  return true;
              }
          }
      }

      return false;
  }

  // Does the source have any points inside the target
  hasPointInPolygon(sourcePoly, targetPoly) {
      for (var idx = 0; idx < sourcePoly.length - 1; idx++) {
          if (this.pointInPolygon(sourcePoly[idx], targetPoly)) {
              return true;
          }
      }

      return false;
  }

  project(value, tileSize) {
      return Math.floor(value / tileSize);
  }

  pointInPolygon(point, vs) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

      var x = point[0], y = point[1];

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
  }
}

export { Utils };
