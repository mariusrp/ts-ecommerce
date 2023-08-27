import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Store } from '../Store'
import { useGetProductsQuery } from '../hooks/productHooks'
import { Product } from '../types/Product'
import debounce from 'lodash.debounce'

export default function SearchBox() {
  const { dispatch, state } = useContext(Store)
  const navigate = useNavigate()

  const { searchKeyword } = state

  const { data: products } = useGetProductsQuery()

  const handleOnSelect = (products: Product) => {
    dispatch({
      type: 'UPDATE_SEARCH_KEYWORD',
      payload: products.name,
    })
    navigate(`/search?keyword=${products.name}`)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchKeyword) {
      navigate('/search?keyword=all')
    } else {
      navigate(`/search?keyword=${searchKeyword}`)
    }
  }

  const formatResult = (product: Product) => {
    const parts = product.name.split(new RegExp(`(${searchKeyword})`, 'gi'))
    return (
      <div className="flex">
        <img
          src={product.images[0]}
          alt={product.name}
          className="small-search-img"
        />
        <div className="search-suggestion">
          <span
            style={{
              color: 'gray',
              fontSize: 'small',
            }}
          >
            {product.category}
          </span>
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{
                  fontWeight:
                    part.toLowerCase() === searchKeyword.toLowerCase()
                      ? 'bold'
                      : 'normal',
                }}
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleSearchChange = debounce((text: string) => {
    dispatch({
      type: 'UPDATE_SEARCH_KEYWORD',
      payload: text,
    })
  }, 500)

  return (
    <div className="searchbox-container">
      <form onSubmit={handleSearchSubmit}>
        {products && (
          <ReactSearchAutocomplete
            items={products}
            onSelect={handleOnSelect}
            autoFocus
            onSearch={handleSearchChange}
            formatResult={formatResult}
            styling={{
              zIndex: 1,
            }}
          />
        )}
      </form>
    </div>
  )
}
