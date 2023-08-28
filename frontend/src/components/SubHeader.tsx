import { Link } from 'react-router-dom'

export default function SubHeader() {
  const categories = [
    { text: 'all', icon: 'fa fa-list' },
    { text: 'displays', icon: 'fa fa-desktop' },
    { text: 'speakers', icon: 'fa fa-volume-up' },
    { text: 'cameras', icon: 'fa fa-camera' },
    { text: 'security', icon: 'fa fa-shield-alt' },
    { text: 'accessories', icon: 'fa fa-briefcase' },
    { text: 'other', icon: 'fa fa-question-circle' },
  ]

  return (
    <div className="sub-header">
      <div className="d-flex">
        {categories.map((category) => (
          <Link
            key={category.text}
            className="nav-link category-link  p-1 px-3 subheader-link-container"
            to={`/search?tag=${category.text}`}
          >
            <div className="subheader-link">
              <i className={`${category.icon} subheader-icon`}></i>
              <p className="subheader-text">{category.text.toUpperCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

//export categories
