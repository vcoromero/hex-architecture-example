class ValueObject {
  constructor(props) {
    this.props = Object.freeze({ ...props });
  }

  equals(vo) {
    if (!vo || !(vo instanceof ValueObject)) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}

module.exports = ValueObject;
