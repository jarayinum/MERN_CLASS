import { useEffect, useState } from 'react';

import { http } from '../api/http';
import { ConceptCard } from '../components/ConceptCard';

export const Concepts = () => {
  const [concepts, setConcepts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadConcepts = async () => {
      const { data } = await http.get('/concepts');
      setConcepts(data.concepts);
    };
    loadConcepts();
  }, []);

  const filtered = concepts.filter((concept) =>
    concept.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <header className="section-header">
        <div>
          <h2>JavaScript mastery cards</h2>
          <p>Each card includes a concept summary plus executable snippet.</p>
        </div>
        <input
          placeholder="Search concept..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>
      <div className="concept-grid">
        {filtered.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </section>
  );
};

