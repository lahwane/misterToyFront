import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section className="toy-list">
      {!toys.length ? (
        <h1>It's empty here...</h1>
      ) : (
        <ul>
          {toys.map(toy => (
            <li key={toy._id}>
              <ToyPreview toy={toy} />
              <div>
                <button>
                  <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                </button>
                <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
