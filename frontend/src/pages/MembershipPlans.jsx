import { useEffect, useState } from 'react';
import api from '../api/axios';
import Topbar from '../components/Topbar';

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    const [plansRes, meRes] = await Promise.all([api.get('/memberships'), api.get('/auth/me')]);
    setPlans(plansRes.data);
    setCurrent(meRes.data.membership);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const subscribe = async (planId) => {
    setSubscribing(planId);
    setMessage('');
    try {
      await api.post(`/memberships/subscribe/${planId}`);
      setMessage('You are now subscribed! Your dashboard will reflect the new plan.');
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not subscribe to this plan.');
    } finally {
      setSubscribing('');
    }
  };

  return (
    <>
      <Topbar title="Membership Plans" subtitle="Choose the plan that matches your training frequency." />

      {message && <div className="alert alert--success">{message}</div>}

      {loading ? (
        <p className="muted">Loading plans…</p>
      ) : (
        <section className="plan-grid">
          {plans.map((plan) => {
            const isCurrent = current?.plan?._id === plan._id && current?.status === 'active';
            return (
              <div key={plan._id} className={`plan-card${isCurrent ? ' plan-card--active' : ''}`}>
                {isCurrent && <span className="plan-card__badge">Current Plan</span>}
                <h3>{plan.name}</h3>
                <p className="plan-card__price">
                  ৳{plan.price}
                  <span> / {plan.durationInMonths} mo</span>
                </p>
                <p className="muted">{plan.description}</p>
                <ul className="plan-card__features">
                  {plan.features?.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <button
                  className={`btn ${isCurrent ? 'btn--outline' : 'btn--primary'} btn--block`}
                  disabled={isCurrent || subscribing === plan._id}
                  onClick={() => subscribe(plan._id)}
                >
                  {isCurrent ? 'Currently Active' : subscribing === plan._id ? 'Subscribing…' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default MembershipPlans;
