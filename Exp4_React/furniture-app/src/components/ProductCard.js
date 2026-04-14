import { useState } from 'react';

function ProductCard({
  image = 'https://via.placeholder.com/600x400?text=Furniture+Product',
  name = 'Unknown Product',
  price = 'Price not available',
  color = 'Not specified',
  manufacturer = 'Unknown Manufacturer',
}) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={image} alt={name} />
      </div>

      <div className="product-content">
        <h3>{name}</h3>
        <p className="product-price">{price}</p>
        <p><strong>Color:</strong> {color}</p>
        <p><strong>Manufacturer:</strong> {manufacturer}</p>
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
