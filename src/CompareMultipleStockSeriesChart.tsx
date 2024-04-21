import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// Define TypeScript interfaces for the series and data structure
interface StockData {
    name: string;
    data: number[][];
}

const CompareMultipleStockSeriesChart: React.FC = () => {
    const [series, setSeries] = useState<StockData[]>([]);

    useEffect(() => {
        const names = ['MSFT', 'AAPL', 'GOOG'];
        
        const fetchStockData = async (name: string): Promise<StockData> => {
            const response = await fetch(
                `https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`
            );
            const data = await response.json();
            return { name, data };
        };

        const loadAllData = async () => {
            const promises = names.map(name => fetchStockData(name));
            const results = await Promise.all(promises);
            setSeries(results);
        };

        loadAllData();
    }, []);

    const createChartOptions = (): Highcharts.Options => ({
        rangeSelector: {
            selected: 4
        },

        yAxis: {
            labels: {
                format: '{value}%' // This might need to be adjusted if you want conditional formatting
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        plotOptions: {
            series: {

                pointStart: 2010,
                compare: 'percent',
                showInNavigator: true
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            enabled : true
        },
        series: series.map(s => ({
            type: 'line', // or 'stock' based on your need
            name: s.name,
            data: s.data
        }))
    });

    return (
        <div>
            {series.length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={createChartOptions()}
                />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default CompareMultipleStockSeriesChart;
