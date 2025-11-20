import { useEffect, useState } from 'react';

import { http } from '../api/http';
import { ConceptCard } from '../components/ConceptCard';
import { Stat } from '../components/Stat';
import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConcepts = async () => {
      try {
        const { data } = await http.get('/concepts');
        setConcepts(data.concepts);
      } catch (error) {
        console.error('Concept fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    loadConcepts();
  }, []);

  return (
    <section>
      <header className="hero">
        <div>
          <p className="eyebrow">Hi {user?.name ?? 'guest'} 👋</p>
          <h1>Welcome to the MERN Training Ground</h1>
          <p>
            Practice every layer of the stack with real endpoints, structured
            exercises, and curated concept cards.
          </p>
        </div>
      </header>

      <div className="stat-grid">
        <Stat label="Concept cards" value={concepts.length} />
        <Stat label="Role" value={user?.role ?? 'visitor'} />
        <Stat label="Interests" value={user?.interests?.length ?? 0} />
      </div>

      <section className="concept-grid">
        {loading && <p>Loading concepts...</p>}
        {!loading &&
          concepts.slice(0, 3).map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
      </section>
    </section>
  );
};

