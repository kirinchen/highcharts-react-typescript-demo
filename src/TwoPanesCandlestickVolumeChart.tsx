import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// Define tuple types for OHLC and volume data
type OhlcTuple = [number, number, number, number, number];
type VolumeTuple = [number, number];

const TwoPanesCandlestickVolumeChart: React.FC = () => {
    const [ohlc, setOhlc] = useState<OhlcTuple[]>([]);
    const [volume, setVolume] = useState<VolumeTuple[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
            const data = await response.json() as (number[])[];
            
            const ohlcData: OhlcTuple[] = [];
            const volumeData: VolumeTuple[] = [];

            data.forEach(item => {
                if (item.length >= 6) { // Ensures there is enough data
                    ohlcData.push([
                        item[0], // date
                        item[1], // open
                        item[2], // high
                        item[3], // low
                        item[4]  // close
                    ]);

                    volumeData.push([
                        item[0], // date
                        item[5]  // volume
                    ]);
                }
            });

            setOhlc(ohlcData);
            setVolume(volumeData);
        };

        fetchData();
    }, []);

    const options: Highcharts.Options = {
        rangeSelector: {
            selected: 4
        },
        title: {
            text: 'AAPL Historical'
        },
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        tooltip: {
            split: true
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: ohlc,
      
        }, {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
      
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType="stockChart"
        />
    );
};

export default TwoPanesCandlestickVolumeChart;