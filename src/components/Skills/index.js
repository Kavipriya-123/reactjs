import './index.css'

const Skills = props => {
  const {itemDetails} = props
  const {imageUrl, name} = itemDetails
  return (
    <li className="list1-skill">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default Skills
