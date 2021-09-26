var d3NS = {
  f: function f() {

    let width,
      height,
      chartWidth,
      chartHeight,
      margin,
      svg,
      chartLayer,
      data,
      simulation;

      function setSize() {
        svg = d3.select('#graph').append('svg');
        chartLayer = svg.append('g').classed('chartLayer', true);
        data = {
          nodes: d3.range(0, 100).map(function(d) { return { label: 'l' + d, r: ~~d3.randomUniform(5, 15)() }; }),
          links: d3.range(0, 100).map(function() { return { source: ~~d3.randomUniform(100)(), target: ~~d3.randomUniform(100)() }; })
        };

        width = document.querySelector('#graph').clientWidth;
        height = 300;
        margin = { top: 20, left: 0, bottom: 20, right:0 };
        chartWidth = width - (margin.left + margin.right);
        chartHeight = height - (margin.top + margin.bottom);
        svg.attr('width', width).attr('height', height);
        chartLayer
          .attr('width', chartWidth)
          .attr('height', chartHeight)
          .attr('transform', 'translate('+[margin.left, margin.top]+')');
      }

      function drawChart() {
        d3.select(window).on('resize', function() {
          width = document.querySelector('#graph').clientWidth;
          height = 300;
          d3.select('#graph svg').attr('width', width).attr('height', height);
          simulation.force('center').x(width / 2).y(height / 2);
        });

        let simulation = d3.forceSimulation()
          .force('link', d3.forceLink().id(function(d) { return d.index; }))
          .force('collide',d3.forceCollide(function(d) {return d.r + 8; }).iterations(16))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(chartWidth / 2, chartHeight / 2));

        let link = svg.append('g')
          .attr('class', 'links')
          .attr('style', 'stroke: #999; stroke-width: 1px;')
          .selectAll('line')
          .data(data.links)
          .enter()
          .append('line')
          .classed('link', true);

        let colorScale = d3.scaleOrdinal(d3.schemeCategory20);

        let node = svg.append('g')
          .attr('class', 'nodes')
          .attr('style', 'cursor: pointer; fill: #ccc; stroke: #333; stroke-width: 1px;')
          .selectAll('circle')
          .data(data.nodes)
          .enter().append('circle')
          .attr('r', function(d){ return d.r; })
          .classed('node', true)
          .on('dblclick', releasenode)
          .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

        node
          .transition()
          .duration(1500)
          .style('fill', function(d, i) { return colorScale(i); });


        let ticked = function() {
          link
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

          node
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        };

        simulation
          .nodes(data.nodes)
          .on('tick', ticked);

        simulation.force('link')
          .links(data.links);

        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          // uncomment to prevent being sticky
          // d.fx = null;
          // d.fy = null;
        }

        function releasenode(d) {
          d.fx = null;
          d.fy = null;
        }
      }

      d3NS.rebuild = function() {
        svg.remove();
        setSize();
        drawChart();
      }

      setSize();
      drawChart();
  }
};

// var observer = new MutationObserver(function(mutations) {
//   var graph = document.getElementById('graph') || null;

//   if (graph && document.contains(graph)) {
//     observer.disconnect();
//     f();
//   }
// });

// observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});

// f();
