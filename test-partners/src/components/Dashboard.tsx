import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { timeFormat } from 'd3-time-format';
import './Dashboard.css';
import HoverAgent from '../assets/images/Hover-agent.png';
import DefaultAgent from '../assets/images/Default-agent.png';
import Loader from './loader/Loader'; // Import the Loader component
import Input from './input/Input';

interface Statistic {
  date: Date;
  clicks: number;
  conversions: number;
  payout: number;
}

interface Conversion {
  date: Date;
  offer: string;
  geo: {
    name: string;
    ip: string;
  };
  device: {
    os: string;
    agent: string;
  };
  status: string;
  income: {
    amount: number;
    currency: string;
  };
  goal: string;
  sub1?: string;
  sub2?: string;
  sub3?: string;
  sub4?: string;
  sub5?: string;
  sub6?: string;
  sub7?: string;
  sub8?: string;
  user_agent: string;
  id: string;
}

interface Data {
  statistics: Statistic[];
  conversions: Conversion[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Data>({ statistics: [], conversions: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [idSearchTerm, setIdSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Data>({ statistics: [], conversions: [] });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        const parsedStatistics = result.statistics.map((d: any) => ({
          ...d,
          date: new Date(d.date)
        }));
        const parsedConversions = result.conversions.map((d: any) => ({
          ...d,
          date: new Date(d.date)
        }));
        setData({ ...result, statistics: parsedStatistics, conversions: parsedConversions });
        setFilteredData({ ...result, statistics: parsedStatistics, conversions: parsedConversions });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let results = data.conversions;
    if (searchTerm !== '') {
      results = results?.filter((item: Conversion) =>
        item.offer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (idSearchTerm !== '') {
      results = results?.filter((item: Conversion) =>
        item.id.toLowerCase().includes(idSearchTerm.toLowerCase())
      );
    }
    setFilteredData({ ...data, conversions: results });
  }, [searchTerm, idSearchTerm, data]);

  const formatDate = timeFormat("%d/%m");
  const fullDateFormat = timeFormat("%d %B %Y");

  const legendFormatter = (value: string) => {
    switch(value) {
      case 'clicks':
        return 'Клики';
      case 'conversions':
        return 'Конверсии';
      case 'payout':
        return 'К выплате';
      default:
        return value;
    }
  };


  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const formattedLabel = fullDateFormat(new Date(label || ''));
      return (
        <div className="custom-tooltip">
          <p className="label">{formattedLabel}</p>
          <ul className="custom-legend-box">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }} className={`legend-${entry.name}`}>
              {`${legendFormatter(entry.name)} ${entry.value}`}
            </li>
          ))}
           </ul>
        </div>
      );
    }

    return null;
  };

  const yAxisTickFormatter = (value: number): string => (value === 0 ? '' : value.toString());
  const getColorByValue = (value: string) => {
    console.log('value', value)
    switch (value) {
      case 'clicks':
        return '#E127FF';
      case 'conversions':
        return '#5D43FF';
      case 'payout':
        return '#28D8FF';
      default:
        return '#000000';
    }
  };
  

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="custom-legend">
        {payload?.map((entry: any, index: any) => (
          <li key={`item-${index}`} style={{ color: '#A7A7A7' }}>
            <span className="legend-icon" style={{ backgroundColor: getColorByValue(entry.value) }}></span>
            {legendFormatter(entry.value)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <p className='dashboard-title'>Dashboard</p>
          <div className='dashboard-container'>
            <p className='statistic-header'>Статистика за последние 10 дней</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData.statistics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis tickFormatter={yAxisTickFormatter} />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={renderLegend} />
                <Line type="monotone" dataKey="clicks" stroke="#E127FF" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="conversions" stroke="#5D43FF" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="payout" stroke="#ffc658" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Input idSearchTerm={idSearchTerm} setIdSearchTerm={setIdSearchTerm} />
          <div className='table-container'>
            <div className='table-scroll'>
              <table>
                <thead>
                  <tr>
                    <th>Дата создания</th>
                    <th>Оффер</th>
                    <th>ГЕО/IP</th>
                    <th>Устройство</th>
                    <th>Статус</th>
                    <th>Доход</th>
                    <th>название цели</th>
                    <th>sub1</th>
                    <th>sub2</th>
                    <th>sub3</th>
                    <th>sub4</th>
                    <th>sub5</th>
                    <th>sub6</th>
                    <th>sub7</th>
                    <th>sub8</th>
                    <th>user agent</th>
                    <th>комментарий</th>
                    <th className='id-box'>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.conversions && filteredData.conversions.map((item: Conversion) => (
                    <tr key={item.id}>
                      <td>{fullDateFormat(item.date)}</td>
                      <td>{item.offer}</td>
                      <td>{item.geo.name} ({item.geo.ip})</td>
                      <td>{item.device.os} ({item.device.agent})</td>
                      <td>{item.status == '1' ?
                        <div className='in-progress'>в обработке</div> :
                        <div className='received'>ПРИНЯТО</div>
                      }
                      </td>
                      <td>{item.income.amount} {item.income.currency}</td>
                      <td>{item.goal}</td>
                      <td>{item.sub1}</td>
                      <td>{item.sub2}</td>
                      <td>{item.sub3}</td>
                      <td>{item.sub4}</td>
                      <td>{item.sub5}</td>
                      <td>{item.sub6}</td>
                      <td>{item.sub7}</td>
                      <td>{item.sub8}</td>
                      <td className='DefaultAgent'>
                        <img src={DefaultAgent} alt='DefaultAgent' className='DefaultAgent-img' height={19} width={19} />
                        <img src={HoverAgent} alt='HoverAgent'  className='HoverAgent-img' height={19} width={19} />
                        <div className='DefaultAgent-modal'>{item.user_agent}</div>
                      </td>
                      <td>-</td>
                      <td className="sticky">{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
