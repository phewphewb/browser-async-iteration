export class UiString extends String {
  constructor(value = "") {
    super(value);
  }
  span(value, className = "") {
    return new UiString(this + `<span class=${className}>${value}</span>`);
  }
  li(value, className = "") {
    return new UiString(this + `<li class=${className}>${value}</li>`);
  }
}
