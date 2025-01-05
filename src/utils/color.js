export const colorKeywordToRGB = (colorKeyword, alpha = null) => {
  // CREATE TEMPORARY ELEMENT
  let el = document.createElement("div");

  // APPLY COLOR TO TEMPORARY ELEMENT
  el.style.color = colorKeyword;

  // APPEND TEMPORARY ELEMENT
  document.body.appendChild(el);

  // RESOLVE COLOR AS RGB() VALUE
  let rgbValue = window.getComputedStyle(el).color;

  // REMOVE TEMPORARY ELEMENT
  document.body.removeChild(el);

  if (alpha) {
    return rgbValue.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  return rgbValue;
};
