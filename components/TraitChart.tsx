
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Collection } from '../types';

interface TraitChartProps {
  collection: Collection;
}

const COLORS = ['#3B82F6', '#60A5FA', '#1D4ED8', '#2563EB', '#93C5FD'];

const TraitChart: React.FC<TraitChartProps> = ({ collection }) => {
  const traitData = useMemo(() => {
    const traitCounts: { [key: string]: { [value: string]: number } } = {};

    collection.nfts.forEach(nft => {
      nft.traits.forEach(trait => {
        if (!traitCounts[trait.trait_type]) {
          traitCounts[trait.trait_type] = {};
        }
        if (!traitCounts[trait.trait_type][trait.value]) {
          traitCounts[trait.trait_type][trait.value] = 0;
        }
        traitCounts[trait.trait_type][trait.value]++;
      });
    });

    return Object.entries(traitCounts).map(([traitType, values]) => ({
      traitType,
      data: Object.entries(values).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count)
    }));
  }, [collection]);

  if (!traitData.length) {
    return <p className="text-text-secondary">No trait data available to display.</p>;
  }

  return (
    <div className="space-y-8">
      {traitData.map(({ traitType, data }) => (
        <div key={traitType}>
          <h4 className="text-lg font-semibold text-text-primary mb-4">{traitType} Distribution</h4>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#CBD5E1" />
                <YAxis type="category" dataKey="name" stroke="#CBD5E1" width={80} tick={{ fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderColor: '#334155',
                    color: '#F8FAFC'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" barSize={20}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraitChart;
