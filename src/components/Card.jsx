
export default function Card({ imageUrl, name, id, isClicked}) {
  return (
    <div className="pokemon-card" key={id}>
      <span>{name}</span>
      <img src={imageUrl} alt={name} />
    </div>
  )
}