import { useEffect, useState } from 'react';
import api from '../api/axios';
import Topbar from '../components/Topbar';
import ProgressRing from '../components/ProgressRing';

const categorize = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#5AC8FF' };
  if (bmi < 25) return { label: 'Normal', color: 'var(--accent)' };
  if (bmi < 30) return { label: 'Overweight', color: '#FFC65A' };
  return { label: 'Obese', color: 'var(--accent-alt)' };
};

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/auth/me');
      if (data.height) setHeight(data.height);
      if (data.weight) setWeight(data.weight);
    };
    load();
  }, []);

  const calculate = (e) => {
    e.preventDefault();
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    setResult({ bmi: bmi.toFixed(1), ...categorize(bmi) });
  };

  // Map a realistic BMI range (15-35) onto the 0-100 ring scale for the gauge
  const ringPercent = result ? Math.min(Math.max(((result.bmi - 15) / (35 - 15)) * 100, 0), 100) : 0;

  return (
    <>
      <Topbar title="BMI Calculator" subtitle="Body Mass Index gives a quick read on your weight relative to height." />

      <section className="bmi-layout">
        <form onSubmit={calculate} className="panel form">
          <label>
            Height (cm)
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="175" />
          </label>
          <label>
            Weight (kg)
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="70" />
          </label>
          <button type="submit" className="btn btn--primary btn--block">Calculate BMI</button>
        </form>

        <div className="panel panel--center">
          {result ? (
            <>
              <ProgressRing percent={ringPercent} value={result.bmi} label={result.label} color={result.color} />
              <p className="muted" style={{ marginTop: '1rem', textAlign: 'center' }}>
                A BMI between 18.5 and 24.9 is generally considered a healthy range.
                This is a general indicator, not a medical diagnosis.
              </p>
            </>
          ) : (
            <p className="muted">Enter your height and weight to see your BMI.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default BMICalculator;
