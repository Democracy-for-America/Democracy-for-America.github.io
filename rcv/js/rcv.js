// script loader
window.rcvRequire = function(url, callback) {
  var script = document.createElement("script");
  script.src = url;
  script.type="text/javascript";
  document.head.appendChild(script);
  script.addEventListener('load', callback);
}

// polyfill
if (!String.prototype.normalize) {
  String.prototype.normalize = function(str) {
    return this;
  };
}

window.rcvCalculate = function() {
  // count votes
  for (var key in rcvCandidates) {
    rcvCandidates[key] = 0;
  }

  var total = 0;

  rcvResultsData.forEach(function(ballot) {
    for (var col = 1; !(ballot[col] === undefined); col++) {
      var candidateId = ballot[col].normalize("NFD").replace(/\W/g, "").toLowerCase();

      if (!(candidateId in rcvCandidates)) {
        if ("other" in rcvCandidates) { candidateId = "other"; } else { break; }
      }

      if (ballot[col].length > 0 && !rcvRemovedCandidates[candidateId]) {
        rcvCandidates[candidateId]++;
        total++;
        break;
      }
    }
  });

  var max = 0;

  for (var candidate in rcvCandidates) {
    max = Math.max(max, rcvCandidates[candidate]);
  }

  // re-order
  var list = document.querySelector("#rcv-candidates");
  var items = list.childNodes;
  var itemsArr = [];

  for (var i in items) {
    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function(a, b) {
    if (a.id == "other") { return  1; }
    if (b.id == "other") { return -1; }
    if (rcvCandidates[a.id] == rcvCandidates[b.id]) { return 0; }
    return rcvCandidates[a.id] > rcvCandidates[b.id] ? -1 : 1;
  });

  for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }

  d3.select("#rcv-candidates")
    .style("display", "block");

  console.log(rcvCandidates)

  // resize
  for (var candidate in rcvCandidates) {
    var candidateId = candidate.normalize("NFD").replace(/\W/g, "").toLowerCase();

    d3.select("#" + candidateId + " .rcv-result-percent")
      .text((100.0 * rcvCandidates[candidate] / total).toFixed(2) + "%");

    d3.select("#" + candidateId + " .rcv-bar")
      .transition()
      .duration(500)
      .style("width", (100.0 * rcvCandidates[candidate] / max) + "%");
  }
}

// initialize
window.rcvLoad = function(config) {
  window.rcvConfig = config;
  window.rcvCandidates = {};
  window.rcvRemovedCandidates = {};
  window.rcvResultsData = {};

  // load D3.js
  rcvRequire("//cdnjs.cloudflare.com/ajax/libs/d3/5.11.0/d3.min.js", function() {
    var candidatesDiv = d3.select("#rcv-candidates")

    var removedDiv = d3.select("body")
      .append("div")
      .attr("id", "rcv-removed-candidates");

    // load candidates csv
    d3.csv(rcvConfig["candidateCsvUrl"]).then(function(candidateData) {
      candidateData.forEach(function(candidate) {
        var candidateId = candidate["name"].normalize("NFD").replace(/\W/g, "").toLowerCase();
        rcvCandidates[candidateId] = null;

        // add a row for each candidate contained in data/candidates.csv
        var row = candidatesDiv
          .append("div")
          .attr("id", candidateId)
          .attr("class", "rcv-candidate-row")
          .attr("onclick", "rcvRemoveCandidate('" + candidateId + "');");

        var imgWrap = row
          .append("div")
          .attr("class", "rcv-img-wrap");

        imgWrap.append("img")
          .attr("src", candidate["image_url"]);

        var barWrap = row.append("div")
          .attr("class", "rcv-bar-wrap");

        barWrap.append("div")
          .attr("class", "rcv-bar");

        var resultWrap = barWrap.append("div")
          .attr("class", "rcv-result-wrap");

        resultWrap.append("span").append("strong")
          .attr("class", "rcv-result-name")
          .text(candidate["name"] + ": ");

        resultWrap.append("span")
          .attr("class", "rcv-result-percent");

        // add a removed placeholder for each candidate
        var removeWrap = removedDiv.append("div")
          .attr("id", "r-" + candidateId)
          .attr("class", "rcv-removed-wrap")
          .style("display", "none")
          .attr("onclick", "rcvAddCandidate('" + candidateId + "');");;

        var imgWrap = removeWrap.append("div")
          .attr("class", "rcv-img-wrap");

        imgWrap.append("img")
          .attr("src", candidate["image_url"]);

        imgWrap.append("div")
          .text(candidate["name"]);
      });

      // load results csv
      d3.csv(rcvConfig["resultsCsvUrl"]).then(function(resultsData) {
        rcvResultsData = resultsData;
        rcvCalculate();
      });
    });
  });
}

window.rcvAddCandidate = function(candidateId) {
  delete rcvRemovedCandidates[candidateId];
  d3.select("#" + candidateId)
    .style("display", "block");
  d3.select("#r-" + candidateId)
    .style("display", "none");

  if (Object.keys(rcvRemovedCandidates).length < 1) {
    d3.select("#rcv-removed-candidates")
      .style("display", "none");
    d3.select("body")
      .style("padding-bottom", "0px");
  }

  rcvCalculate();
}

window.rcvRemoveCandidate = function(candidateId) {
  rcvRemovedCandidates[candidateId] = true;
  d3.select("#" + candidateId)
    .style("display", "none");
  d3.select("#r-" + candidateId)
    .style("display", "inline-block");
  d3.select("#rcv-removed-candidates")
    .style("display", "block");
  d3.select("body")
    .style("padding-bottom", "86px");

  var removed = document.getElementById("rcv-removed-candidates");
  removed.appendChild(document.getElementById("r-" + candidateId));
  rcvCalculate();
}
