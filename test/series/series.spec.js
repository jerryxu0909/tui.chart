/**
 * @fileoverview test series
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var Series = require('../../src/js/series/series.js');

var isIE8 = window.navigator.userAgent.indexOf('MSIE 8.0') > -1;

describe('test Series', function() {
    var groupValues = [[20], [40], [80], [120]],
        groupValues2 = [
            [20, 80], [40, 60], [60, 40], [80, 20]
        ],
        data = {
            values: [[20], [40]],
            formattedValues: [[20], [40]],
            scale: {min: 0, max: 160}
        },
        bound = {
            dimension: {width: 200, height: 100},
            position: {top: 50, right: 50}
        },
        theme = {
            colors: ['blue']
        },
        series;

    beforeEach(function() {
        series = new Series({
            chartType: 'bar',
            tooltipPrefix: 'tooltip-prefix-',
            data: data,
            bound: bound,
            theme: theme,
            options: {}
        });
    });

    it('_makePercentValues() normal', function() {
        var result = series._makePercentValues({
            values: groupValues,
            scale: data.scale
        });
        expect(result).toEqual([[0.125], [0.25], [0.5], [0.75]]);
    });

    it('_makePercentValues() normal stacked', function() {
        var result = series._makePercentValues({
            values: groupValues2,
            scale: data.scale
        }, 'normal');
        expect(result).toEqual([[0.125, 0.5], [0.25, 0.375], [0.375, 0.25], [0.5, 0.125]]);
    });

    it('_makePercentValues() stacked', function() {
        var result = series._makePercentValues({
            values: groupValues2,
            scale: data.scale
        }, 'percent');
        expect(result).toEqual([[0.2, 0.8], [0.4, 0.6], [0.6, 0.4], [0.8, 0.2]]);
    });

    it('_makeNormalPercentValues', function() {
        var result = series._makeNormalPercentValues({
            values: groupValues,
            scale: data.scale
        });
        expect(result).toEqual([[0.125], [0.25], [0.5], [0.75]]);
    });

    it('_makeNormalStackedPercentValues', function() {
        var result = series._makeNormalStackedPercentValues({
            values: groupValues2,
            scale: data.scale
        });
        expect(result).toEqual([[0.125, 0.5], [0.25, 0.375], [0.375, 0.25], [0.5, 0.125]]);
    });

    it('_makePercentStackedPercentValues', function() {
        var result = series._makePercentStackedPercentValues({
            values: groupValues2,
            scale: data.scale
        });
        expect(result).toEqual([[0.2, 0.8], [0.4, 0.6], [0.6, 0.4], [0.8, 0.2]]);
    });

    it('render()', function() {
        var elSeries = series.render();

        expect(elSeries.className.indexOf('series-area') > -1).toBeTruthy();
        expect(elSeries.style.width).toEqual('200px');
        expect(elSeries.style.height).toEqual('100px');

        expect(elSeries.style.top).toEqual('49px');

        if (isIE8) {
            expect(elSeries.style.right).toEqual('50px');
        } else {
            expect(elSeries.style.right).toEqual('49px');
        }
    });
});
