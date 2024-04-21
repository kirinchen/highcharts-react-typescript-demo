import React, { useState } from 'react';
import './App.css';
import MultiLineChart from './MultiLineChart';
import TwoPanesCandlestickVolumeChart from './TwoPanesCandlestickVolumeChart';
import TwoPanesCandlestickVolumeSameChart from './TwoPanesCandlestickVolumeSameChart';
import CompareMultipleStockSeriesChart from './CompareMultipleStockSeriesChart';

interface ViewInfo {
  id: string;
  view: React.ElementType;  // Use ElementType for type checking
}

function App() {
  const [selectedViewId, setSelectedViewId] = useState<string | undefined>();

  // Define the views available for dynamic loading
  const views: ViewInfo[] = [
    { id: 'MultiLine', view: MultiLineChart },
    { id: 'TwoPanesCandlestickVolume', view: TwoPanesCandlestickVolumeChart },
    { id: 'TwoPanesCandlestickVolumeSame', view: TwoPanesCandlestickVolumeSameChart },
    { id: 'CompareMultipleStockSeriesChart', view: CompareMultipleStockSeriesChart }
  ];

  // Function to handle dropdown selection change
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const viewId = e.target.value;
    setSelectedViewId(viewId);
  };

  // Find the selected view component based on state
  const SelectedViewComponent = views.find(v => v.id === selectedViewId)?.view;

  return (
    <div>
      <select onChange={handleSelectionChange} value={selectedViewId || ''}>
        <option value="">Select a view</option>
        {views.map(view => (
          <option key={view.id} value={view.id}>
            {view.id}
          </option>
        ))}
      </select>
      <div>
        {SelectedViewComponent ? <SelectedViewComponent /> : <p>Please select a view.</p>}
      </div>
    </div>
  );
}

export default App;
