
export default function Card({ imageUrl, name, id, handleClick}) {
  return (
    <div className="pokemon-card" key={id} onClick={() => handleClick(id)}>
      <span>{name}</span>
      <img src={imageUrl} alt={name} />
    </div>
  )
}