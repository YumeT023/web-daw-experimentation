export const almostEq = (a, b, tolerance) => {
  const _a = Math.abs(a),
    _b = Math.abs(b);
  return _a - _b < tolerance;
};
