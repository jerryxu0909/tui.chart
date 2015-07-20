/**
 * @fileoverview ChartView is parent of all chart.
 * @author NHN Ent.
 *         FE Development Team <jiung.kang@nhnent.com>
 */

'use strict';

var View = require('./view.js'),
    chartConst = require('../const.js');

/**
 * @classdesc ChartView is parent of all chart.
 * @class
 * @augments View
 */
var ChartView = ne.util.defineClass(View, {
    /**
     * Chart size
     * @type {{width: number, height: number}
     */
    dimension: {
        width: 500,
        height: 300
    },

    /**
     * constructor
     * @param {object} data chart data
     * @param {options} options chart options
     */
    init: function(data, options) {
        /**
         * Chart dimension
         * @type {Object}
         */
        this.dimension = ne.util.extend(this.dimension, options.size);
        View.call(this);
        this.addClass(this.el, 'ne-chart');
    },

    /**
     * Chart title renderer.
     * @returns {element}
     */
    renderTitle: function() {
        var title = this.model.title,
            titleSize = this.model.titleFontSize,
            elTitle;

        if (!this.model.title) {
            return;
        }

        elTitle = this.createElement('DIV', 'ne-chart-title');
        elTitle.innerHTML = title;
        elTitle.style.fontSize = titleSize + 'px';

        return elTitle;
    },

    render: function() {
        this.renderBackground(this.options.background);
    },

    /**
     * Get rendered title height.
     * @returns {number}
     */
    getRenderedTitleHeight: function() {
        var title = this.model.title,
            titleSize = this.model.titleFontSize,
            titleHeight = 0;
        if (title) {
            titleHeight = this.getRenderedLabelHeight(title, titleSize);
            titleHeight *= 1.5;
        }

        return titleHeight;
    }
});

module.exports = ChartView;