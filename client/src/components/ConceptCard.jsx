export const ConceptCard = ({ concept }) => {
  return (
    <article className="card">
      <h3>{concept.title}</h3>
      <p>{concept.summary}</p>
      <pre>
        <code>{concept.snippet}</code>
      </pre>
    </article>
  );
};

