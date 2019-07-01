import freesewing from '@freesewing/core';
import plugins from '@freesewing/plugin-bundle';

var version = "0.0.0";

var config = {
  name: "{{name}}",
  version: version,
  design: "{{author}}",
  code: "{{author}}",
  department: "{{department}}",
  type: "{{type}}",
  difficulty: 3,
  tags: ["freesewing", "design", "diy", "fashion", "made to measure", "parametric design", "{{type}}", "sewing", "sewing pattern"],
  optionGroups: {
    fit: ["size"]
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["box"],
  options: {
    size: {
      pct: 50,
      min: 10,
      max: 100
    }
  }
};

function draftBox (part) {
  var _part$shorthand = part.shorthand(),
      options = _part$shorthand.options,
      Point = _part$shorthand.Point,
      Path = _part$shorthand.Path,
      points = _part$shorthand.points,
      paths = _part$shorthand.paths,
      Snippet = _part$shorthand.Snippet,
      snippets = _part$shorthand.snippets,
      complete = _part$shorthand.complete,
      sa = _part$shorthand.sa,
      paperless = _part$shorthand.paperless,
      macro = _part$shorthand.macro;

  var w = 500 * options.size;
  points.topLeft = new Point(0, 0);
  points.topRight = new Point(w, 0);
  points.bottomLeft = new Point(0, w / 2);
  points.bottomRight = new Point(w, w / 2);
  paths.seam = new Path().move(points.topLeft).line(points.bottomLeft).line(points.bottomRight).line(points.topRight).line(points.topLeft).close().attr("class", "fabric"); // Complete?

  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5);
    snippets.logo = new Snippet("logo", points.logo);
    points.text = points.logo.shift(-90, w / 8).attr("data-text", "hello").attr("data-text-class", "center");

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }
  } // Paperless?


  if (paperless) {
    macro("hd", {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    });
    macro("vd", {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15
    });
  }

  return part;
}

var Pattern = new freesewing.Design(config, plugins); // Attach the draft methods to the prototype

Pattern.prototype.draftBox = draftBox;

export default Pattern;
//# sourceMappingURL=index.mjs.map
